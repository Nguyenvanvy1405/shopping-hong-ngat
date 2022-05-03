import { createNextState, unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from 'src/components/Checkbox/Checkbox'
import ProductQuantityController from 'src/components/ProductQuantityController/ProductQuantityController'
import { formatMoney } from 'src/utils/helper'
import { buyPurchases, deletePurchases, getCartPurchases, updatePurchases } from './cart.slice'
import * as S from './Cart.style'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'

export default function Cart() {
  const purchases = useSelector(state => state.cart.purchases)

  const dispatch = useDispatch()
  //createNextState sử dụng như ' Produce immer '.
  const [localPurchases, setLocalPurchases] = useState(() =>
    createNextState(purchases, draft => {
      draft.forEach(purchases => {
        purchases.disabled = false
        purchases.checked = false
      })
    })
  )

  const isCheckedAll = localPurchases.every(purchase => purchase.checked)

  const checkedPurchases = localPurchases.filter(purchase => purchase.checked)

  const totalCheckedPurchases = checkedPurchases.length

  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)

  const totalCheckedPurchasesSavingPrice = checkedPurchases.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)
  // Cập nhật lại LocalPurchase
  useEffect(() => {
    setLocalPurchases(localPurchases => {
      const localpurchasesObject = keyBy(localPurchases, '_id')
      return createNextState(purchases, draft => {
        draft.forEach(purchases => {
          purchases.disabled = false
          purchases.checked = Boolean(localpurchasesObject[purchases._id]?.checked)
        })
      })
    })
  }, [purchases])

  // Xử lý nhập dữ liệu vào Input số lượng
  const hanldeInputQuantity = indexPurchase => value => {
    const newLocalPurchases = createNextState(localPurchases, draft => {
      draft[indexPurchase].buy_count = value
    })
    setLocalPurchases(newLocalPurchases)
  }
  //
  const handleBlurQuantity = indexPurchase => async value => {
    const purchase = localPurchases[indexPurchase]
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = true
      })
    )
    await dispatch(
      updatePurchases({
        product_id: purchase.product._id,
        buy_count: value
      })
    ).then(unwrapResult)
    await dispatch(getCartPurchases()).then(unwrapResult)
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = false
      })
    )
  }

  //
  const handleIncreaseAndDecrease = indexPurchase => async value => {
    const purchase = localPurchases[indexPurchase]
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = true
        draft[indexPurchase].buy_count = value
      })
    )
    await dispatch(
      updatePurchases({
        product_id: purchase.product._id,
        buy_count: value
      })
    ).then(unwrapResult)
    await dispatch(getCartPurchases()).then(unwrapResult)
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].disabled = false
      })
    )
  }

  const handleCheck = indexPurchase => value => {
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft[indexPurchase].checked = value
      })
    )
  }

  const handleCheckAll = () => {
    setLocalPurchases(localPurchases =>
      createNextState(localPurchases, draft => {
        draft.forEach(purchase => {
          purchase.checked = !isCheckedAll
        })
      })
    )
  }

  const handleRemove = indexPurchase => async () => {
    const purchase_id = localPurchases[indexPurchase]._id
    await dispatch(deletePurchases([purchase_id])).then(unwrapResult)
    await dispatch(getCartPurchases()).then(unwrapResult)
    toast.success('Xóa đơn thành công', {
      position: 'top-center',
      autoClose: 3000
    })
  }

  const handleRemoveManyPurchase = async () => {
    const purchase_ids = checkedPurchases.map(purchase => purchase._id)
    await dispatch(deletePurchases(purchase_ids)).then(unwrapResult)
    await dispatch(getCartPurchases()).then(unwrapResult)
    toast.success('Xóa đơn thành công', {
      position: 'top-center',
      autoClose: 3000
    })
  }

  const handleBuyPurchases = async () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map(purchase => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      await dispatch(buyPurchases(body)).then(unwrapResult)
      await dispatch(getCartPurchases()).then(unwrapResult)
      toast.success('Đăt đơn thành công', {
        position: 'top-center',
        autoClose: 3000
      })
    }
  }

  return (
    <div className="container">
      <div>
        <S.ProductHeader>
          <S.ProductHeaderCheckbox>
            <Checkbox onChange={handleCheckAll} checked={isCheckedAll} />
          </S.ProductHeaderCheckbox>
          <S.ProductHeaderName>Sản Phẩm</S.ProductHeaderName>
          <S.ProductHeaderUnitPrice>Đơn Giá</S.ProductHeaderUnitPrice>
          <S.ProductHeaderQuantity>Số Lượng</S.ProductHeaderQuantity>
          <S.ProductHeaderTotalPrice>Số tiền</S.ProductHeaderTotalPrice>
          <S.ProductHeaderAction>Thao tác</S.ProductHeaderAction>
        </S.ProductHeader>
        <S.ProductSection>
          {localPurchases.map((purchases, index) => (
            <S.CartItem key={purchases._id}>
              <S.CartItemCheckbox>
                <Checkbox checked={purchases.checked} onChange={handleCheck(index)} />
              </S.CartItemCheckbox>
              <S.CartItemOverview>
                <S.CartItemOverviewImage to="">
                  <img src={purchases.product.image} alt="ảnh" />
                </S.CartItemOverviewImage>
                <S.CartItemOverViewNameWrapper>
                  <S.CartItemOverviewName to="">{purchases.product.name}</S.CartItemOverviewName>
                </S.CartItemOverViewNameWrapper>
              </S.CartItemOverview>
              <S.CartItemUnitPrice>
                <span>đ{formatMoney(purchases.product.price_before_discount)}</span>
                <span>đ{formatMoney(purchases.product.price)}</span>
              </S.CartItemUnitPrice>
              <S.CartItemQuantity>
                <ProductQuantityController
                  max={purchases.product.quantity}
                  value={purchases.buy_count}
                  disabled={purchases.disabled}
                  onInput={hanldeInputQuantity(index)}
                  onBlur={handleBlurQuantity(index)}
                  onIncrease={handleIncreaseAndDecrease(index)}
                  onDecrease={handleIncreaseAndDecrease(index)}
                />
              </S.CartItemQuantity>
              <S.CartItemTotalPrice>
                <span>đ{formatMoney(purchases.product.price * purchases.buy_count)}</span>
              </S.CartItemTotalPrice>
              <S.CartItemAction>
                <S.CartItemActionButton onClick={handleRemove(index)}>Xóa</S.CartItemActionButton>
              </S.CartItemAction>
            </S.CartItem>
          ))}
        </S.ProductSection>
      </div>
      <S.CartFooter>
        <S.CartFooterCheckbox>
          <Checkbox onChange={handleCheckAll} checked={isCheckedAll} />
        </S.CartFooterCheckbox>
        <S.CartFooterButton onClick={handleCheckAll}>Chọn tất cả ({purchases.length})</S.CartFooterButton>
        <S.CartFooterButton onClick={handleRemoveManyPurchase}>Xóa</S.CartFooterButton>
        <S.CartFooterSpaceBetween />
        <S.CartFooterPrice>
          <S.CartFooterPriceTop>
            <div>Tổng Thanh Toán ({totalCheckedPurchases} sản phẩm):</div>
            <div>đ{formatMoney(totalCheckedPurchasesPrice)}</div>
          </S.CartFooterPriceTop>
          <S.CartFooterPriceBot>
            <div>Tiết kiệm</div>
            <div>đ{formatMoney(totalCheckedPurchasesSavingPrice)}</div>
          </S.CartFooterPriceBot>
        </S.CartFooterPrice>
        <S.CartFooterCheckout onClick={handleBuyPurchases}>Mua hàng</S.CartFooterCheckout>
      </S.CartFooter>
    </div>
  )
}
