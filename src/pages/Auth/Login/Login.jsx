import React from 'react'
import * as S from './login.style'
import { useForm, Controller } from 'react-hook-form'
import ErrorMessage from 'src/components/ErrorMessage/ErrorMessage'
import { Link, useHistory } from 'react-router-dom'
import InputPassword from 'src/components/InputPassword/InputPassword'
import InputText from 'src/components/InputText/InputText'
import { path } from 'src/constants/path'
import { rules } from 'src/constants/rules'
import { Button } from 'src/assets/styles/untils'
import { useDispatch } from 'react-redux'
import { login } from '../auth.slice'
import { unwrapResult } from '@reduxjs/toolkit'
export default function Login() {
  // validate
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const dispatch = useDispatch()

  const history = useHistory()

  const handleLogin = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      const res = await dispatch(login(body))
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
  return (
    <div>
      <S.StyleRegister>
        <S.Container className="container">
          <S.Banner></S.Banner>
          <S.FormWrapper>
            <S.FormTitle>Đăng Nhập</S.FormTitle>
            <S.Form onSubmit={handleSubmit(handleLogin)} noValidate>
              <S.FormControl>
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

              <S.FormButton>
                <Button type="submit">Đăng Nhập</Button>
              </S.FormButton>
            </S.Form>
            <S.FormFooter>
              <span>Bạn mới biết đến shoppe?</span>
              <Link to={path.register} className="link">
                Đăng ký
              </Link>
            </S.FormFooter>
          </S.FormWrapper>
        </S.Container>
      </S.StyleRegister>
    </div>
  )
}
