const initialState = {
    cart : localStorage['cart'] ? JSON.parse(localStorage['cart']) : null
}

const CartProducer = (state = initialState, action) => {
    switch (action.type) {
        case 'add':
            let cart = { ...state.cart }
            let product = action.payload

            if (cart) {
                cart[product.id] = cart[product.id] ? Number.parseInt(cart[product.id]) + Number.parseInt(product.quantity) : product.quantity
            } else {
                cart[product.id] = product.quantity
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            return {
                ...state,
                cart : cart
            }
    
        default:
            return state;
    }
}

export default CartProducer