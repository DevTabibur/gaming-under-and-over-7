import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { instance as axiosInstance } from './axiosInstance'
import { IMeta } from '@/types'

//!========================================================================================================================>>>
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      meta?: IMeta
      contentType?: string
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          'Content-Type': contentType || 'application/json',
        },
        withCredentials: true, // ! for automatically storing jwt with cookie
      })
      // console.log('axios instance result', result);
      return result
    } catch (axiosError) {
      //  console.log('axiosError =>', axiosError);
      // eslint-disable-next-line prefer-const
      let err = axiosError as AxiosError
      return {
        status: err?.response?.status,
        data: err?.response?.data || err.message,
      }
    }
  }
