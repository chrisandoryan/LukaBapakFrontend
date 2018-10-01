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
                                            <br/>
                                            <br/>
                                            <div className="purchase-summary">
                                            <h2>Total Belanja</h2>
                                            </div>
                                            <span>Rp. 2932103</span>
                                            <br/>
                                            <br/>
                                            <button>Bayar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <div className="dummy">
                            Detail Belanja
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PurchasePayment;
