import React,{Component} from 'react';

export const DataContext = React.createContext();

export class DataProvider extends Component{
    
    state= {
        products: [
            {
                "_id" :"1",
                "title": "Nike Shoes 01",
                "src": "https://www.upsieutoc.com/images/2020/12/02/1461GIAY-NIKE-M2K-TEKNO-WOMEN-BQ3378-100--copy.jpg",
                "description": "Handez",
                "content":"Make by Handez",
                "price":23,
                "colors": ["red","black","crimson","teal"],
                "count":1
            },
            {
                "_id" :"2",
                "title": "Nike Shoes 02",
                "src": "https://www.upsieutoc.com/images/2020/12/02/341Giay-Nike-W-Air-Max-270-Pastel-Easter-CJ0568-100-copy.jpg",
                "description": "Handez",
                "content":"Make by Handez",
                "price":30,
                "colors": ["red","black","crimson","teal"],
                "count":1
            },
            {
                "_id" :"3",
                "title": "Nike Shoes 03",
                "src": "https://www.upsieutoc.com/images/2020/12/02/46440579_1547528245379439_732216388378165248_n.jpg",
                "description": "Handez",
                "content":"Make by Handez",
                "price":40,
                "colors": ["red","black","crimson","teal"],
                "count":1
            },
            {
                "_id" :"4",
                "title": "Nike Shoes 04",
                "src": "https://www.upsieutoc.com/images/2020/12/02/giay-nike-air-force-1-low-easter-cw0367-100-5f1916b77bdf9-23072020114855.jpg",
                "description": "Handez",
                "content":"Make by Handez",
                "price":50,
                "colors": ["red","black","crimson","teal"],
                "count":1
            }
        ],
        cart:[
        ],
        total:0
    };
    addCart = (id) =>{
        const{products,cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
             const data = products.filter(product =>{
            return product._id ===id
            })
            this.setState({cart: [...cart,...data]})
        }else {
            alert("The product has been added to cart");
        }
       
    }
    reduction =id =>{
        const {cart} = this.state;
        cart.forEach(item =>{
            if(item._id ===id){
                item.count ===1 ? item.count =1 : item.count -=1;
            }
        })
        this.getTotal();
        this.setState({cart:cart});
    }
    increase =id =>{
        const {cart} = this.state;
        cart.forEach(item =>{
            if(item._id ===id){
                item.count +=1;
            }
        })
        this.getTotal();
        this.setState({cart:cart});
    }

    removeProduct = id =>{
        if(window.confirm("Do You want to delete this product?")){
        const {cart} = this.state;
        cart.forEach((item,index) =>{
            if(item._id ===id){
                cart.splice(index,1)
            }
        })
        this.getTotal();
        this.setState({cart : cart})
        }
       
    }
    removeAllProduct = () =>{
        const {cart} = this.state;
        cart.forEach( (index) =>{
            cart.splice(index)
        })
        this.getTotal();
        this.setState({cart : cart})
    }
    getTotal =() =>{
        const{cart} = this.state;
        const res = cart.reduce((prev , item) => {
            return prev +(item.price*item.count);
        },0)
        this.setState({total : res})
    }
    componentDidUpdate(){
        localStorage.setItem('dataCart',JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal',JSON.stringify(this.state.total))
    }
    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'))
        if(dataCart!= null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'))
        if(dataTotal!= null){
            this.setState({total: dataTotal});
        }
    }
    render(){
        const {products,cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal,removeAllProduct}= this;
    return(
        <DataContext.Provider value={{products,addCart,cart,reduction,increase,removeProduct,getTotal,total,removeAllProduct}}>
            {this.props.children}
        </DataContext.Provider>
    )
  }
}

