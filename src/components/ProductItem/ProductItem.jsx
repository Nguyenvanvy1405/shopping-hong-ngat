import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from '../ProductRating/ProductRating'
import * as S from './productItem.style'
import PropTypes from 'prop-types'
import { path } from 'src/constants/path'
import { formatK, formatMoney, generateNameId } from 'src/utils/helper'
export default function ProductItem({ products }) {
  return (
    <S.Product>
      <Link to={path.product + `/${generateNameId(products)}`}>
        <S.ProductItem>
          <S.ProductItemImage>
            <img src={products.image} alt={products.name} />
          </S.ProductItemImage>
          <S.ProductItemInfo>
            <S.ProductItemTitle>{products.name}</S.ProductItemTitle>
            <S.ProductItemPrice>
              <S.ProductItemPriceOriginal>đ {formatMoney(products.price_before_discount)}</S.ProductItemPriceOriginal>
              <S.ProductItemPriceSale>đ {formatMoney(products.price)}</S.ProductItemPriceSale>
            </S.ProductItemPrice>
            <S.ProductItemMeta>
              <ProductRating rating={products.rating} />
              <S.ProductItemSold>
                <span>{formatK(products.sold)}</span>
                <span>Đã bán</span>
              </S.ProductItemSold>
            </S.ProductItemMeta>
          </S.ProductItemInfo>
        </S.ProductItem>
      </Link>
    </S.Product>
  )
}

ProductItem.propTypes = {
  product: PropTypes.object
}
