import React from 'react'
import {
    Link
} from 'react-router-dom'
import GridProduct from './GridProduct';
import ProductService from '../../services/ProductService';
import Header from '../shared/Header';
import FilterSidebar from '../misc/FilterSidebar';

class ExploreProductsByKeyword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
        this.service = new ProductService();
    }

    handleConditionUpdate(e) {
        e.preventDefault();
        if (e.target._newProductCheck.checked && e.target._oldProductCheck.checked) {
            // alert("checked both"); //do nothing here perhaps
        }
        else if (e.target._newProductCheck.checked) {
            // alert("new checked");
            const products = this.state.products;
            const filtered = products.filter(function (el) {
                return el.product_condition === "new";
            });
        }
        else if (e.target._oldProductCheck.checked) {
            // alert("old checked");
            const products = this.state.products;
            const filtered = products.filter(function (el) {
                return el.product_condition === "old";
            });
        }
        // alert("something changed on filtersidebar component");
    }

    componentDidUpdate() {
        // alert(this.props.match.params.keyword);
        this.service.searchProducts(this.props.match.params.keyword)
            .then(res => {
                const products = res.data.data;
                // console.log(productHits);
                this.setState({ products });
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
                const products = res.data.data;
                // console.log(productHits);
                this.setState({ products });
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    handlePriceRangeUpdate(e) {
        e.preventDefault();
        alert("price range changed");
        // alert(e.target._minPrice.value == "");
        if (e.target._minPrice.value == "" && e.target._maxPrice.value != "") {
            //filter max price
            alert("filter max");
            const maxPrice = e.target._maxPrice.value;
            const products = this.state.products;
            const filtered = products.filter(function (el) {
                return el.price < maxPrice;
            });
        }
        else if (e.target._maxPrice.value == "" && e.target._minPrice.value != "") {
            //filter min price
            alert("filter min");
            const minPrice = e.target._minPrice.value;
            const products = this.state.products;
            const filtered = products.filter(function (el) {
                return el.price > minPrice;
            });
        }
        else {
            //filter full rage
            alert("filter both");
            const maxPrice = e.target._maxPrice.value;
            const minPrice = e.target._minPrice.value;
            const products = this.state.products;
            const filtered = products.filter(function (el) {
                return el.price < maxPrice && el.price > minPrice;
            });
        }
    }

    handeSortRating(e) {
        e.preventDefault();
        alert(e.target.value);
        alert("rating range changed");
        switch (e.target.value) {
            case '5':

                break;
            case '4':

                break;
            case '3':

                break;
            case '2':

                break;
            case '1':

                break;
        }
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <div className="content wrapper">
                    <div className="content-box header">Hasil Pencarian "<b>{this.props.match.params.keyword}</b>"</div>
                    <FilterSidebar
                        handleConditionUpdate={this.handleConditionUpdate}
                        handlePriceRangeUpdate={this.handlePriceRangeUpdate}
                        handeSortRating={this.handeSortRating}
                    />
                    <div className="content-box product-view-wrapper">
                        <div className="filter-sort-dropdown">
                            <span>Urutkan</span>
                            <br />
                            <select>
                                <option value="">Terbaru</option>
                                <option value="">Termurah</option>
                                <option value="">Termahal</option>
                                <option value="">Terlaris</option>
                            </select>
                        </div>
                        {
                            this.state.products.map((data, index) => {
                                return (
                                    <GridProduct hoverable="true" product={data} />
                                )
                            })
                        }
                    </div>
                </div>
                {/* <div class="pagination">
                    <a onClick={() => { this.handlePageChange(1) }} class="page dark">first</a>
                    <a onClick={() => { this.state.links.prev ? this.handlePageChange(this.state.links.prev.substr(this.state.links.prev.length - 1)) : this.handlePageChange(1) }} class="page dark">prev</a>
                    <span class="page active">{this.state.meta.current_page}</span>
                    <a onClick={() => { this.state.links.next ? this.handlePageChange(this.state.links.next.substr(this.state.links.next.length - 1)) : this.handlePageChange(1) }} class="page dark">next</a>
                    <a onClick={() => { this.setState({ page: this.state.meta.last_page }); this.handlePageChange(this.state.meta.last_page); }} class="page dark">last</a>
                </div> */}
            </div>
        )
    }
}

export default ExploreProductsByKeyword;
// <div className="content wrapper">
//     <div className="content-box header">Hasil Pencarian "<b>Jam Tangan Fosil Dinosaurus</b>"</div>
//     <div className="content-box product-options">
//         <h6>Ubah Kriteria Pencarian</h6>
//         <div>
//             {/* TODO: sidebar panel kriteria pencarian */}
//         </div>
//     </div>
//     <div className="content-box product-view-wrapper">
//         <div className="filter-sort-dropdown">
//             <span>Urutkan</span>
//             <select>
//                 <option value="volvo">Volvo</option>
//                 <option value="saab">Saab</option>
//                 <option value="mercedes">Mercedes</option>
//                 <option value="audi">Audi</option>
//             </select>
//         </div>
//     </div></div>
