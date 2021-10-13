import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import './App.css';
import Header from './Component/Layout/Header';
import Footer from './Component/Layout/Footer';
import MenuLeft from './Component/Layout/MenuLeft';
import MenuAccount from './Component/Layout/MenuAcount';
import ContextCart from './Component/Context/context';

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let menu = <MenuLeft />;
    const specUrl = ['/login'];

    const urlAccount = '/account|/user/product+(/list|/add|/edit/[0-9])';
    if (specUrl.indexOf(this.props.location.pathname) != -1) {
      menu = null;
    }
    else if (this.props.location.pathname.match(urlAccount)) {
      menu = <MenuAccount />
    }
    let isLogged = false;
    if (localStorage['auth']) {
      isLogged = true;
    }
    return (
      <>
        <ContextCart>
          <Header isLogged={isLogged} />
      <section id="form">
        <div className="container">
          <div className="row">
            {menu}
            {this.props.children}
          </div>
        </div>
      </section>
          <Footer />
        </ContextCart>
      </>
    );
  }
 
}

export default withRouter(App);
