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
                console.log(res.data.data);
                this.setState({ favorites: res.data.data });
            })
            .catch(err => {
                alert(err.response.status);
                console.log(err);
            });
    }

    removeFromFavorite(e) {
        e.preventDefault();
        const puuid = e.target._productUuid.value;
        this.service.deleteProductFromFavorite(puuid)
            .then(res => {
                console.log(res);
                this.service.getFavoriteProducts()
                    .then(res => {
                        console.log(res.data.data);
                        this.setState({ favorites: res.data.data });
                    })
                    .catch(err => {
                        alert(err.response.status);
                        console.log(err);
                    });
            })
            .catch(err => {
                alert(err.message);
            });
        this.forceUpdate();
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

                                    <form onSubmit={this.removeFromFavorite.bind(this)}>
                                        <GridProduct hoverable="false" product={data.product}></GridProduct>
                                        <div>
                                            <input type="hidden" name="_productUuid" value={data.product.uuid} />
                                            <button>X</button>
                                        </div>
                                    </form>
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
