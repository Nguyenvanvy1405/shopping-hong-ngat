import { createAsyncThunk } from '@reduxjs/toolkit'
import purchaseApi from 'src/api/purchase.api'
import { payloadCreator } from 'src/utils/helper'

export const getPurchasesByStatus = createAsyncThunk(
  'user/getPurchasesByStatus',
  payloadCreator(purchaseApi.getPurchases)
)
