import { purchaseStatus } from 'src/constants/status'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseApi = {
  // Thêm vào giỏ hàng
  addToCart(data) {
    return http.post(`${URL}/add-to-cart`, data)
  },
  // Get thong tin giỏ hàng
  getCartPurchases() {
    return http.get(URL, {
      params: {
        status: purchaseStatus.inCart
      }
    })
  },
  // Get thông tin giỏ hàng theo trang thái lúc mua xong
  getPurchases(status) {
    return http.get(URL, {
      params: {
        status
      }
    })
  },
  // Update Purchase
  updatePurchases(data) {
    return http.put(`${URL}/update-purchase`, data)
  },
  // Xóa
  deletePurchase(data) {
    return http.delete(`${URL}`, data)
  },
  // Thanh Toán
  buyPurchases(data) {
    return http.post(`${URL}/buy-products`, data)
  }
}

export default purchaseApi
