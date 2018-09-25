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
                <Link to={`products/${this.props.product.uuid}`}>
                <div className="product-grid__product">
                    <div className="product-grid__img-wrapper">
                        <img src="https://images.apple.com/euro/macbook/a/screens/specs/images/finish_silver_large.jpg" alt="Img" className="product-grid__img" />
                    </div>
                    <span className="product-grid__title">{this.props.product.name}</span>
                    <span className="product-grid__price">Rp. {this.props.product.price}</span>
                </div>
                </Link>
            </div>
        )
    }
}

export default GridProduct;
