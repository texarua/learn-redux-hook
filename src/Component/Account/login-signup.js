import React, { Component } from 'react';
import Login from './login';
import Signup from './signup';

function LoginSginup() {
    return (
        <>
            <Login />
            <div className="col-sm-1">
            <h2 className="or">OR</h2>
            </div>
            <Signup />
        </>
    )
}
export default LoginSginup