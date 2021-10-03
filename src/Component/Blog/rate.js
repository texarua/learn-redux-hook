import React, { Component, useState } from 'react';
import StarRatings from 'react-star-ratings';
import Api, { getConfig } from '../api';

function Rate(props) {
    const [rates, setRates] = useState({})

    function doRate(newRating) {
        const userData = localStorage['auth'] ? JSON.parse(localStorage['auth']) : null
        if (userData) {
            const token = localStorage['token']
            let url = '/blog/rate/' + props.idBlog
    
            let config = getConfig(token)
            const formData = new FormData();
                formData.append('user_id', userData.id)
                formData.append('rate', newRating)
                formData.append('blog_id', props.idBlog)
    
            Api.post(url, formData ,config)
                .then(res => { alert(res.data.message) })
                .catch(err => { console.log(err) }) 
        } 
    }

    return (
        <div className="rating-area">
            <div className="rate">
                <div className="vote">
                     <StarRatings
                        rating={props.rate}
                        starRatedColor="#fe980f"
                        changeRating={doRate}
                        numberOfStars={5}
                        name='rating'
                    />
                </div> 
            </div>
             <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href>Pink <span>/</span></a></li>
                <li><a className="color" href>T-Shirt <span>/</span></a></li>
                <li><a className="color" href>Girls</a></li>
            </ul>
        </div>
    )
}
 export default Rate