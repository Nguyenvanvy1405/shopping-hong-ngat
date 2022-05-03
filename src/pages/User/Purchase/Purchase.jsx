import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { path } from 'src/constants/path'
import { purchaseStatus } from 'src/constants/status'
import useQuery from 'src/hook/useQuery'
import { getPurchasesByStatus } from '../user.slice'
import * as S from './purchase.style'
import qs from 'query-string'
import { formatMoney, generateNameId } from 'src/utils/helper'

export default function Purchase() {
  const [purchases, setPurChase] = useState([])
  const dispatch = useDispatch()
  const query = useQuery()

  // chỉ khi query thay đổi status mới dc tính lại thôi
  const status = useMemo(() => query.status || purchaseStatus.all, [query])
  useEffect(() => {
    dispatch(getPurchasesByStatus(status))
      .then(unwrapResult)
      .then(res => {
        setPurChase(res.data)
      })
  }, [status, dispatch])

  const handleActive = value => () => Number(value) === Number(status)

  return (
    <div>
      <S.PurchaseTabs>
        <S.PurchaseTabItem to={path.purchase} isActive={handleActive(purchaseStatus.all)}>
          Tất cả
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{ pathName: path.purchase, search: `?${qs.stringify({ status: purchaseStatus.waitForConfirmation })}` }}
          isActive={handleActive(purchaseStatus.waitForConfirmation)}
        >
          Chờ Xác Nhận
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{ pathName: path.purchase, search: `?${qs.stringify({ status: purchaseStatus.waitForGetting })}` }}
          isActive={handleActive(purchaseStatus.waitForGetting)}
        >
          Chờ Lấy Hàng
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{ pathName: path.purchase, search: `?${qs.stringify({ status: purchaseStatus.inProgress })}` }}
          isActive={handleActive(purchaseStatus.inProgress)}
        >
          Đang Giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{ pathName: path.purchase, search: `?${qs.stringify({ status: purchaseStatus.delivered })}` }}
          isActive={handleActive(purchaseStatus.delivered)}
        >
          Đã Giao
        </S.PurchaseTabItem>
        <S.PurchaseTabItem
          to={{ pathName: path.purchase, search: `?${qs.stringify({ status: purchaseStatus.cancelled })}` }}
          isActive={handleActive(purchaseStatus.cancelled)}
        >
          Đã Giao
        </S.PurchaseTabItem>
      </S.PurchaseTabs>
      <S.PurchaseList>
        {purchases.map(purchase => (
          <S.OrderCard key={purchase._id}>
            <S.OrderCardContent>
              <S.OrderCardDetail>
                <img src={purchase.product.image} alt={purchase.product.name} />
                <S.OrderContent>
                  <S.OrderName>{purchase.product.name}</S.OrderName>
                  <S.OrderQuantity>x {purchase.buy_count}</S.OrderQuantity>
                </S.OrderContent>
              </S.OrderCardDetail>
              <S.OrderCardPrice>đ{formatMoney(purchase.product.price)}</S.OrderCardPrice>
            </S.OrderCardContent>
            <S.OrderCardButtonsContainer>
              <S.PurchaseButton to={path.product + `/${generateNameId(purchase.product)}`} light={1}>
                Xem sản phẩm
              </S.PurchaseButton>
              <S.TotalPrice>
                <S.TotalPriceLabel>Tổng giá tiền</S.TotalPriceLabel>
                <S.TotalPricePrice>đ{formatMoney(purchase.product.price * purchase.buy_count)}</S.TotalPricePrice>
              </S.TotalPrice>
            </S.OrderCardButtonsContainer>
          </S.OrderCard>
        ))}
      </S.PurchaseList>
    </div>
  )
}
