import React from 'react'
import {
    Link
} from 'react-router-dom'
import ProductService from '../../services/ProductService';
import Header from '../shared/Header';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
        // console.log(this.props.match.params.uuid);
        this.service = new ProductService();
        this.service.getProduct(this.props.match.params.uuid)
            .then(res => {
                    const product = res.data.data;
                    this.setState({ product });
                    console.log(this.state.product);
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div className="app">
                <Header />
                <div className="content">
                    <div className="dummy dummy--header">Breadcrumbs Go Here</div>
                    <div className="dummy">
                        <h2>{this.state.product.name}</h2>
                    </div>
                    <div className="product-page">
                        <article className="product">
                            {/* Sticky section containing image gallery */}
                            <div className="product-media i-sticky">
                                <div className="dummy dummy--gallery">
                                    QR Code or Product Image Here or Product Detail
                                </div>
                            </div>
                            <div className="product-detail">
                                <div className="dummy">Pelapak Information Goes Here</div>
                                <div className="dummy">Pengiriman Information Goes Here</div>
                                <div className="dummy">Favorite Button Goes Here</div>
                                <div className="dummy">Maybe QR Code or Share Button? Or Viewer and Favorite Count</div>
                                {/* <div class="dummy">Customer Questions</div>
                                <div class="dummy">You May Need</div>
                                <div class="dummy">Delivery and Returns</div>
                                <div class="dummy">Finance</div> */}
                            </div>
                        </article>
                        <div className="dummy">Shipping Cost Estimation</div>
                        <div className="product__bought-together dummy">Top Review</div>
                        <div className="dummy">Discussions</div>
                        {/* <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">--------- FOOTER --------</div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;
