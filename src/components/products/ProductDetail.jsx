import React from 'react'
import {
    Link
} from 'react-router-dom'
import ProductService from '../../services/ProductService';

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
                const product = 
                this.setState({ product }); 
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default ProductDetail;
