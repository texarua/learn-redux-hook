import React, { Component, useState } from "react";
import Api, { getConfig } from '../api';

function Comment(props) {
    const [comment, setComment] = useState('')
    const [userData, setUserData] = useState(localStorage['auth'] ? JSON.parse(localStorage['auth']) : null)

    function doComment(e) {
        e.preventDefault()
        if (userData) {
            const token = localStorage['token']
            let url = '/blog/comment/' + props.idBlog

            let config = getConfig(token)
        
            if (comment) {
                const formData = new FormData();
                formData.append('id_blog', props.idBlog)
                formData.append('id_user', userData.id)
                formData.append('id_comment', props.idSubComment ?? 0)
                formData.append('comment', comment)
                formData.append('image_user', userData.avatar)
                formData.append('name_user', userData.name)

                Api.post(url, formData, config)
                    .then(res => {
                        if (res.data.data) {
                            props.addComment(res.data.data);
                        }
                
                    })
                    .catch(err => console.log(err))
            }
        }
        
        
    }
    
    return (
        <div className="replay-box">
            <div className="row">       
                <form onSubmit={ doComment }>
                <div className="col-sm-8">
                <h2>Leave a replay</h2> 
                <div className="text-area">
                    <div className="blank-arrow">
                        <label>{ userData ? userData.name : 'Your Name' }</label>
                    </div>
                    <span>*</span>
                    <textarea id="comment" onChange={ e => setComment(e.target.value) } name="comment" rows={11} defaultValue={""} />
                    <button type="submit" className="btn btn-primary">post comment</button>
                </div>
                </div>
                </form>
            </div>
        </div>
    )
    
}

export default Comment