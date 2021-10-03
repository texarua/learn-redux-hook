import React, { Component } from 'react';
import { useState } from 'react/cjs/react.development';
import Api from '../api';

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState('')
    const [file, setFile] = useState({})
    const [errors, setErrors] = useState(null)
    const [message, setMessage] = useState(null)


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
        Api.post('/register', {
            name: name,
            email: email,
            password: password,
            address: address,
            phone: phone,
            avatar: avatar,
            level: 0
        })
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
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
                    Resgister Success !
                </div>;
            }
        }
    }

    return (
        <div className="col-sm-4">
            { renderMessage() }
            <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                <form onSubmit={ handleSubmit }>
                <input name="name" type="text" onChange={ e => setName(e.target.value) } value={ name }  placeholder="Name" />
                <input name="email" type="email"  onChange={ e => setEmail(e.target.value) } value={ email }  placeholder="Email"/>
                <input name="password" type="password" onChange={ e => setPassword(e.target.value) } value={ password }placeholder="Password" />
                <input name="address" type="text" onChange={ e => setAddress(e.target.value) } value={ address } placeholder="address" />
                <input name="phone" type="text" onChange={ e => setPhone(e.target.value) } value={ phone }  placeholder="phone" />
                <input name="avatar" onChange={ e => handleUserInputFile(e) } type="file"/>
                <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>{/*/sign up form*/}
        </div>
    );
}
export default Signup