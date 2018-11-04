import React, { Component, Fragment } from 'react'
import {
    Link
} from 'react-router-dom'
import Modal from 'react-modal';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import DisplayPromotedProducts from '../products/DisplayPromotedProducts';
import PopularTagService from '../../services/PopularTagService';
import CartService from '../../services/CartService';
// import '../../css/lapak.css';
// import '../../css/helep.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            populars: [],
            cartContent: [],
            modalIsOpen: false
        }
        this.popularService = new PopularTagService();
        this.cart = new CartService();
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.popularService.getPopularTags()
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                alert(err.message);
            })
        this.cart.getCart()
            .then(res => {
                const cartContent = res.data.data;
                this.setState({ cartContent });
                if (cartContent.length > 0) this.setState({modalIsOpen: true})
            })
            .catch(err => {
                // alert(err.message);
            });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                <div className="app">
                    <Header {...this.props} />
                    <div>
                        <div className="home-banner featured-main">
                            <div className="container-grid">
                                <div className="row-grid">
                                    <div className="banner__card col-12--6 banner__card-1">
                                        <a target="_blank" title="Diskon 20% dengan Bayar Pakai Buka DANA!" className="banner__link">
                                            <picture>
                                                <source srcSet="https://s2.bukalapak.com/uploads/flash_banner/75713/s-1256-824/Banner_1_renew.jpg.webp" type="image/webp" />
                                                <source srcSet="https://s2.bukalapak.com/uploads/flash_banner/75713/s-1256-824/Banner_1_renew.jpg" type="image/jpg" /><img alt="Diskon 20% dengan Bayar Pakai Buka DANA!" className="banner__img" src="https://s2.bukalapak.com/uploads/flash_banner/75713/s-1256-824/Banner_1_renew.jpg" /></picture>
                                        </a>
                                    </div>
                                    <div className="col-12--4 no-gutter">
                                        <div className="row-grid">
                                            <div className="banner__card col-12--4 banner__card-2 margin-below">
                                                <a target="_blank" title="Ayo Aktivasi Buka DANA dan Menangkan Voucher Rp30.000" className="banner__link">
                                                    <picture>
                                                        <source srcSet="https://s3.bukalapak.com/uploads/flash_banner/32513/s-824-392/Banner_2-DANA-v.2.jpg.webp" type="image/webp" />
                                                        <source srcSet="https://s3.bukalapak.com/uploads/flash_banner/32513/s-824-392/Banner_2-DANA-v.2.jpg" type="image/jpg" /><img alt="Ayo Aktivasi Buka DANA dan Menangkan Voucher Rp30.000" className="banner__img" src="https://s3.bukalapak.com/uploads/flash_banner/32513/s-824-392/Banner_2-DANA-v.2.jpg" /></picture>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="row-grid">
                                            <div className="banner__card col-12--2 banner__card-4">
                                                <a target="_blank" title="Bayar Pakai Dana, Beli Pulsa Dapat Potongan" className="banner__link">
                                                    <picture>
                                                        <source srcSet="https://s2.bukalapak.com/uploads/flash_banner/71513/s-392-392/Banner_4-Pulsa99.jpg.webp" type="image/webp" />
                                                        <source srcSet="https://s2.bukalapak.com/uploads/flash_banner/71513/s-392-392/Banner_4-Pulsa99.jpg" type="image/jpg" /><img alt="Bayar Pakai Dana, Beli Pulsa Dapat Potongan" className="banner__img" src="https://s2.bukalapak.com/uploads/flash_banner/71513/s-392-392/Banner_4-Pulsa99.jpg" /></picture>
                                                </a>
                                            </div>
                                            <div className="banner__card col-12--2 banner__card-5">
                                                <a target="_blank" title="Pulsa dan Listrik Termurah Se-Indonesia!" className="banner__link" >
                                                    <picture>
                                                        <source srcSet="https://s4.bukalapak.com/uploads/flash_banner/90713/s-392-392/Banner_4_rev-pulsalis.jpg.webp" type="image/webp" />
                                                        <source srcSet="https://s4.bukalapak.com/uploads/flash_banner/90713/s-392-392/Banner_4_rev-pulsalis.jpg" type="image/jpg" /><img alt="Pulsa dan Listrik Termurah Se-Indonesia!" className="banner__img" src="https://s4.bukalapak.com/uploads/flash_banner/90713/s-392-392/Banner_4_rev-pulsalis.jpg" /></picture>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="banner__card col-12--2 banner__card-3">
                                        <a target="_blank" title="Segera Pakai Buka DANA-mu untuk Ikut Flash Deal!" className="banner__link">
                                            <picture>
                                                <source srcSet="https://s4.bukalapak.com/uploads/flash_banner/96713/s-392-824/Banner_31.jpg.webp" type="image/webp" />
                                                <source srcSet="https://s4.bukalapak.com/uploads/flash_banner/96713/s-392-824/Banner_31.jpg" type="image/jpg" /><img alt="Segera Pakai Buka DANA-mu untuk Ikut Flash Deal!" className="banner__img" src="https://s4.bukalapak.com/uploads/flash_banner/96713/s-392-824/Banner_31.jpg" /></picture>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <button onClick={this.openModal}>Open Modal</button> */}
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Whoops!"
                        >
                            <h2 ref={subtitle => this.subtitle = subtitle}>Whoops! Jangan lupa teruskan belanja anda!</h2>
                            {
                                this.state.cartContent.map((data, index) => {
                                    return (
                                        <div className="product">
                                            <div className="product-image">
                                                <img src="https://via.placeholder.com/300x300" />
                                            </div>
                                            <div className="product-details">
                                                <div className="product-title" style={{margin: 15}}>{data.product.name}</div>
                                                {/* <p className="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p> */}
                                            </div>
                                            <div className="product-price" style={{margin: 5}}>{data.product.price}</div>
                                        </div>
                                    )
                                })
                            }
                            <button onClick={this.closeModal}>close</button>
                        </Modal>
                        <DisplayPromotedProducts />
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Dashboard;
