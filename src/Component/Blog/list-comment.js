import React, { Component } from 'react';
import Api from "../api";

function ListComment(props) {
  
  function getIdSubComment(idParent) {
    props.getIdSubComment(idParent);
  }

  function renderChildComment(listComment, idParent) {
    if (listComment) {
      return listComment.map((object, i) => {
        if (object.id_comment == idParent) {
          return (
            <li key={ i } className="media second-media">
              <a className="pull-left" href="#">
                <img className="media-object"  src={ process.env.PUBLIC_URL + 'images/blog/' + object.image_user } alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user" />{ object.name_user }</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <p>{ object.comment }</p>
                <a className="btn btn-primary" href="#comment" onClick={ getIdSubComment(idParent) }><i className="fa fa-reply" />Replay</a>
              </div>
            </li>
            )
          }
      })
    }
   
  }

  function renderComments() {
    let listComments = props.comments
    if (listComments instanceof Array) {
      return listComments.map((object, i) => {
        if (object.id_comment == 0) {
              return (
                <>
                <li key={ i } className="media">
                    <a className="pull-left" href="#">
                        <img className="media-object" src={ process.env.PUBLIC_URL + 'images/blog/' + object.image_user } alt="" />
                    </a>
                    <div className="media-body">
                        <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />{object.name_user }</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                    <p>{ object.comment }</p>
                    <a className="btn btn-primary" href="#comment" onClick={ getIdSubComment(object.id) }><i className="fa fa-reply" />Replay</a>
                    </div>
                </li>
                { renderChildComment(listComments, object.id) }
              </>
            )      
          }
        
      })
    }
  }

  return (
    <>
        <div className="response-area">
            <h2>3 RESPONSES</h2>
            <ul className="media-list">
                { renderComments() }
            </ul>					
          </div>{/*/Response-area*/}
    </>
  )
}

export default ListComment