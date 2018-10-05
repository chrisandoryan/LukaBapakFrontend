import React from 'react'
import {
    Link
} from 'react-router-dom'
import Header from '../shared/Header';
import AuthService from '../../services/AuthService';
import CartService from '../../services/CartService';
import OngkirService from '../../services/OngkirService';
const FileDownload = require('js-file-download');

class PurchasePayment extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.cartService = new CartService();
        this.ongkirService = new OngkirService();
        this.state = {
            user: {},
            isLoggedIn: false,
            cartContent: [],
            groupedProducts: [],
            availableCourier: [],
            totalPrice: 0,
        }
        this.fetchSupportedCourier = this.fetchSupportedCourier.bind(this);
        this.subTotal = 0;                                
    }

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    componentDidMount() {
        this.authService.isLoggedIn()
            .then(res => {
                if (res === false) {
                    this.setState({ isLoggedIn: res });
                    alert("Please login first!");
                    this.props.history.push("/login");
                }
                else {
                    this.setState({ user: res });
                    this.cartService.getCart()
                        .then(res => {
                            this.setState({ cartContent: res.data.data });
                            // console.log(this.state.cartContent);
                            const grouped = this.groupBy(res.data.data, p => p.product.user.name);
                            // console.log(grouped);
                            this.setState({ groupedProducts: grouped });
                        });
                }
            })
            .catch(err => {
                alert(err.message);
            });
    }

    fetchSupportedCourier(productWeight, qty, seller_city) {
        const couriers = ['jne', 'tiki', 'pos']
        const dest_id = this.state.user.city_id;

        couriers.map(courier => {
            // alert(courier);
            this.ongkirService.getCost(seller_city, dest_id, productWeight * qty, courier)
                .then(res => {
                    // alert(1);
                    console.log(res.data.rajaongkir.results);
                    const availableCourier = this.state.availableCourier;
                    availableCourier.push(res.data.rajaongkir.results);
                    this.setState({ availableCourier });
                })
                .then(() => {
                    console.log(this.state.availableCourier);
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }

    handleDownloadRequest(e) {
        e.preventDefault();
        this.cartService.downloadPurchaseTransaction()
            .then(res => {
                // console.log(res);
                FileDownload(res.data, 'transaction.xlsx');
            })
    }

    render() {
        return (
            <div className="app">
                <Header {...this.props} />
                <div className="content">
                    <div className="product-page">
                        <article className="product">
                            {/* Sticky section containing image gallery */}
                            <div className="product-media i-sticky">
                                <div className="dummy dummy--gallery">
                                    Detail Pembeli
                                    <div className="customer-detail">
                                        <h2>{this.state.user.name}</h2>
                                        <div className="customer-address">
                                            {this.state.user.address}
                                        </div>
                                        <Link className="change-address" to="ulala">Ubah Alamat</Link>
                                        <div className="as-dropshipper">
                                            <input type="checkbox" /> Kirim Sebagai Dropshipper
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-detail">
                                <div className="dummy">
                                    Ringkasan Belanja
                                    <div className="customer-detail">
                                        <h2>Ringkasan Belanja</h2>
                                        <div className="customer-address">
                                            <div className="use-voucher">
                                                <input type="text" placeholder="Punya Kode Voucher?" />
                                            </div>
                                            <div className="purchase-summary">
                                                <h3>Total Harga Barang</h3>
                                            </div>
                                            <span className="price">Rp. {this.subTotal}</span>
                                            <div className="purchase-summary">
                                                <h3>Biaya Kirim</h3>
                                            </div>
                                            <span className="price">Rp. {this.state.totalPrice}</span>
                                            <div className="purchase-summary">
                                                <h3>Biaya Asuransi</h3>
                                            </div>
                                            <span className="price">Rp. 30129</span>
                                            <br />
                                            <br />
                                            <div className="purchase-summary">
                                                <h2>Total Belanja</h2>
                                            </div>
                                            <span>Rp. 2932103</span>
                                            <br />
                                            <br />
                                            <button>Bayar</button>
                                            <br/>
                                            <br/>
                                            <a onClick={this.handleDownloadRequest.bind(this)}>Download Transaksi</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <div className="dummy">
                            Detail Belanja
                            {
                                Array.from(this.state.groupedProducts).map(([key, value]) => {
                                    console.log(key)
                                    return (
                                        <div className="product-purchased">
                                            Pembelian Dari <h3>{key}</h3>
                                            {
                                                value.map((data, index) => {
                                                    console.log(data)
                                                    this.subTotal = this.subTotal + (data.product.price * data.amount);
                                                    // alert(this.subTotal);
                                                    // this.setState({totalPrice: this.state.totalPrice + subTotal});
                                                    this.fetchSupportedCourier(data.product.weight, data.amount, data.product.user.city_id);
                                                    return (
                                                        <div className="detailProduct">
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
                                                                    <br />
                                                                </div>
                                                                <div className="product-line-price">{data.product.price * data.amount}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="specify-kurir">
                                                <h2>Kurir</h2>
                                            </div>
                                            <select className="dropdown-kurir" name="_pickCourier" id="">
                                                {
                                                    this.state.availableCourier.map((d, index) => {
                                                        console.log(d)
                                                        // <option value="">
                                                        //     Ulala
                                                        // </option>
                                                    })
                                                }
                                            </select>
                                            <br />
                                            <br />
                                            <br />
                                            <div>
                                                <div className="specify-kurir">
                                                    <h2>Catatan</h2>
                                                    <div className="purchase-note">
                                                        <textarea name="" id="" cols="30" rows="10" className="dropdown-kurir">

                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <br />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PurchasePayment;
