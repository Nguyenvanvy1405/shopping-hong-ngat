import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FilterPanel from 'src/components/FilterPanel/FilterPanel'
import SearchItemResult from 'src/components/SearchItemResult.jsx/SearchItemResult'
import useQuery from 'src/hook/useQuery'
import { getCategories, getProducts } from './home.slice'
import * as S from './home.style'

export default function Home() {
  // truyền props
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState({
    products: [],
    pagination: {}
  })
  const [filters, setFillters] = useState({})
  const dispatch = useDispatch()
  // custom sự thay đổi của URL
  const query = useQuery()

  // call API Category dùng  promise
  useEffect(() => {
    dispatch(getCategories())
      .then(unwrapResult)
      .then(res => {
        console.log(res.data)
        setCategories(res.data)
      })
  }, [dispatch])

  // call API Products dùng async await
  useEffect(() => {
    // đặt biến kiểu private _[name]
    // sort_by
    const _filters = { ...query, page: query.page || 1, limit: query.limit || 30, sortBy: query.sortBy || 'view' }
    setFillters(_filters)
    const params = {
      page: _filters.page,
      limit: _filters.limit,
      category: _filters.category,
      exclude: _filters.exclude,
      rating_filter: _filters.rating,
      price_max: _filters.maxPrice,
      price_min: _filters.minPrice,
      sort_by: _filters.sortBy,
      order: _filters.order,
      name: _filters.name
    }
    const _getProducts = async () => {
      const data = await dispatch(getProducts({ params }))
      const res = unwrapResult(data)
      console.log(res.data)
      setProducts(res.data)
    }
    _getProducts()
  }, [query, dispatch])

  return (
    <div>
      <S.Container className="container">
        <S.Slide>
          <FilterPanel categories={categories} filters={filters} />
        </S.Slide>

        <S.Main>
          <SearchItemResult products={products} filters={filters} />
        </S.Main>
      </S.Container>
    </div>
  )
}
