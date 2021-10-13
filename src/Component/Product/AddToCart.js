import React from "react";
import { Component } from "react";

class AddToCart extends Component {
    constructor(props) {
        super(props)
    }

    handleAddToCart() {

    }

    render() {
        return (
            <>
              <a href="javascript:void(0)" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
            </>
        )
    }
}

function AddToCart() {
    
}

export default AddToCart