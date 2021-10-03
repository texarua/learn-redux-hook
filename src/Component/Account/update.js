import React, { Component, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useState } from 'react/cjs/react.development';
import Api, { getConfig } from '../api';

function UpdateUser(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState('')
    const [file, setFile] = useState({})
    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)
    const [user, setUser] = useState(localStorage['auth'] ? JSON.parse(localStorage['auth']) : null)
    const [token, setToken] = useState(localStorage['token'])
    
    useEffect(
        () => {
            if (user) {
                setName(user.name)
                setEmail(user.email)
                setPassword(user.password)
                setAddress(user.address)
                setPhone(user.phone)
            } else {
                props.history.push('/login')
            }
        }, []
    )

    function handleUserInputFile(e) {
        const file = e.target.files;

        let reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFile(file[0])
        }
        reader.readAsDataURL(file[0]);
    }

    function handleSubmit(e) {
        
        e.preventDefault();
        let url = 'user/update/' + user.id
        let config = getConfig(token)
        
            const formData = new FormData();
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password ?? user.password)
            formData.append('address', address)
            formData.append('phone', phone)
            if (avatar) {
                formData.append('avatar', avatar)    
            }
                Api.post(url, formData, config)
                    .then(res => {
                        console.log(res)
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    res.data.Auth.password = ''
                    localStorage.setItem('auth', JSON.stringify(res.data.Auth))
                    setMessage(true)
                }
             })
            .catch(error => {console.log(error)});
    }

    function renderMessage() {
        if (errors) {
            let contentErr = Object.values(errors);
            return <div class="alert alert-danger" role="alert">
            {contentErr.map((fieldName, i) => { 
                return <p key={i}>{ contentErr[i][0] }</p>
             }) }
            </div>;
        } else {
            if (message) {
                return <div class="alert alert-success" role="alert">
                    Update Success !
                </div>; 
            }
        }
    }

    function renderUpdate() {
        if (user) {
            return (
                <div className="col-sm-4">
                    {renderMessage()}
                    <div className="signup-form">{/*sign up form*/}
                        <h2>User Update !</h2>
                        <form onSubmit={handleSubmit}>
                            <input name="name" type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Name" />
                            <input name="email" type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" />
                            <input name="password" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" />
                            <input name="address" type="text" onChange={e => setAddress(e.target.value)} value={address} placeholder="address" />
                            <input name="phone" type="text" onChange={e => setPhone(e.target.value)} value={phone} placeholder="phone" />
                            <input name="avatar" onChange={handleUserInputFile} type="file" />
                            <button type="submit" className="btn btn-default">Signup</button>
                        </form>
                    </div>{/*/sign up form*/}
                </div>
            )
        }
    }

    return (
        <>
            {renderUpdate()}
        </>
    )
}
export default withRouter(UpdateUser)
