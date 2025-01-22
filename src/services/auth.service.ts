/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { instance as axiosInstance } from '../helpers/axios/axiosInstance'
// import { getBaseURL } from '../src/helpers/config/envConfig';
import { authKey } from '../constants/storageKey'
import { decodedToken } from '@/utils/jwt'
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage'

export const storeUserInfo = ({ accessToken }: any) => {
  return setToLocalStorage(authKey, accessToken)
}

export const getSingleUserInfo = ({ userId }: any) => {
  console.log('userId', userId)
}

// ! get logged in user info
export const getLoggedInUser = () => {
  const authToken = getFromLocalStorage(authKey)
  if (authToken) {
    const decodedData = decodedToken(authToken)
    const { _id }: any = decodedData
    console.log(_id)
    return decodedData
  } else {
    return ''
  }
}

// export const loggedInUser = () =>{
// const
// }

export const getCartItems = () => {
  const items = getFromLocalStorage('cartList')
  console.log('items', items)
}

// ! return truthy or falsy value to check, is there anyone loggedIn
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey)
  return !!authToken
}

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key)
}

export const getNewAccessToken = async () => {
  console.log('getNewAccessToken is hitted')
  return await axiosInstance({
    url: `http://localhost:5000/api/v1/auth/refresh-token`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
}
