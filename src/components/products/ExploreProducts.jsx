import React from 'react'
import {
    Link
} from 'react-router-dom'
import GridProduct from './GridProduct';
import ProductService from '../../services/ProductService';
import Header from '../shared/Header';

class ExploreProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
        this.service = new ProductService();
    }

    componentDidUpdate() {
        // alert(this.props.match.params.keyword);
        this.service.searchProducts(this.props.match.params.keyword)
            .then(res => {
                const productHits = res.data.hits.hits;
                // console.log(productHits);
                this.setState({ products: productHits });
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    componentDidMount() {
        // alert(this.props.match.params.keyword);
        this.service.searchProducts(this.props.match.params.keyword)
            .then(res => {
                const productHits = res.data.hits.hits;
                // console.log(productHits);
                this.setState({ products: productHits });
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <div className="content wrapper">
                    <div className="content-box header">Hasil Pencarian "<b>{this.props.match.params.keyword}</b>"</div>
                    <div className="content-box product-options">
                        <h6>Ubah Kriteria Pencarian</h6>
                        <div>
                            {/* TODO: sidebar panel kriteria pencarian */}
                        </div>
                    </div>
                    <div className="content-box product-view-wrapper">
                        <div className="filter-sort-dropdown">
                            <span>Urutkan</span>
                            <select>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                        {
                            this.state.products.map((data, index) => {
                                return (
                                    <GridProduct hoverable="true" product={data._source} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ExploreProducts; <div className="content wrapper">
    <div className="content-box header">Hasil Pencarian "<b>Jam Tangan Fosil Dinosaurus</b>"</div>
    <div className="content-box product-options">
        <h6>Ubah Kriteria Pencarian</h6>
        <div>
            {/* TODO: sidebar panel kriteria pencarian */}
        </div>
    </div>
    <div className="content-box product-view-wrapper">
        <div className="filter-sort-dropdown">
            <span>Urutkan</span>
            <select>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
        </div>
    </div></div>
