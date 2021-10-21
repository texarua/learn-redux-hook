import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart : localStorage['cart'] ? JSON.parse(localStorage['cart']) : null
    },
    reducers: {
        addCart(state, action) {
            const product  = action.payload
            let cart = state.cart
            if (cart) {
                cart[product.id] = cart[product.id] ? Number.parseInt(cart[product.id]) + Number.parseInt(product.quantity) : product.quantity
            } else {
                cart = {};
                cart[product.id] = product.quantity
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            state.cart = cart
        }
    }
})

export const { addCart } = CartSlice.actions
export default CartSlice.reducer