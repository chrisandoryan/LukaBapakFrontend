import React, { Component, Fragment } from 'react'
import {
    Link
} from 'react-router-dom'
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import DisplayPromotedProducts from '../products/DisplayPromotedProducts';
// import '../../css/lapak.css';
// import '../../css/helep.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div>
                <div className="app">
                    <Header {...this.props}/>
                    <div>
                        <div className="home-banner featured-main">
                            <div className="container-grid">
                                <div className="row-grid">
                                    <div className="banner__card col-12--6 banner__card-1">
                                        <a target="_blank" title="Diskon 20% dengan Bayar Pakai Buka DANA!" className="banner__link" href="https://www.bukalapak.com/promo-detail/cashback-pakai-dana?from=flash-banner-1&g=2&utm_medium=flash_banner&utm_promo=flash_banner_1&utm_source=homepage">
                                            <picture>
                                                <source srcSet="https://s2.bukalapak.com/uploads/flash_banner/75713/s-1256-824/Banner_1_renew.jpg.webp" type="image/webp" />
                                                <source srcSet="https://s2.bukalapak.com/uploads/flash_banner/75713/s-1256-824/Banner_1_renew.jpg" type="image/jpg" /><img alt="Diskon 20% dengan Bayar Pakai Buka DANA!" className="banner__img" src="https://s2.bukalapak.com/uploads/flash_banner/75713/s-1256-824/Banner_1_renew.jpg" /></picture>
                                        </a>
                                    </div>
                                    <div className="col-12--4 no-gutter">
                                        <div className="row-grid">
                                            <div className="banner__card col-12--4 banner__card-2 margin-below">
                                                <a target="_blank" title="Ayo Aktivasi Buka DANA dan Menangkan Voucher Rp30.000" className="banner__link" href="https://www.bukalapak.com/promo-detail/ayo-aktivasi-buka-dana-dan-menangkan-voucher-rp30-000?from=flash-banner-2&g=2&utm_medium=flash_banner&utm_promo=flash_banner_2&utm_source=homepage">
                                                    <picture>
                                                        <source srcSet="https://s3.bukalapak.com/uploads/flash_banner/32513/s-824-392/Banner_2-DANA-v.2.jpg.webp" type="image/webp" />
                                                        <source srcSet="https://s3.bukalapak.com/uploads/flash_banner/32513/s-824-392/Banner_2-DANA-v.2.jpg" type="image/jpg" /><img alt="Ayo Aktivasi Buka DANA dan Menangkan Voucher Rp30.000" className="banner__img" src="https://s3.bukalapak.com/uploads/flash_banner/32513/s-824-392/Banner_2-DANA-v.2.jpg" /></picture>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="row-grid">
                                            <div className="banner__card col-12--2 banner__card-4">
                                                <a target="_blank" title="Bayar Pakai Dana, Beli Pulsa Dapat Potongan" className="banner__link" href="https://www.bukalapak.com/promo-detail/bayar-pakai-dana-beli-pulsa-dapat-potongan?from=flash-banner-4&g=2&utm_medium=flash_banner&utm_promo=flash_banner_4&utm_source=homepage">
                                                    <picture>
                                                        <source srcSet="https://s2.bukalapak.com/uploads/flash_banner/71513/s-392-392/Banner_4-Pulsa99.jpg.webp" type="image/webp" />
                                                        <source srcSet="https://s2.bukalapak.com/uploads/flash_banner/71513/s-392-392/Banner_4-Pulsa99.jpg" type="image/jpg" /><img alt="Bayar Pakai Dana, Beli Pulsa Dapat Potongan" className="banner__img" src="https://s2.bukalapak.com/uploads/flash_banner/71513/s-392-392/Banner_4-Pulsa99.jpg" /></picture>
                                                </a>
                                            </div>
                                            <div className="banner__card col-12--2 banner__card-5">
                                                <a target="_blank" title="Pulsa dan Listrik Termurah Se-Indonesia!" className="banner__link" href="https://m.bukalapak.com/exclusive/pulsa-dan-listrik-termurah?from=flash-banner-5&g=2&utm_medium=flash_banner&utm_promo=flash_banner_5&utm_source=homepage">
                                                    <picture>
                                                        <source srcSet="https://s4.bukalapak.com/uploads/flash_banner/90713/s-392-392/Banner_4_rev-pulsalis.jpg.webp" type="image/webp" />
                                                        <source srcSet="https://s4.bukalapak.com/uploads/flash_banner/90713/s-392-392/Banner_4_rev-pulsalis.jpg" type="image/jpg" /><img alt="Pulsa dan Listrik Termurah Se-Indonesia!" className="banner__img" src="https://s4.bukalapak.com/uploads/flash_banner/90713/s-392-392/Banner_4_rev-pulsalis.jpg" /></picture>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="banner__card col-12--2 banner__card-3">
                                        <a target="_blank" title="Segera Pakai Buka DANA-mu untuk Ikut Flash Deal!" className="banner__link" href="https://www.bukalapak.com/promo-detail/flash-dana?from=flash-banner-3&g=2&utm_medium=flash_banner&utm_promo=flash_banner_3&utm_source=homepage">
                                            <picture>
                                                <source srcSet="https://s4.bukalapak.com/uploads/flash_banner/96713/s-392-824/Banner_31.jpg.webp" type="image/webp" />
                                                <source srcSet="https://s4.bukalapak.com/uploads/flash_banner/96713/s-392-824/Banner_31.jpg" type="image/jpg" /><img alt="Segera Pakai Buka DANA-mu untuk Ikut Flash Deal!" className="banner__img" src="https://s4.bukalapak.com/uploads/flash_banner/96713/s-392-824/Banner_31.jpg" /></picture>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DisplayPromotedProducts />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Dashboard;
