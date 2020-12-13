import React,{Component} from 'react';
import Products from './section/Products'
import Details from './section/Detail'
import {Route} from 'react-router-dom'
import Cart from './section/Cart'
import Payment from './section/Payment'
import About from './section/About'
export class Section extends React.Component{
  render(){
    return(
      <section>
        <Route path="/product" component={Products} exact />
        <Route path="/product/:id" component={Details}/>
        <Route path="/cart" component={Cart} />
        <Route path="/payment" component={Payment} />
        <Route path="/about" component={About} />
      </section>
    )
  }
}


export default Section;