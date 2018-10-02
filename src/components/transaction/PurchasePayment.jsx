import React from 'react'
import {
    Link
} from 'react-router-dom'
import Header from '../shared/Header';

class PurchasePayment extends React.Component {
    constructor(props) {
        super(props);
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
                                        <h2>Heri Vandoro</h2>
                                        <div className="customer-address">
                                            Jalan Kebon Jeruk Raya No.27 1 9, Kb. Jeruk, Daerah Khusus Ibukota Jakarta 11530
                                            Jalan Kebon Jeruk Raya No.27 1 9, Kb. Jeruk, Daerah Khusus Ibukota Jakarta 11530
                                            Jalan Kebon Jeruk Raya No.27 1 9, Kb. Jeruk, Daerah Khusus Ibukota Jakarta 11530
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
                            <div className="product-purchased">
                                <h3>Penjual Bahagia</h3>
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
                                {/* <div>
                                <div className="specify-kurir">
                                    <h2>Catatan</h2>
                                </div>
                                <textarea name="" id="" cols="30" rows="10" className="dropdown-kurir">
                                
                                </textarea>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PurchasePayment;
