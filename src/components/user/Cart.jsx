import React from 'react'
import {
    Link
} from 'react-router-dom'
import Header from '../shared/Header';
import AuthService from '../../services/AuthService';
import ProductService from '../../services/ProductService';
import CartService from '../../services/CartService';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartContent: [],
        }
        this.service = new AuthService();
        this.cart = new CartService();
    }

    componentWillMount() {
        this.service.isLoggedIn()
            .then(res => {
                if (res === false) {
                    alert("Please login to see your cart");
                    this.props.history.push("/login");
                }
            });
        this.cart.getCart()
            .then(res => {
                const cartContent = res.data.data;
                this.setState({ cartContent });
            })
            .catch(err => {
                alert(err.message);
            });
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <div className="content wrapper">
                    <div className="shopping-cart">
                        <div className="column-labels">
                            <label className="product-image">Gambar</label>
                            <label className="product-details">Nama Produk</label>
                            <label className="product-price">Harga</label>
                            <label className="product-quantity">Jumlah</label>
                            <label className="product-removal">Remove</label>
                            <label className="product-line-price">Total</label>
                        </div>
                        {
                            this.state.cartContent.map((data, index) => {
                                return (
                                    <div className="product">
                                        <div className="product-image">
                                            <img src="https://via.placeholder.com/300x300" />
                                        </div>
                                        <div className="product-details">
                                            <div className="product-title">{data.product.name}</div>
                                            {/* <p className="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p> */}
                                        </div>
                                        <div className="product-price">{data.product.price}</div>
                                        <div className="product-quantity">
                                            <input defaultValue={data.amount} min={1} type="number" />
                                        </div>
                                        <div className="product-removal">
                                            <button className="remove-product">
                                                Remove
                                            </button>
                                            <button className="update-product">
                                                Update
                                            </button>
                                        </div>
                                        <div className="product-line-price">{data.product.price * data.amount}</div>
                                    </div>
                                )
                            })
                        }
                        <Link to="/payment"><button className="checkout">Checkout</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;
