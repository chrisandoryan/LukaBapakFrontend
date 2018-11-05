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
import Modal from 'react-modal';
// require("bootstrap/less/bootstrap.less");


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


class ExploreProductsByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            category: {},
            sortingMode: 0,
            links: {},
            meta: {},
            page: 1,
            isList: false,
            modalIsOpen: [false],
        }
        this.service = new ProductService();
        this.handleSortMode = this.handleSortMode.bind(this);
        this.handlePriceRangeUpdate = this.handlePriceRangeUpdate.bind(this);
        this.handleConditionUpdate = this.handleConditionUpdate.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateProductList = this.updateProductList.bind(this);
    }

    openModal(idx) {
        // alert(idx)
        this.state.modalIsOpen[idx] = true;
        this.forceUpdate()
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal(idx) {
        this.state.modalIsOpen[idx] = false;
        this.forceUpdate()
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
        // alert(this.props.match.params.uuid);
        this.service.getProductsByCategory(this.props.match.params.uuid, this.state.page)
            .then(res => {
                // alert(res.data.links);
                const products = res.data.data;
                const category = res.data.data[0].category;
                // const productHits = res.data.hits.hits;
                console.log(products);
                let modalOpened = []
                for (let i = 0; i < products.length; i++) {
                    modalOpened[i] = false;
                }
                this.setState({ modalIsOpen: modalOpened })
                this.setState({ products, category, links: res.data.links, meta: res.data.meta });
                // alert(this.state.links.first);
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
    }

    handlePageChange(pageNum) {
        // alert(pageNum);
        this.service.getProductsByCategory(this.props.match.params.uuid, pageNum)
            .then(res => {
                // alert(res.data.links);
                const products = res.data.data;
                const category = res.data.data[0].category;
                // const productHits = res.data.hits.hits;
                // console.log(productHits);
                console.log(products);
                this.setState({ products, category, links: res.data.links, meta: res.data.meta });
                // alert(this.state.links.first);
                this.forceUpdate();
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
        this.forceUpdate();
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

    displayNextModal(currIdx) {
        this.state.modalIsOpen[currIdx + 1] = true;
        this.state.modalIsOpen[currIdx] = false;
        this.forceUpdate()
    }

    displayPrevModal(currIdx) {
        this.state.modalIsOpen[currIdx - 1] = true;
        this.state.modalIsOpen[currIdx] = false;
        this.forceUpdate()
    }

    updateProductList() {
        // alert(1);
        // componentDidMount();
        this.service.getProductsByCategory(this.props.match.params.uuid, this.state.page)
            .then(res => {
                // alert(res.data.links);
                const products = res.data.data;
                const category = res.data.data[0].category;
                // const productHits = res.data.hits.hits;
                console.log(products);
                let modalOpened = []
                for (let i = 0; i < products.length; i++) {
                    modalOpened[i] = false;
                }
                this.setState({ modalIsOpen: modalOpened })
                this.setState({ products, category, links: res.data.links, meta: res.data.meta });
                // alert(this.state.links.first);
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
                    <div className="content-box header">Produk Dalam Kategori <b>{this.state.category.name}</b></div>
                    <FilterSidebar
                        handleConditionUpdate={this.handleConditionUpdate}
                        handlePriceRangeUpdate={this.handlePriceRangeUpdate}
                        handeSortRating={this.handeSortRating}
                        updateProducts={this.updateProductList}
                        {...this.props}
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
                                            <React.Fragment>
                                                <GridProduct hoverable="true" product={data} openModal={this.openModal} idx={index} />
                                                <Modal
                                                    isOpen={this.state.modalIsOpen[index]}
                                                    onAfterOpen={this.afterOpenModal}
                                                    onRequestClose={this.closeModal}
                                                    style={customStyles}
                                                    contentLabel="Quick View"
                                                >
                                                    <h1 ref={subtitle => this.subtitle = subtitle}></h1>
                                                    <div className="dummy">
                                                        <div className="perimeter">
                                                            <img src="https://via.placeholder.com/200x200" alt="" />
                                                            <input type="hidden" value={index} name="index" />
                                                            <div className="copy"></div>
                                                            <div className="product-desc">
                                                                <br />
                                                                <h1>{data.name}</h1>
                                                                <br />
                                                                <hr />
                                                                <br />
                                                                <div><h2>Rp. {data.price}</h2></div>
                                                                <div><h2>dijual oleh {data.user.name}</h2></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => this.closeModal(index)}>Close</button>
                                                    <button onClick={() => this.displayNextModal(index)} style={{ float: "right" }}>Next Product</button>
                                                    <button onClick={() => this.displayPrevModal(index)} style={{ float: "right" }}>Prev Product</button>
                                                </Modal>
                                            </React.Fragment>
                                        )
                                )
                            })
                        }
                    </div>
                </div>
                <div class="pagination">
                    <a onClick={() => { this.handlePageChange(1) }} class="page dark">first</a>
                    <a onClick={() => { this.state.links.prev ? this.handlePageChange(this.state.links.prev.substr(this.state.links.prev.length - 1)) : this.handlePageChange(1) }} class="page dark">prev</a>
                    <span class="page active">{this.state.meta.current_page}</span>
                    <a onClick={() => { this.state.links.next ? this.handlePageChange(this.state.links.next.substr(this.state.links.next.length - 1)) : this.handlePageChange(1) }} class="page dark">next</a>
                    <a onClick={() => { this.setState({ page: this.state.meta.last_page }); this.handlePageChange(this.state.meta.last_page); }} class="page dark">last</a>
                </div>
            </div>
        )
    }
}

export default ExploreProductsByCategory;