import { unwrapResult } from '@reduxjs/toolkit'
import DOMPurify from 'dompurify'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProductQuantityController from 'src/components/ProductQuantityController/ProductQuantityController'
import ProductRating from 'src/components/ProductRating/ProductRating'
import { formatK, formatMoney, getIdFromNameId, rateSale } from 'src/utils/helper'
import { getCartPurchases } from '../Cart/cart.slice'
import { addToCart, getProductDetail } from './productDetail.slice'
import * as S from './productDetail.style'

export default function ProductDetail() {
  const [product, setProduct] = useState()
  // set current hiện tại
  const [currentImage, setCurrentImage] = useState({})
  // set current khi hover
  const [currentIndexImages, setCurrentIndexImage] = useState([0, 5])
  // state só lượng
  const [quantity, setQuantity] = useState(1)
  // tránh re-render : mỗi lần product/currentIndexImages thì nó mới re-render
  const currentImages = useMemo(() => {
    if (product) {
      return product.images.slice(...currentIndexImages)
    }
    return []
  }, [product, currentIndexImages])

  const dispatch = useDispatch()
  // lấy id từ params
  const { idProduct } = useParams()
  console.log(idProduct)

  useEffect(() => {
    // lấy id ra
    const realId = getIdFromNameId(idProduct)
    console.log(realId)
    dispatch(getProductDetail(realId))
      .then(unwrapResult)
      .then(res => {
        // tạo ra object có id để dễ mapping hơn
        res.data.images = res.data.images.map((image, index) => {
          return {
            url: image,
            id: index
          }
        })
        // chọn ảnh đầu tiên
        setCurrentImage(res.data.images[0])
        setProduct(res.data)
        console.log(res.data)
      })
  }, [idProduct])
  // chọn ảnh
  const chooseCurrent = image => setCurrentImage(image)

  const choosePrev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImage(currentIndexImages => [currentIndexImages[0] - 1, currentIndexImages[1] - 1])
    }
  }

  const chooseNext = () => {
    if (currentIndexImages[1] < product.images.length) {
      setCurrentIndexImage(currentIndexImages => [currentIndexImages[0] + 1, currentIndexImages[1] + 1])
    }
  }
  // xử lý số lượng
  const handleChangeQuantity = value => setQuantity(value)

  // Add vào giỏ hàng
  const handleAddToCart = async () => {
    const body = {
      product_id: product._id,
      buy_count: quantity
    }
    const res = await dispatch(addToCart(body)).then(unwrapResult)

    await dispatch(getCartPurchases()).then(unwrapResult)
    // toast hiện thông báo
    toast.success(res.message, {
      position: 'top-center',
      autoClose: 4000
    })
  }

  return (
    <div>
      {product && (
        <div className="container">
          <S.ProductBriefing>
            <S.ProductImages>
              <S.ProductImageActive>
                <img src={currentImage.url} alt={product.name} />
              </S.ProductImageActive>
              <S.ProdutImageSlider>
                <S.ProductIconButtonPrev onClick={choosePrev}>
                  <svg
                    enableBackground="new 0 0 13 20"
                    viewBox="0 0 13 20"
                    x={0}
                    y={0}
                    className="shopee-svg-icon icon-arrow-left-bold"
                  >
                    <polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9" />
                  </svg>
                </S.ProductIconButtonPrev>
                {currentImages.map(image => (
                  <S.ProductImage
                    key={image.id}
                    onMouseEnter={() => chooseCurrent(image)}
                    active={currentImage.id === image.id}
                  >
                    <img src={image.url} atl={image.url} />
                  </S.ProductImage>
                ))}
                <S.ProductIconButtonNext onClick={chooseNext}>
                  <svg
                    enableBackground="new 0 0 13 21"
                    viewBox="0 0 13 21"
                    x={0}
                    y={0}
                    className="shopee-svg-icon icon-arrow-right-bold"
                  >
                    <polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11" />
                  </svg>
                </S.ProductIconButtonNext>
              </S.ProdutImageSlider>
            </S.ProductImages>
            <S.ProductMeta>
              <S.ProductTitle>{product.name}</S.ProductTitle>
              <S.ProductMeta1>
                <S.ProductRating>
                  <span>{product.rating}</span>
                  <ProductRating rating={product.rating} />
                </S.ProductRating>
                <S.ProductSold>
                  <span>{formatK(product.sold)}</span>
                  <span>Đã bán</span>
                </S.ProductSold>
              </S.ProductMeta1>
              <S.ProductPrice>
                <S.ProductPriceOriginal>đ{formatMoney(product.price_before_discount)}</S.ProductPriceOriginal>
                <S.ProductPriceSale>đ{formatMoney(product.price)}</S.ProductPriceSale>
                <S.ProductPriceSalePercent>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </S.ProductPriceSalePercent>
              </S.ProductPrice>
              <S.ProductBuyQuantity>
                <S.ProductBuyQuantityTitle>Số lượng</S.ProductBuyQuantityTitle>
                <S.ProductBuyQuantityController>
                  {/* Xử lý quantity Product */}
                  <ProductQuantityController value={quantity} max={product.quantity} onChange={handleChangeQuantity} />
                </S.ProductBuyQuantityController>
                <S.ProductBuyQuantityQuantity>{product.quantity} sản phẩm có sẵn</S.ProductBuyQuantityQuantity>
              </S.ProductBuyQuantity>
              <S.ProductButtons onClick={handleAddToCart}>
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                  className="shopee-svg-icon _2FCuXA icon-add-to-cart"
                >
                  <g>
                    <g>
                      <polyline
                        fill="none"
                        points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                      />
                      <circle cx={6} cy="13.5" r={1} stroke="none" />
                      <circle cx="11.5" cy="13.5" r={1} stroke="none" />
                    </g>
                    <line fill="none" strokeLinecap="round" strokeMiterlimit={10} x1="7.5" x2="10.5" y1={7} y2={7} />
                    <line fill="none" strokeLinecap="round" strokeMiterlimit={10} x1={9} x2={9} y1="8.5" y2="5.5" />
                  </g>
                </svg>
                Thêm Vào Giỏ Hàng
              </S.ProductButtons>
            </S.ProductMeta>
          </S.ProductBriefing>
          <S.ProductContent>
            <S.ProductContentHeading>MÔ TẢ SẢN PHẨM</S.ProductContentHeading>
            <S.ProductContentDetail
              // render HTML 1 cách an toàn tránh tấn công XSS
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </S.ProductContent>
        </div>
      )}
    </div>
  )
}
