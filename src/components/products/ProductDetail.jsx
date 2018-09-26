import React from 'react'
import {
    Link
} from 'react-router-dom'
import ProductService from '../../services/ProductService';
import OngkirService from '../../services/OngkirService';
import Header from '../shared/Header';
import QRCode from 'qrcode.react';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            user: {},
            provinces: [],
            cities: [],
            selectedProvince: '',
            selectedCity: '',
        }
        // console.log(this.props.match.params.uuid);
        this.service = new ProductService();
        this.ongkir = new OngkirService();
        this.service.getProduct(this.props.match.params.uuid)
            .then(res => {
                const product = res.data.data;
                const user = product.user;
                this.setState({ product, user });
                // console.log(this.state.product.category.name);
            })
            .catch(err => {
                console.log(err.response);
            });
        this.ongkir.getProvinces()
            .then(res => {
                const provinces = res.data.rajaongkir.results;
                // console.log(provinces);
                this.setState({ provinces });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleProvinceChange = (event) => {
        const province_id = event.target.value;
        this.setState({ selectedProvince: province_id });
        this.ongkir.getCities(province_id)
            .then(res => {
                const cities = res.data.rajaongkir.results;
                console.log(cities);
                this.setState({ cities });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        const total_feedback = this.state.user.positive_feedback + this.state.user.negative_feedback;
        var reputation = this.state.user.positive_feedback / total_feedback * 100;
        reputation = reputation.toFixed(2);
        // console.log(reputation);
        return (
            <div className="app">
                <Header />
                <div className="content">
                    <div className="dummy dummy--header">Breadcrumbs Go Here</div>
                    <div className="dummy">
                        <h1>{this.state.product.name}</h1>
                        <br />
                        <h1>{`Rp.${this.state.product.price}`}</h1>
                        <div className="product-description">
                            <h2>Terjual: {this.state.product.sold_count}</h2>
                            <h2>Kondisi: {this.state.product.product_condition}</h2>
                            <h2>Dilihat: {this.state.product.view_count}</h2>
                            <h2>Stok: {this.state.product.stock}</h2>
                            <h2>Difavoritkan: {this.state.product.view_count}</h2>
                            <h2>Diperbarui: {this.state.product.view_count}</h2>
                        </div>
                        <br />
                        <div className="product-description">
                            <h1>Deskripsi Produk</h1>
                            <br></br>
                            <h3>{
                                this.state.product.description != '' ?
                                    (
                                        <p>{this.state.product.description}</p>
                                    ) :
                                    (
                                        <p>Tidak ada deskripsi untuk produk ini</p>
                                    )
                            }
                            </h3>
                        </div>
                        <br></br>
                        <div className="product-description">
                            <h1>Spesifikasi</h1>
                            <br></br>
                            <h2>Kategori: {this.state.product.category}</h2>
                            <h2>Berat: {this.state.product.weight} gram</h2>

                        </div>
                    </div>
                    <div className="product-page">
                        <article className="product">
                            {/* Sticky section containing image gallery */}
                            <div className="product-media i-sticky">
                                <div className="dummy dummy--gallery">
                                    QR Code or Product Image Here or Product Detail
                                    {
                                        this.state.product.stock > 0 ? (
                                            <div>
                                                <br></br>
                                                <br></br>
                                                <QRCode value={`http://localhost:8000/${this.props.location.pathname}`} />
                                            </div>
                                        ) :
                                            (
                                                null
                                            )
                                    }

                                </div>
                            </div>
                            <div className="product-detail">
                                <div className="dummy">
                                    Pelapak Information Goes Here
                                    <h2>{this.state.user.username}</h2>
                                    <img src={this.state.user.avatar_url} alt="Pelapak IMG" />
                                    <h3>{reputation}%({this.state.user.positive_feedback} Feedback)</h3>
                                    <i className="fas fa-map-marker-alt">{this.state.user.origin}</i>
                                </div>

                                <div className="dummy">
                                    Pengiriman Information Goes Here
                                    <div className="product-description">
                                        <h3>Pelanggan: </h3>
                                        <h3>Login terakhir: </h3>
                                        <h3>Bergabung: </h3>
                                    </div>
                                </div>
                                <div className="dummy">Favorite Button Goes Here</div>
                                {/* <div className="dummy">Maybe QR Code or Share Button? Or Viewer and Favorite Count</div> */}
                                {/* <div class="dummy">Customer Questions</div>
                                <div class="dummy">You May Need</div>
                                <div class="dummy">Delivery and Returns</div>
                                <div class="dummy">Finance</div> */}
                            </div>
                        </article>
                        <div className="dummy">
                            Shipping Cost Estimation
                            <div className="product-description">
                                <div>
                                    <h2>Masukkan Jumlah: </h2><input type="number" name="quantity" min="0" max="100" step="10" value="30" />
                                </div>
                                <div>
                                    <h2>Masukkan Tujuan: </h2>
                                </div>
                                <div>
                                    <select name="select-province" onChange={this.handleProvinceChange} value={this.selectedProvince}>
                                        <option selected> Pilih Provinsi </option>
                                        {
                                            this.state.provinces.map((data, index) => {
                                                return (
                                                    <option key={index} value={data.province_id}>
                                                        {data.province}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <select name="" style={{ width: '200px' }}>
                                        <option selected> Pilih Kota </option>
                                        {
                                            this.state.cities.map((data, index) => {
                                                return (
                                                    <option key={index} value={data.city_id}>
                                                        {data.city_name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <h2>Estimasi Ongkos</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Servis</th>
                                            <th>Waktu Antar</th>
                                            <th>Ongkos Kirim</th>
                                            <th>Harga + Ongkos Kirim</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="product__bought-together dummy">Top Review</div>
                        <div className="dummy">Discussions</div>
                        {/* <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">More</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">Mo stuffz</div>
                        <div class="dummy">--------- FOOTER --------</div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;
