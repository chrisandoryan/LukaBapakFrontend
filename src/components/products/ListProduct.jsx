import React from 'react'
import {
    Link
} from 'react-router-dom'

class ListProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            product: {},
        }
        this.setState({image: this.props.product.image != undefined ? this.props.product.image.url : this.props.product.images.url });
    }

    render() {
        return (
            <div>
                <div id="productView" className="product-grid">
                    <div className="product span3">
                        <div className="product-image">
                            <img src={this.state.image} style={{width: 200, height: 200}}/>
                        </div>
                        <br/>
                        <div style={{ float: "left" }}>
                            <h3>
                                {this.props.product.name}
                            </h3>
                            <div>
                                <b>Rp {this.props.product.price}</b>
                            </div>
                        </div>
                        <div style={{ float: "right" }}>
                            <h3 className="product-name">
                                <a href="#">{this.props.product.user.name}</a>
                            </h3>
                            <p className="product-info">
                                {this.props.product.city}
                            </p>
                            <div style={{ display: "inline-block" }}>
                                <button className="" type="button">Beli Sekarang</button>
                                <Link to={`/products/${this.props.product.uuid}`}><button className="" type="button">Lihat Detail</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ListProduct;
