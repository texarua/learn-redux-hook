import React, { Component, useEffect, useState } from 'react';
import Api from "../api";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import ListComment from "./list-comment";
import Comment from './comment';
import Rate from './rate'
import StarRatings from 'react-star-ratings';

function DetailBlog(props) {
  const [item, setItem] = useState({})
  const [comments, setComments] = useState({})
  const [rates, setRates] = useState({})
  const [rating, setRating] = useState(0)
  const [idSubComment, setIdSubComment] = useState(0)

  function addComment(data) {
    setComments(comments.concat(data))
  }

  function getIdSubComment(id) {
    setIdSubComment(id)
  }

  function getApiRate() {
    Api.get('/blog/rate/' + props.match.params.id)
      .then(response => {
           if (response.data.data instanceof Array) {
             let sumRate = 0;
               response.data.data.map((object, i) => {
                   return sumRate += object.rate
               })
             let avgRate = sumRate / response.data.data.length
             setRating(avgRate ? avgRate : 0 )
        }
        
       })
     .catch(error => { console.log(error) })
  }
  
  useEffect(
    () => {
      Api.get('/blog/detail/' + props.match.params.id)
        .then(response => {
            setItem(response.data.data)
            setComments(response.data.data.comment)       
        })
        .catch(error => { console.log(error) })
      getApiRate()
      
    }, [item.id]
  )

  function fetchData() {
    if (item) {
          return (
              <div className="col-sm-9">
                <div className="blog-post-area">
                  <h2 className="title text-center">Latest From our Blog</h2>
                  <div className="single-blog-post">
                    <h3>{ item.title }</h3>
                    <div className="post-meta">
                      <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                      </ul>
                      <span>
                        <StarRatings
                            rating={rating}
                            starRatedColor="#fe980f"
                            numberOfStars={5}
                            name='rating'
                        />
                      </span>
                    </div>
                    <a href>
                      <img src={ process.env.PUBLIC_URL + '/template/images/blog/' + item.image } alt="" />
                    </a>
                    <p>
                      { item.content }
                    </p>
                    <div className="pager-area">
                      <ul className="pager pull-right">
                        <li><a href="#">Pre</a></li>
                        <li><a href="#">Next</a></li>
                      </ul>
                    </div>
                  </div>
                </div>{/*/blog-post-area*/}
              <Rate rate={ rating } idBlog={item.id}/>
                <div className="socials-share">
                  <a href><img src="images/blog/socials.png" alt="" /></a>
                </div>{/*/socials-share*/}
                <div className="media commnets">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-one.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <h4 className="media-heading">Annie Davis</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="blog-socials">
                      <ul>
                        <li><a href><i className="fa fa-facebook" /></a></li>
                        <li><a href><i className="fa fa-twitter" /></a></li>
                        <li><a href><i className="fa fa-dribbble" /></a></li>
                        <li><a href><i className="fa fa-google-plus" /></a></li>
                      </ul>
                      <a className="btn btn-primary" href>Other Posts</a>
                    </div>
                  </div>
                </div>{/*Comments*/}
              <ListComment comments={ comments } getIdSubComment={ getIdSubComment } idBlog={ props.match.params.id } />
              <Comment idBlog={props.match.params.id} idSubComment={ idSubComment } addComment={ addComment }/>
              </div>
            );
      }  
  }

  return (
    <>
      { fetchData() }
    </> 
  )
}

export default DetailBlog
