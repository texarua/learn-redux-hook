import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    BrowserRouter
 } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Home from './Component/Home';
import Blog from './Component/Blog';
import DetailBlog from './Component/Blog/detail';
import LoginSginup from './Component/Account/login-signup';
import UpdateUser from './Component/Account/update';
import ProductList from './Component/Product/list';
import Detail from './Component/Product/Detail';

ReactDOM.render(
 <Router>
        <App>
        
            <Switch>
                <Route exact path='/' component={Home}></Route>
                 {/* <Route exact path='/blog-hook/list' component={BlogHook}></Route>
                <Route exact path='/blog-hook/detail/:id' component={DetailBlogHook}></Route> */}
                <Route exact path='/product/detail/:id' component={ Detail } ></Route>
                    <Route path='/blog/list' component={Blog} ></Route>
                    <Route path='/blog/detail/:id' component={DetailBlog} ></Route>
                    <Route path='/login' component={LoginSginup}></Route>
                    <Route path='/account' component={UpdateUser}></Route>
                    <Route path='/user/product/list' component={ProductList}></Route>
                { /*<Route path='/user/product/add' component={ProductAdd}></Route>
                <Route path='/user/product/edit/:id' component={ProductUpdate}></Route> */}
                
                </Switch>
            
            
            </App>
    </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
