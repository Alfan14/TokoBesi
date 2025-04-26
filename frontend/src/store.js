import { createStore, combineReducers, applyMiddleware , compose } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productAllReducer,
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  useruPdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducer'
import {
  orderCreatedReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
  orderDeleteReducer,
} from './reducers/orderReducer'

const reducer = combineReducers({
  productAll : productAllReducer,
  productList: productListReducer,
  productDetails: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: useruPdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreatedReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  delettOrder: orderDeleteReducer,
})

// if there is a cartItems in local storage then parse it to object , else cartItemsFromStorage = empty array
const cartItemsFromStorge = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorge = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorge = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initalState = {
  cart: {
    cartItems: cartItemsFromStorge,
    shippingAddress: shippingAddressFromStorge,
  },
  userLogin: { userInfo: userInfoFromStorge },
}
const middleWare = [thunk]
const store = createStore(
  reducer,
  initalState,
  compose(applyMiddleware(...middleWare))
)

export default store