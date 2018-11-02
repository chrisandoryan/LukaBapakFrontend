import React from 'react'
import {
    Link
} from 'react-router-dom'
import Header from '../shared/Header';
import OrderService from '../../services/OrderService';

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            cartContent: [],
            acceptedOrders: [],
            ongoingOrders: [],
            finishedOrders: [],
        }
        this.orderService = new OrderService();
    }

    handleFinishTransaction(e) {
        const id = e.target.value;
        let d = new FormData();
        d.append('status', -2); //-2 adalah selesai
        d.append('_method', "PUT");
        this.orderService.acceptOrRejectOrder(id, d)
            .then(res => {
                // console.log('ulala', res);
                this.componentDidMount();
            })
            .catch(err => {
                alert(err.message);
            })
    }

    addResi(e) {
        e.preventDefault();
        var id = e.target.order_id.value;
        // alert(id);
        var d = new FormData();
        d.append('resi', e.target.resi.value);
        this.orderService.addResi(id, d)
            .then(res => {
                console.log(res.data);
                this.componentDidMount();
            })
            .catch(err => {
                alert(err.message);
            })
    }

    componentDidMount() {
        this.orderService.getOngoingTransactions()
            .then(res => {
                console.log(res.data.data);
                this.setState({ongoingOrders: res.data.data});
            })
            .catch(err => {
                alert(err.message);
            })
        this.orderService.getFinishedTransactions()
            .then(res => {
                console.log('yomann', res.data);
                this.setState({finishedOrders: res.data.data});
            })
            .catch(err => {
                alert(err.message);
            })
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <br /><br />
                <div className="content wrapper">
                    <h1>Status Pemesanan</h1>
                </div>
                <div className="content wrapper">
                    <div className="shopping-cart">
                        <div className="column-labels" style={{ display: "block" }}>
                            <label className="product-image">Gambar</label>
                            <label className="product-details">Nama Produk</label>
                            <label className="product-price">Harga</label>
                            <label className="product-quantity">Jumlah</label>
                            <label className="product-line-price">Total</label>
                        </div>
                        {
                            this.state.ongoingOrders.map((data, index) => {
                                console.log('hereh', data);
                                return (
                                    <div>
                                        <h2>Pesanan dari Toko {data.seller.name}</h2>
                                        <br/>
                                        <h3><b>Alamat</b></h3>
                                        <br/>
                                        <p>{data.delivery_address}</p>
                                        <br/>
                                        <h3><b>Nomor Resi</b></h3>
                                        <br/>
                                        <p>{data.resi}</p>
                                        {
                                            data.detail_transactions.map((product, index) => {
                                                console.log('hola', product);
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
                                                        </div>
                                                        <div className="product-line-price">{product.product.price * product.amount}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <button value={data.id} onClick={this.handleFinishTransaction.bind(this)} style={{ float: "right" }}>Sudah Terima</button>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="content wrapper">
                    <h1>Histori Pemesanan</h1>
                </div>
                <div className="content wrapper">
                    <div className="shopping-cart">
                        <div className="column-labels" style={{ display: "block" }}>
                            {/* <label className="product-image">Gambar</label>
                            <label className="product-details">Nama Produk</label>
                            <label className="product-price">Harga</label>
                            <label className="product-quantity">Jumlah</label>
                            <label className="product-line-price">Total</label> */}
                        </div>
                        {
                            this.state.finishedOrders.map((data, index) => {
                                console.log('iyeyy', data);
                                const status = data.status_id == -1 ? "Pesanan Dibatalkan" : "Pesanan Selesai";
                                return (
                                    <div>
                                        <h2>Pesanan dari {data.seller.name}</h2>
                                        <br />
                                        <h3>Order No: #ndasiu3901</h3>
                                        <br />
                                        <h3>Tanggal: {new Date(Date.parse(data.created_at)).toDateString()}</h3>
                                        <br />
                                        <h3>Status: {status}</h3>
                                        <br />
                                        {/* <h3>Tujuan Pengiriman</h3>
                                        <br />
                                        <p>Jalan Kuda Betina Yo Yo Yobaba</p> */}
                                        {
                                            data.detail_transactions.map((product, index) => {
                                                console.log(product.product);
                                                return (
                                                    <div className="product">
                                                        <div className="product-details">
                                                            <div className="product-title"><h3>{product.product.name}</h3></div>
                                                        </div>
                                                        <div className="product-price">{product.product.price}</div>
                                                        <div className="product-removal">
                                                        </div>
                                                        <div className="product-line-price">{product.product.price * product.amount}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <button value={data.id}>Lihat Detail</button>
                                        {/* <button value={data.id} onClick={this.handleAcceptOrder.bind(this)} style={{ float: "right" }}>Terima Order</button>
                                        <button value={data.id} onClick={this.handleRejectOrder.bind(this)} style={{ float: "right" }}>Tolak Order</button> */}
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
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

export default Transaction;