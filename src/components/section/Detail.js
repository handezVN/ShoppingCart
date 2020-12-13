import React,{Component} from 'react';
import { DataContext } from '../Context'
import {Link} from 'react-router-dom'
import '../css/Details.css'
export class Details extends React.Component{
  static contextType = DataContext;
  state = {
      product: []
    }
  getProduct = ()=>{
      if(this.props.match.params.id){
        const res = this.context.products;
        const data =res.filter(item => {
          return item._id === this.props.match.params.id;
        })
        this.setState({product:data})
      }
    }
  componentDidMount(){
      this.getProduct();
    }
  
  render(){
    const {product} = this.state;
    const {addCart} = this.context;
    return(
      
      <>
        {
          product.map(item =>(
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
                  <Link to="/cart" className="cart" onClick={()=> addCart(item._id)}>Add to Cart</Link>
              </div>
            </div>
          ))
        }
      </>
    )
  }
}


export default Details;