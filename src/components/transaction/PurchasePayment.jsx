import React from 'react'
import {
    Link
} from 'react-router-dom'
import Header from '../shared/Header';
import AuthService from '../../services/AuthService';
import CartService from '../../services/CartService';

class PurchasePayment extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.cartService = new CartService();
        this.state = {
            user: {},
            isLoggedIn: false,
            cartContent: [],
        }
    }

    componentDidMount() {
        this.authService.isLoggedIn()
            .then(res => {
                if (res === false) {
                    this.setState({isLoggedIn: res});
                    alert("Please login first!");
                    this.props.history.push("/login");
                }
                else {
                    this.setState({user: res});
                    this.cartService.getCart()
                        .then(res => {
                            this.setState({cartContent: res.data.data});
                            console.log(this.state.cartContent);
                        });
                }
            })
            .catch(err => {
                alert(err.message);
            });
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
                                            <span className="price">Rp. 1000000</span>
                                            <div className="purchase-summary">
                                                <h3>Biaya Kirim</h3>
                                            </div>
                                            <span className="price">Rp. 2000000</span>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <div className="dummy">
                            Detail Belanja
                            {
                                this.state.cartContent.map((data, index) => {
                                    console.log(data);
                                })
                            }
                            <div className="product-purchased">
                                Pembelian Dari <h3>Penjual Bahagia</h3>
                                <div className="detailProduct">
                                    <div className="product">
                                        <div className="product-image">
                                            <img src="https://via.placeholder.com/300x300" />
                                        </div>
                                        <div className="product-details">
                                            <div className="product-title">Kuda Bening</div>
                                            {/* <p className="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p> */}
                                        </div>
                                        <div className="product-price">Sejuta ribu</div>
                                        <div className="product-quantity">
                                            <input defaultValue={2} min={1} type="number" />
                                        </div>
                                        <div className="product-removal">
                                            <button className="remove-product">
                                                Remove
                                            </button>
                                            <button className="update-product">
                                                Update
                                            </button>
                                        </div>
                                        <div className="product-line-price">Rp. 9999</div>
                                    </div>
                                </div>
                                <div className="detailProduct">
                                    <div className="product">
                                        <div className="product-image">
                                            <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" />
                                        </div>
                                        <div className="product-details">
                                            <div className="product-title">Kuda Bening</div>
                                            {/* <p className="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p> */}
                                        </div>
                                        <div className="product-price">Sejuta ribu</div>
                                        <div className="product-quantity">
                                            <input defaultValue={2} min={1} type="number" />
                                        </div>
                                        <div className="product-removal">
                                            <button className="remove-product">
                                                Remove
                                            </button>
                                            <button className="update-product">
                                                Update
                                            </button>
                                        </div>
                                        <div className="product-line-price">Rp. 9999</div>
                                    </div>
                                </div>
                                <div className="specify-kurir">
                                    <h2>Kurir</h2>
                                </div>
                                <select className="dropdown-kurir" name="_pickCourier" id="">
                                    <option value="">

                                    </option>
                                </select>
                                <br/>
                                <br/>
                                <br/>
                                <div>
                                    <div className="specify-kurir">
                                        <h2>Catatan</h2>
                                        <div className="purchase-note">
                                            <textarea name="" id="" cols="30" rows="10" className="dropdown-kurir">

                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PurchasePayment;
