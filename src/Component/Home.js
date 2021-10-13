import React, { useEffect, useState } from "react";
import { Component } from "react";
import api, { urlProductImage } from "./api";
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

function Home(props) {
    const [products, setProducts] = useState({})
    const [activePage, setActivePage] = useState(1)
    
    useEffect(
        () => {
            api.get('product/list?page=' + activePage)
            .then(res => {
                if (res.data.data) {
                    setProducts(res.data.data)
                }
            })
            .catch(console.error())
        }, [activePage]
    )

    function handlePageChange(pageNumber) {
        setActivePage(pageNumber)
    }

    function renderProducts() {
        if (products.data instanceof Array) {
            return products.data.map((item, i) => {
                let images = item.image.length ? JSON.parse(item.image) : null;
                return (
                    <div class="col-sm-4" key={i}>
                        <div class="product-image-wrapper">
                            <div class="single-products">
                                <div class="productinfo text-center">
                                    <img src={ urlProductImage + item.id_user + '/' + images[0] } alt="" />
                                    <h2>${ item.price }</h2>
                                    <p>{ item.name }</p>
                                    <Link to={"/product/detail/" + item.id} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Detail</Link>
                                </div>
                                <div class="product-overlay">
                                    <div class="overlay-content">
                                        <h2>{ item.status == '1' ? '$'+(item.sale ? item.sale : 0) : 'NOT SALE' }</h2>
                                        <p>{ item.name }</p>
                                        <Link to={"/product/detail/" + item.id} class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Detail</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="choose">
                                <ul class="nav nav-pills nav-justified">

                                                <li><a ><i class="fa fa-plus-square"></i>Add to wishlist</a></li>

                                    <li><a href=""><i class="fa fa-plus-square"></i>Add to compare</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    function renderPagination() {
        if (products.data instanceof Array) {
            return (
                <div class="pagination">
                    <Pagination
                         hideNavigation
                        activePage={activePage}/*  */
                        itemsCountPerPage={products.per_page}
                        totalItemsCount={products.total}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                        activeClassName={'active'}
                    />
                </div>
            )
        }
    }

    return (
        <>
            <div class="col-sm-9 padding-right">
                <div class="features_items">
                    <h2 class="title text-center">Features Items</h2>
                    { renderProducts() }
                    
                </div>
                { renderPagination() }
            </div>
        </>
    )
}


export default Home