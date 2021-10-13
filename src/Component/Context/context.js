import React from "react";
import { Component } from "react";
import { useEffect, useState } from "react/cjs/react.development";

export const MyContext = React.createContext()

class ContextCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {},
            userData: localStorage['auth'] ? JSON.parse(localStorage['auth']) : null,
            wishList: {}
        }
        this.addToCart = this.addToCart.bind(this)
    }
    

    addToCart(product) {
        let { cart } = this.state
        if (cart) {
            cart[product.id] = cart[product.id] ? Number.parseInt(cart[product.id]) + Number.parseInt(product.quantity) : product.quantity
        } else {
            cart[product.id] = product.quantity
        }
        this.setState({
            cart : cart
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    addToWishList(id) {
        let {wishList} = this.state
        if (!wishList[id]) {
            wishList[id] = true
        }
        this.setState({
            wishList : wishList
        })
    }

    render() {
        
        return (
            <MyContext.Provider
                value={{
                    cart: this.state.cart,
                    addToCart: (product) => this.addToCart(product),
                    addToWishList : (id) => this.addToWishList(id)
            }}>
                { this.props.children }
            </MyContext.Provider>    
        )
    }
}

export default ContextCart