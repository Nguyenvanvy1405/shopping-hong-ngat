import { useSelector } from 'react-redux'

// custom Trang Thái đăng nhập / Đăng ký
export function useAuthenticated() {
  // tìm đếm state _id của thằng User
  // Có _id là đã đăng nhập true, ngược lại false
  return useSelector(state => Boolean(state.auth.profile._id))
}
