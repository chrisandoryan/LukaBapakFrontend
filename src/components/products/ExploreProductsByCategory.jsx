import React from 'react'
import {
    Link
} from 'react-router-dom'
import GridProduct from './GridProduct';
import ProductService from '../../services/ProductService';
import Header from '../shared/Header';
import FilterSidebar from '../misc/FilterSidebar';

class ExploreProductsByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            category: {},
            sortingMode: 0,
        }
        this.service = new ProductService();
        this.handleSortMode = this.handleSortMode.bind(this);
    }

    // componentDidUpdate() {
    //     // alert(this.props.match.params.uuid);
    //     this.service.getProductsByCategory(this.props.match.params.uuid)
    //         .then(res => {
    //             console.log(res.data);
    //             const products = res.data.data;
    //             const category = res.data.data.category;
    //             // const productHits = res.data.hits.hits;
    //             // console.log(productHits);
    //             this.setState({ products, category });
    //         })
    //         .catch(err => {
    //             alert(err);
    //             console.log(err);
    //         });
    // }

    componentDidMount() {
        // alert(this.props.match.params.uuid);
        this.service.getProductsByCategory(this.props.match.params.uuid)
            .then(res => {
                console.log(res.data);
                const products = res.data.data;
                const category = res.data.data[0].category;
                // const productHits = res.data.hits.hits;
                // console.log(productHits);
                this.setState({ products, category });
            })
            .catch(err => {
                alert(err);
                console.log(err);
            });
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

    render() {
        return (
            <div>
                <Header {...this.props} />
                <div className="content wrapper">
                    <div className="content-box header">Produk Dalam Kategori <b>{this.state.category.name}</b></div>
                    <FilterSidebar />
                    <div className="content-box product-view-wrapper">
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
                                return (
                                    <GridProduct hoverable="true" product={data} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ExploreProductsByCategory;
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
