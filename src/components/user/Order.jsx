import React from 'react'
import {
    Link
} from 'react-router-dom'
import Header from '../shared/Header';
import OrderService from '../../services/OrderService';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            cartContent: [],
        }
        this.orderService = new OrderService();
    }

    handleAcceptOrder(e) {
        const id = e.target.value;
        let d = new FormData();
        d.append('status', 1);
        this.orderService.acceptOrRejectOrder(id, d)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                alert(err.message);
            })
    }

    handleRejectOrder(e) {
        const id = e.target.value;
        let d = new FormData();
        d.append('status', 1);
        this.orderService.acceptOrRejectOrder(id, d)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                alert(err.message);
            })
    }

    componentDidMount() {
        this.orderService.getOrders()
            .then(res => {
                console.log(res.data.data);
                this.setState({ orders: res.data.data });
            })
            .catch(err => {
                alert(err.message);
            })
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <div className="content wrapper">
                    <div className="shopping-cart">
                        <div className="column-labels" style={{display:"block"}}>
                            <label className="product-image">Gambar</label>
                            <label className="product-details">Nama Produk</label>
                            <label className="product-price">Harga</label>
                            <label className="product-quantity">Jumlah</label>
                            <label className="product-line-price">Total</label>
                        </div>
                        {
                            this.state.orders.map((data, index) => {
                                console.log(data);
                                return (
                                    <div>
                                        <h2>Pesanan dari {data.user.name}</h2>
                                        {
                                            data.detail_transactions.map((product, index) => {
                                                console.log(product.product);
                                                return (
                                                    <div className="product">
                                                        <div className="product-image">
                                                            <img src="https://via.placeholder.com/300x300" />
                                                        </div>
                                                        <div className="product-details">
                                                            <div className="product-title">{product.product.name}</div>
                                                            {/* <p className="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p> */}
                                                        </div>
                                                        <div className="product-price">{product.product.price}</div>
                                                        <div className="product-quantity">
                                                            {product.amount}
                                                        </div>
                                                        <div className="product-removal">
                                                            {/* <button className="remove-product">
                                                                Remove
                                                            </button>
                                                            <button className="update-product">
                                                                Update
                                                            </button> */}
                                                            {/* <button>
                                                                Proses
                                                            </button> */}
                                                        </div>
                                                        <div className="product-line-price">{product.product.price * product.amount}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    <button value={data.id} onClick={this.handleAcceptOrder.bind(this)} style={{float:"right"}}>Terima Order</button>
                                    <button value={data.id} onClick={this.handleRejectOrder.bind(this)} style={{float:"right"}}>Tolak Order</button>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Order;