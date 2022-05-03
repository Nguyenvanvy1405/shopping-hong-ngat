import React from 'react'
import * as S from './footer.style'

export default function Footer() {
  return (
    <S.Footer>
      <div className="container">
        <S.Footer1>
          © 2022 Hồng Ngát. Tất cả các quyền được bảo lưu.
          <S.Language>
            Ngôn ngữ:
            <span>Tiếng Anh</span>
            <span>Tiếng Việt</span>
          </S.Language>
        </S.Footer1>
        <S.Footer2>
          <div>Công Ty TNHH Hồng Ngát</div>
          <div>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.HồngNgát.vn
          </div>
          <div>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)</div>
          <div>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</div>
          <div>© 2015 - Bản quyền thuộc về Công ty TNHH Hồng Ngát</div>
        </S.Footer2>
      </div>
    </S.Footer>
  )
}
