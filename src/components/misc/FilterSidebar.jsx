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
                    <div class="accordion-toggle">
                        <input type="checkbox"/> Baru
                        <br/>
                        <input type="checkbox"/> Bekas
                    </div>
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
                    <div class="accordion-toggle">
                        <input type="text" placeholder="Min"/>
                        <br/>
                        <input type="text" placeholder="Max"/>
                        <button>Terapkan</button>
                    </div>
                </div>
                <div>
                    Rating
                    <div class="accordion-toggle">
                        <select name="" id="">
                            <option value="">5 Bintang</option>
                            <option value="">4 Bintang</option>
                            <option value="">3 Bintang</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterSidebar;
