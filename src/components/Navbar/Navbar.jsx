import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { path } from 'src/constants/path'
import { useAuthenticated } from 'src/hook/useAuthenticated'
import usePopover from 'src/hook/usePopover'
import { logout } from 'src/pages/Auth/auth.slice'
import Popover from '../Popver/Popover'
import * as S from './navbar.style'

export default function Navbar() {
  // hooks trang thái đăng nhập(Custom)
  const authenticated = useAuthenticated()
  // Tìm tới state auth.profile
  const profile = useSelector(state => state.auth.profile)
  // custom ẩn hiện
  const { activePopover, showPopover, hidePopover } = usePopover()
  //
  const dispatch = useDispatch()
  // Call Api Logout
  const hanldeLogout = () => dispatch(logout())

  return (
    <div>
      <S.Navbar>
        <S.NavMenu>
          {authenticated && (
            <li>
              {/* Đưa chuột ra hoặc vào Popover */}
              <S.User onMouseEnter={showPopover} onMouseLeave={hidePopover}>
                <S.UserImage src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/273942873_3212747319046391_2073634045807692331_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=mTkMvy6SrMAAX_uV1ft&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT8OMTxNmxS9wLjQNzSarWictQKHbOgVT32WPoglLcp5fA&oe=6269551B" />
                <S.UserName>{profile.name || profile.email}</S.UserName>
                {/* Hiển thị Popover */}
                {activePopover && (
                  <Popover active={activePopover}>
                    <S.UserLink to={path.user}>Tài khoản của tôi</S.UserLink>
                    <S.UserLink to={path.purchase}>Đơn mua</S.UserLink>
                    <S.UserButton onClick={hanldeLogout}>Đăng xuất</S.UserButton>
                  </Popover>
                )}
              </S.User>
            </li>
          )}

          {!authenticated && (
            <Fragment>
              <li>
                <S.NavLink to={path.register}>Đăng Ký</S.NavLink>
              </li>
              <li>
                <S.NavLink to={path.login}>Đăng nhập</S.NavLink>
              </li>
            </Fragment>
          )}
        </S.NavMenu>
      </S.Navbar>
    </div>
  )
}
