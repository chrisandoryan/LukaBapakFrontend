import React from 'react'
import {
    Link
} from 'react-router-dom'

class GridProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="product-grid__product-wrapper">
                <Link to={`/products/${this.props.product.uuid}`}>
                    <div className="product-grid__product">
                        <div className="product-grid__img-wrapper">
                            <img src="https://images.apple.com/euro/macbook/a/screens/specs/images/finish_silver_large.jpg" alt="Img" className="product-grid__img" />
                        </div>
                        <span className="product-grid__title">{this.props.product.name}</span>
                        <span className="product-grid__price">Rp. {this.props.product.price}</span>
                    </div>
                    {
                        this.props.hoverable ? (
                            <div class="product-grid__extend-wrapper">
                                <div class="product-grid__extend">
                                    <p class="product-grid__description">Komputer Shop SLC, Kerawang</p>
                                    <span class="product-grid__btn product-grid__add-to-cart"><i class="fa fa-cart-arrow-down"></i>
                                        Beli</span>
                                    <span class="product-grid__btn product-grid__view"><i class="fa fa-eye"></i> View more</span>
                                </div>
                            </div>
                        ) : (
                                null
                        )
                    }
                </Link>
            </div>
        )
    }
}

export default GridProduct;
