import React,{Component} from 'react';
import { DataContext } from '../Context'
import {Link} from 'react-router-dom'
import '../css/Details.css'
import '../css/Cart.css'
export class Cart extends Component{
    static contextType = DataContext;
    componentDidMount(){
      this.context.getTotal();
    }
    render(){
        const {cart,increase,reduction,removeProduct,getTotal,total,removeAllProduct} =this.context;
        if(cart.length === 0){
          return(
          <h2 style={{textAlign:"center"}}>Nothings Product</h2>)
        } else{
          return(
            <>
        {
          cart.map(item =>(
            <div className="details" key={item._id}>  
              <img src={item.src} alt=""></img>
              <div className="box">
                  <div className="row">
                    <h2>{item.title}</h2>
                    <span>${item.price}</span>
                  </div>
                  <div className="colors">{
                    item.colors.map((color,index)=>(
                    <button key={index} style={{background: color}}></button> 
                    ))
                  }</div>
                  <p>{item.description}</p>
                  <p>{item.context}</p>
                  <div className="amount">
                    <button className="count" onClick={()=>reduction(item._id)}>-</button>
                    <span>{item.count}</span>
                    <button className="count" onClick={()=>increase(item._id)}>+</button>
                  </div>
              </div>
              <div className="delete" onClick={()=> removeProduct(item._id)}>X</div>
            </div>
          ))
        }
        <div className="total">
            <Link to="/payment" onClick={()=> removeAllProduct()}>Payment</Link>
      <h3>Total : ${total}</h3>
        </div>
      </>
        )
        }
        
    }
}
export default Cart;