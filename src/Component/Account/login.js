import React, { Component, useState } from 'react';
import Api from '../api';
import { withRouter } from 'react-router-dom';

function Login(props) {
    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [errors, setErrors] = useState('')
    const [message, setMessage] = useState('')

    function doLogin(e) {
        e.preventDefault()
        Api.post('/login', {
            email: emailLogin,
            password: passwordLogin
        })
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    setMessage(true)
                }
                if (!res.data.errors) {
                    localStorage.setItem('auth', JSON.stringify(res.data.Auth));
                    localStorage.setItem('token', res.data.success.token)
                    props.history.goBack();
                }
             })
        .catch(err => {console.log(err)})
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
                    Login Success !
                </div>;
            }
        }
    }

    return (
        <div className="col-sm-4 col-sm-offset-1">
            { renderMessage() }
            <div className="login-form">{/*login form*/}
                <h2>Login to your account</h2>
                <form onSubmit={ doLogin }>
                    <input name="emailLogin" onChange={ e => setEmailLogin(e.target.value) } type="text" placeholder="email" value={ emailLogin } />
                    <input name="passwordLogin" onChange={ e => setPasswordLogin(e.target.value) } placeholder="password" type="password" value={ passwordLogin }  />
                <span>
                    <input type="checkbox" className="checkbox" /> 
                    Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">Login</button>
                </form>
            </div>{/*/login form*/}
        </div>
    );
}
export default withRouter(Login)