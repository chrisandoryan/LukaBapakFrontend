import React from 'react'
import {
    Link
} from 'react-router-dom'
import GridProduct from './GridProduct';
import ListProduct from './ListProduct';
import ProductService from '../../services/ProductService';
import Header from '../shared/Header';
import FilterSidebar from '../misc/FilterSidebar';
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

class ExploreProductsByPromo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            promo: {},
            sortingMode: 0,
            links: {},
            meta: {},
            page: 1,
            isList: false,
        }
        this.service = new ProductService();
        this.handleSortMode = this.handleSortMode.bind(this);
        this.handlePriceRangeUpdate = this.handlePriceRangeUpdate.bind(this);
        this.handleConditionUpdate = this.handleConditionUpdate.bind(this);
    }

    handleDisplayMode() {
        this.setState({ isList: !this.state.isList });
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
                return el.product_condition == "new";
            });
            // alert(filtered.length);
            this.setState({ products: filtered });
        }
        else if (e.target._oldProductCheck.checked) {
            // alert("old checked");
            const products = this.state.products;
            const filtered = products.filter(function (el) {
                return el.product_condition == "old";
            });
            // alert(filtered.length);
            this.setState({ products: filtered });
        }
        // alert("something changed on filtersidebar component");
    }
    componentDidMount() {
        // alert(this.props.match.params.promoid);
        this.service.getProductsByPromo(this.props.match.params.promoid)
            .then(res => {
                // alert(res.data.links);
                const products = res.data.data[0].products;
                const promo = res.data.data[0];
                // const productHits = res.data.hits.hits;
                console.log('aa', res.data.data[0]);
                this.setState({ products, promo, links: res.data.links, meta: res.data.meta });
                // alert(this.state.links.first);
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    handlePageChange(pageNum) {
        // alert(pageNum);
        // this.service.getProductsByCategory(this.props.match.params.uuid, pageNum)
        //     .then(res => {
        //         // alert(res.data.links);
        //         const products = res.data.data;
        //         const category = res.data.data[0].category;
        //         // const productHits = res.data.hits.hits;
        //         // console.log(productHits);
        //         console.log(products);
        //         this.setState({ products, category, links: res.data.links, meta: res.data.meta });
        //         // alert(this.state.links.first);
        //         this.forceUpdate();
        //     })
        //     .catch(err => {
        //         alert(err);
        //         console.log(err);
        //     });
        // this.forceUpdate();
    }

    handleSortMode(e) {
        // alert(e.target.value);
        switch (e.target.value) {
            case '0':
                //terbaru
                // alert('newest!');
                const newest = [].concat(this.state.products)
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                this.setState({ products: newest });
                this.forceUpdate();
                break;
            case '1':
                //termurah
                // alert('cheapest!');
                const cheapest = [].concat(this.state.products)
                    .sort((a, b) => a.price > b.price);
                this.setState({ products: cheapest });
                this.forceUpdate();
                break;
            case '2':
                //termahal
                const mostExpensive = [].concat(this.state.products)
                    .sort((a, b) => a.price < b.price);
                this.setState({ products: mostExpensive });
                this.forceUpdate();
                break;
            case '3':
                //terlaris
                const bestSeller = [].concat(this.state.products)
                    .sort((a, b) => a.sold_count > b.sold_count);
                this.setState({ products: bestSeller });
                this.forceUpdate();
                break;
        }
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
            this.setState({ products: filtered });
        }
        else if (e.target._maxPrice.value == "" && e.target._minPrice.value != "") {
            //filter min price
            alert("filter min");
            const minPrice = e.target._minPrice.value;
            const products = this.state.products;
            const filtered = products.filter(function (el) {
                return el.price > minPrice;
            });
            this.setState({ products: filtered });
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
            this.setState({ products: filtered });
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
                    <div className="content-box header">Produk Dalam Promo <b>{this.state.promo.name}</b></div>
                    <FilterSidebar
                        handleConditionUpdate={this.handleConditionUpdate}
                        handlePriceRangeUpdate={this.handlePriceRangeUpdate}
                        handeSortRating={this.handeSortRating}
                    />
                    <div className="content-box product-view-wrapper">
                        <button onClick={this.handleDisplayMode.bind(this)}><i class="fas fa-grip-horizontal"></i></button>
                        <button onClick={this.handleDisplayMode.bind(this)}><i class="fas fa-list-ul"></i></button>
                        <div className="filter-sort-dropdown">
                            <span>Urutkan</span>
                            <br />
                            <select name="sort-mode" onChange={this.handleSortMode}>
                                <option value="0">Terbaru</option>
                                <option value="1">Termurah</option>
                                <option value="2">Termahal</option>
                                <option value="3">Terlaris</option>
                            </select>
                        </div>
                        {
                            this.state.products.map((data, index) => {
                                console.log(data);
                                return (
                                    this.state.isList ? (
                                        <ListProduct product={data} />
                                    ) : (
                                            <GridProduct hoverable="true" product={data} />
                                        )
                                )
                            })
                        }
                    </div>
                </div>
                {/* <div class="pagination">
                    <a onClick={() => {this.handlePageChange(1)}} class="page dark">first</a>
                    <a onClick={() => {this.state.links.prev ? this.handlePageChange(this.state.links.prev.substr(this.state.links.prev.length - 1)) : this.handlePageChange(1)}} class="page dark">prev</a>
                    <span class="page active">{this.state.meta.current_page}</span>
                    <a onClick={() => {this.state.links.next ? this.handlePageChange(this.state.links.next.substr(this.state.links.next.length - 1)) : this.handlePageChange(1)}} class="page dark">next</a>
                    <a onClick={() => {this.setState({page: this.state.meta.last_page}); this.handlePageChange(this.state.meta.last_page);}} class="page dark">last</a>
                </div> */}
            </div>
        )
    }
}

export default ExploreProductsByPromo;
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
