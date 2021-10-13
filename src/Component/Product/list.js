import React, { Component, useEffect } from 'react';
import Api, { getConfig } from '../api';
import { withRouter } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { useState } from 'react/cjs/react.development';

function ProductList(props) {
    const [user, setUser] = useState(localStorage['auth'] ? JSON.parse(localStorage['auth']) : null)
    const [products, setProducts] = useState({})

    useEffect(
        () => {
            if (user) {
                let token = localStorage['token']
                let config = getConfig(token)
                Api.get('user/my-product', config)
                    .then(res => { 
                        setProducts(res.data.data)
                    })
                .catch(err => console.log(err))
            } else {
                props.history.push('/login')
            }
            
        }, []
    )
    
    function renderImage(images, idProduct) {
        let listImage = JSON.parse(images)
        if (listImage instanceof Array) {
            return (
                listImage.map((image, i) => {
                    return (<img width="40px" height="40px" key={ i } 
                        src={ 'http://laravel-api.local/upload/user/product/' +user.id+ '/' + image} alt="" />
                    )
                })
            )
        }
    }

    function renderProducts() {
        let productItems = Object.values(products)
        if (productItems instanceof Array) {
            return (
                    <table className="table table-condensed">
                        <thead>
                        <tr className="cart_menu">
                            <td className="description">Id</td>
                            <td className="description">Name</td>
                            <td className="image">Image</td>
                            <td className="quantity">Price</td>
                            <td colSpan={2} className="total">Action</td>
                        </tr>
                        </thead>
                        <tbody>
                        {productItems.map((object, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <h4>{ object.id }</h4>
                                        </td>
                                        <td>
                                            <h4>{ object.name }</h4>
                                        </td>
                                        <td className="cart_product">
                                            {renderImage(object.image, object.id) }
                                        {/* @foreach(json_decode($pro-&gt;image) as $img)
                                        <img src="{{asset('upload/product/'.Auth::user()->id.'/'.$img)}}" width="40px" height="40px" alt="" />
                                        @endforeach */}
                                        </td>
                                        <td className="cart_price">
                                        <p>{ object.price }</p>
                                        </td>
                                        <td>
                                        <Link to={"/user/product/edit/" + object.id }><i className="glyphicon glyphicon-edit" /></Link>
                                        </td>
                                        <td className="cart_delete">
                                        <a className="cart_quantity_delete" href="#"><i className="fa fa-times" /></a>
                                        </td>
                                    </tr>
                                )

                             }) }
                        </tbody>
                    </table>
            )          
        }
        return <h1>No Product</h1>
    }

    
    return (
        <div className="col-sm-9">
            <h3>List Product</h3>
            <section id="cart_items">
                <div className="container col-sm-12">
                    <div className="table-responsive cart_info">
                        {renderProducts()}
                    </div>
                </div>
            </section>
            <div className="col-sm-12">
                <div className="signup-form">{/*sign up form*/}
                    <a href="/user/product/add" style={{ float: 'right' }} name="submit" className="btn btn-default">Create</a>
                </div>{/*/sign up form*/}
            </div>
        </div>
    )
    
}
export default withRouter(ProductList)