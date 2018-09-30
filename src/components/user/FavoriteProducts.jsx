import React from 'react'
import {
    Link
} from 'react-router-dom'
import FavoriteProductService from '../../services/FavoriteProductService';
import GridProduct from '../products/GridProduct';
import Header from '../shared/Header';

class FavoriteProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
        }
        this.service = new FavoriteProductService();
    }

    componentDidMount() {
        this.service.getFavoriteProducts()
            .then(res => {
                console.log(res.data);
                this.setState({ favorites: res.data.data });
            })
            .catch(err => {
                alert(err.response.status);
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <div className="content wrapper">
                    <div className="content-box header">
                        <h2>Presumably Your Favorite Product(s)</h2>
                    </div>
                    <div className="content-box product-view-wrapper">
                        {
                            this.state.favorites.map((data, index) => {
                                return (
                                    <div>
                                        <button>Remove from Favorite</button>
                                        <GridProduct hoverable="true" product={data.product} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FavoriteProducts;
