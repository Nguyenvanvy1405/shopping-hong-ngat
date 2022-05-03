import { isEmail } from 'src/utils/helper'

// Validate

export const rules = {
  name: {
    maxLength: {
      value: 160,
      message: 'Tên có độ dài từ 160 ký tự'
    }
  },
  phone: {
    maxLength: {
      value: 20,
      message: 'Số điện thoại có độ dài từ 20 ký tự'
    }
  },
  address: {
    maxLength: {
      value: 160,
      message: 'Địa chỉ có độ dài 160 ký tự'
    }
  },
  email: {
    required: {
      value: true,
      message: 'Email Bắt Buộc Nhập'
    },
    minLength: {
      value: 5,
      message: 'Email có độ dài từ 5-160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email có độ dài từ 5-160 ký tự'
    },
    validate: {
      email: v => isEmail(v) || 'Email Không Đúng Định Dạng'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Mật Khẩu là bắt buộc nhập'
    },
    minLength: {
      value: 6,
      message: 'Mật Khẩu có độ dài từ 6-160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Mật Khẩu có độ dài từ 6-160 ký tự'
    }
  },
  confirmedPassword: {
    required: {
      value: true,
      message: 'Nhập Lại Mật Khẩu là bắt buộc nhập'
    },
    minLength: {
      value: 6,
      message: 'Nhập Lại Mật Khẩu có độ dài từ 6-160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Nhập Lại Mật Khẩu có độ dài từ 6-160 ký tự'
    }
  }
}
