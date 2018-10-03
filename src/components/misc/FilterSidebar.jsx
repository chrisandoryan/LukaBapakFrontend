import React from 'react'
import {
    Link
} from 'react-router-dom'
import axios from 'axios'

const APIcategories = 'http://localhost:8000/api/categories';

class FilterSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent_categories: [],
            hover: [],
        }
    }

    componentDidMount() {
        axios.get(APIcategories)
            .then(res => {
                const parent_categories = res.data.data;
                this.setState({ parent_categories });
            });
    }

    render() {
        return (
            <div class="content-box product-options">
                <div>
                <h4>Ubah Kriteria Pencarian</h4>
                <br></br>
                <div>
                    Kategori
                    <div id="accordion">
                    {
                        this.state.parent_categories.map((data, index) => {
                            // alert(data.name);
                            // console.log(data.subcategory)
                            return (
                                <div key={index}>
                                <div class="accordion-toggle">
                                    <p>{ data.name }</p>
                                    <span></span>
                                </div>
                                {/* <section class="accordion-content">
                                    {
                                        data.subcategory.map((subdata, subindex) => {
                                            return (
                                                <div class="accordion-toggle">
                                                    <p>{ subdata.name }</p>
                                                <span></span>
                                            </div>
                                            )
                                        })
                                    }        
                                </section> */}
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                </div>
                <div>
                    Kondisi
                    <br/>
                    <form class="accordion-toggle" onSubmit={this.props.handleConditionUpdate.bind(this)}>
                        <input type="checkbox" name="_newProductCheck"/> Baru
                        <br/>
                        <input type="checkbox" name="_oldProductCheck"/> Bekas
                        <br/>
                        <br/>
                        <input type="submit" value="Terapkan"/>
                    </form>
                </div>
                <div>
                    Dikirim dari
                    <div class="accordion-toggle">
                        <select name="" id="">
                            <option value="">Pilih Provinsi </option>
                        </select>
                        <select name="" id="">
                            <option value="">Pilih Kota </option>
                        </select>
                    </div>
                </div>
                <div>
                    Jasa Pengiriman
                    <div class="accordion-toggle">
                        <select name="" id="">
                            <option value="">Pilih Kurir </option>
                        </select>
                    </div>
                </div>
                <div>
                    Rentang Harga
                    <form class="accordion-toggle" onSubmit={this.props.handlePriceRangeUpdate}>
                        <input type="text" name="_minPrice" placeholder="Min"/>
                        <br/>
                        <input type="text" name="_maxPrice" placeholder="Max"/>
                        <br/>
                        <input type="submit" value="Terapkan"/>
                    </form>
                </div>
                <div>
                    Rating
                    <div class="accordion-toggle">
                        <select name="_filterRating" id="" onChange={this.props.handeSortRating.bind(this)}>
                            <option value="5">5 Bintang</option>
                            <option value="4">4 Bintang</option>
                            <option value="3">3 Bintang</option>
                            <option value="2">2 Bintang</option>
                            <option value="1">1 Bintang</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterSidebar;
