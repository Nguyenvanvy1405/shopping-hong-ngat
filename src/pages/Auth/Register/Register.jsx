import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Button } from 'src/assets/styles/untils'
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage'
import InputPassword from 'src/components/InputPassword/InputPassword'
import InputText from 'src/components/InputText/InputText'
import { path } from 'src/constants/path'
import { rules } from 'src/constants/rules'
import { register } from '../auth.slice'
import * as S from './register.style'

export default function Register() {
  //
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmedpassword: ''
    }
  })

  const dispatch = useDispatch()

  // đấy đến trang khác , lưu thông tin lại
  // để back lại or forward
  const history = useHistory()

  // Call API Register
  const handleRegister = async data => {
    // console.log(data)
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      // Xử lý bằng Async / Await
      const res = await dispatch(register(body))
      unwrapResult(res)
      history.push(path.home)
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: 'server',
            message: error.data[key]
          })
        }
      }
    }
  }

  console.log(errors)

  return (
    <div>
      <S.StyleRegister>
        <S.Container className="container">
          <S.Banner></S.Banner>
          <S.FormWrapper>
            <S.FormTitle>Đăng Ký</S.FormTitle>
            <S.Form onSubmit={handleSubmit(handleRegister)} noValidate>
              <S.FormControl>
                {/* react-hook-form Bắt Validate */}
                <Controller
                  name="email"
                  control={control}
                  rules={rules.email}
                  render={({ field }) => (
                    <InputText
                      type="email"
                      name="email"
                      placeholder="Nhập vào email ..."
                      onChange={field.onChange}
                      value={getValues('email')}
                    />
                  )}
                />
                <ErrorMessage errors={errors} name="email" />
              </S.FormControl>
              <S.FormControl>
                <Controller
                  name="password"
                  control={control}
                  rules={rules.password}
                  render={({ field }) => (
                    <InputPassword
                      name="password"
                      placeholder="Nhập Mật Khẩu ..."
                      onChange={field.onChange}
                      value={getValues('password')}
                    />
                  )}
                />
                <ErrorMessage errors={errors} name="password" />
              </S.FormControl>
              <S.FormControl>
                <Controller
                  name="confirmedPassword"
                  control={control}
                  // rules nhận vào 1 object
                  // Bắt lỗi confirmedPassword
                  // Shallow copy ra 1 rules.confirmedPassword
                  // và bắt đầu so sánh
                  // Nếu có quên thì xem lại cú pháp Destructuring,
                  // Rest Parameters,
                  // Spread Syntax
                  rules={{
                    ...rules.confirmedPassword,
                    validate: {
                      samePassword: v => v === getValues('password') || 'Mật Khẩu Không Khớp'
                    }
                  }}
                  render={({ field }) => (
                    <InputPassword
                      name="confirmedPassword"
                      placeholder="Nhập Lại Mật Khẩu ..."
                      onChange={field.onChange}
                      value={getValues('confirmedPassword')}
                    />
                  )}
                />
                <ErrorMessage errors={errors} name="confirmedPassword" />
              </S.FormControl>
              <S.FormButton>
                <Button type="submit">Đăng Ký</Button>
              </S.FormButton>
            </S.Form>
            <S.FormFooter>
              <span>Bạn đã có tài khoản?</span>
              <Link to={path.login} className="link">
                Đăng nhập
              </Link>
            </S.FormFooter>
          </S.FormWrapper>
        </S.Container>
      </S.StyleRegister>
    </div>
  )
}
