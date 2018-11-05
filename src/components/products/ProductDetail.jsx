import React from 'react'
import {
    Link
} from 'react-router-dom'
import ProductService from '../../services/ProductService';
import OngkirService from '../../services/OngkirService';
import Header from '../shared/Header';
import QRCode from 'qrcode.react';
import ReactImageMagnify from 'react-image-magnify';
import FavoriteProductService from '../../services/FavoriteProductService';
import CartService from '../../services/CartService';
import AuthService from '../../services/AuthService';
import '../../css/comment.css';
import ReviewService from '../../services/ReviewService';
import DiscussionService from '../../services/DiscussionService';
// import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Breadcrumb from '../misc/Breadcrumb';
import CategoryService from '../../services/CategoryService';
import Modal from 'react-modal';
import GridProduct from './GridProduct';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            product: {},
            user: {},
            category: {},
            provinces: [],
            cities: [],
            selectedProvince: '',
            selectedCity: '',
            availableCourier: [],
            purchaseQuantity: 1,
            toCartAmount: 1,
            isLoggedIn: false,
            reviews: [],
            discussions: [],
            reload: false,
            image: {},
            headImage: null,
            isOpen: false,
            similarProducts: [],
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        // console.log(this.props.match.params.uuid);
        this.auth = new AuthService();
        this.service = new ProductService();
        this.cart = new CartService();
        this.ongkir = new OngkirService();
        this.fave = new FavoriteProductService();
        this.review = new ReviewService();
        this.discuss = new DiscussionService();
        this.categoryService = new CategoryService();

        this.imageBaseUrl = 'https://s3-us-west-1.amazonaws.com/react-package-assets/images/';
        this.images = [
            { name: 'wristwatch_355.jpg', vw: '355w' },
            { name: 'wristwatch_481.jpg', vw: '481w' },
            { name: 'wristwatch_584.jpg', vw: '584w' },
            { name: 'wristwatch_687.jpg', vw: '687w' },
            { name: 'wristwatch_770.jpg', vw: '770w' },
            { name: 'wristwatch_861.jpg', vw: '861w' },
            { name: 'wristwatch_955.jpg', vw: '955w' },
            { name: 'wristwatch_1033.jpg', vw: '1033w' },
            { name: 'wristwatch_1112.jpg', vw: '1112w' },
            { name: 'wristwatch_1192.jpg', vw: '1192w' },
            { name: 'wristwatch_1200.jpg', vw: '1200w' }
        ];

        this.changePurchaseQuantity = this.changePurchaseQuantity.bind(this);
        this.handleAddToFavorite = this.handleAddToFavorite.bind(this);
        this.updateInputAmountValue = this.updateInputAmountValue.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    srcSet() {
        return this.images.map(image => {
            return `${this.imageBaseUrl}${this.image.name} ${this.image.vw}`;
        }).join(', ')
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
        this.auth.isLoggedIn()
            .then(res => {
                if (res === false) {
                    this.setState({ isLoggedIn: res });
                }
                else {
                    this.setState({ isLoggedIn: true });
                }
            })
            .catch(err => {
                alert(err.message);
            });
        // alert(this.props.match.params.uuid)
        this.service.getProduct(this.props.match.params.uuid)
            .then(res => {
                // alert(1);
                console.log('wooo', res.data.data);
                const product = res.data.data;
                console.log('aa', product);
                // alert(1234)
                const image = product.image != null ? product.image.url : "https://via.placeholder.com/500";
                // alert(1235)
                // alert(image);
                // const headImage = images[Object.keys(images)[0]].url;
                // alert(123)
                const user = product.user;
                console.log(user);
                // alert(123)
                const category = product.category;

                this.setState({ product, user, category, image });
                // alert(123)
                // alert(this.state.image);
                this.review.getReviews(this.state.product.uuid)
                    .then(res => {
                        const reviews = res.data.data[0] != undefined ? res.data.data[0].detail_review : [];
                        this.setState({ reviews });
                        // console.log(reviews);
                    })
                    .catch(err => {
                        // alert(err.message);
                    })
                this.service.getSimilarProducts(category.uuid)
                    .then(res => {
                        this.setState({similarProducts: res.data});
                    })
                    .catch(err => {
                        alert(err.message);
                    })
                this.discuss.getDiscussions(this.state.product.uuid)
                    .then(res => {
                        const discussions = res.data.data[0] != undefined ? res.data.data[0].detail_discussion : [];
                        this.setState({ discussions });
                        console.log(this.state.discussions);
                    })
                    .catch(err => {
                        // alert(err.message);
                    })
                // console.log(this.state.product.category.name);
            })
            .catch(err => {
                console.log(err.message);
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

    handleCityChange = (event) => {
        const couriers = ['jne', 'tiki', 'pos']
        const dest_id = event.target.value;
        this.setState({ selectedCity: dest_id });

        couriers.map(courier => {
            // alert(courier);
            this.ongkir.getCost(this.state.user.city_id, dest_id, this.state.product.weight * this.state.purchaseQuantity, courier)
                .then(res => {
                    // alert(1);
                    console.log(res.data.rajaongkir.results);
                    const availableCourier = this.state.availableCourier;
                    availableCourier.push(res.data.rajaongkir.results);
                    this.setState({ availableCourier });
                })
                .then(() => {
                    // console.log(this.state.availableCourier);
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }

    changePurchaseQuantity(e) {
        const purchaseQuantity = e.target.value;
        this.setState({ purchaseQuantity });
    }

    updateInputAmountValue(e) {
        // alert(e.target.value);
        this.setState({ toCartAmount: e.target.value });
    }

    handleAddToFavorite(e) {
        e.preventDefault();
        this.fave.addFavoriteProduct(this.state.product.uuid)
            .then(res => {
                alert("success!");
                console.log(res);
            })
            .catch(err => {
                alert(err.response.status);
                if (err.response.status == 401) {
                    console.log(err.message);
                    alert("Please login first!");
                    this.props.history.replace("/login");
                }
            });
    }

    quickBuyIndexedDB() {
        this.cart.addProductForQuickBuy(this.state.product, this.state.toCartAmount)
            .then(res => {
                console.log(res);
                this.props.history.push("/payment");
            })
            .catch(err => {
                alert(err.message);
            });
    }

    handleAddToCart(e) {
        e.preventDefault();
        // alert(this.state.toCartAmount);
        if (this.state.isLoggedIn) {
            //if logged in, store to server side db
            this.cart.addProductToCart(this.state.product.uuid, this.state.toCartAmount)
                .then(res => {
                    console.log(res.data);
                    alert("product added to cart successfully");
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        console.log(err.message);
                        alert("Please login first!");
                        this.props.history.replace("/login");
                    }
                    //alert(err.message);
                    console.log(err);
                });
        }
        else {
            //if not logged in, store to indexed db
            this.cart.addProductToIndexedDBCart(this.state.product.uuid, this.state.toCartAmount)
                .then(res => {
                    console.log(res);
                    alert("Added to cart, but you have to login to proceed to payment");
                });
        }
    }

    handleSubmitDiscussion(e) {
        e.preventDefault();
        const message = e.target._discuss.value;
        const parentId = e.target._parentId.value;
        // alert(message);
        this.discuss.addDiscussion(this.state.product.uuid, message, parentId)
            .then(res => {
                this.service.getProduct(this.props.match.params.uuid)
                    .then(res => {
                        const product = res.data.data;
                        // console.log(product.weight);
                        const user = product.user;
                        const category = product.category;
                        this.setState({ product, user, category });
                        this.review.getReviews(this.state.product.uuid)
                            .then(res => {
                                const reviews = res.data.data[0] != undefined ? res.data.data[0].detail_review : [];
                                this.setState({ reviews });
                                // console.log(reviews);
                            })
                            .catch(err => {
                                alert(err.message);
                            })
                        this.discuss.getDiscussions(this.state.product.uuid)
                            .then(res => {
                                const discussions = res.data.data[0] != undefined ? res.data.data[0].detail_discussion : [];
                                this.setState({ discussions });
                                console.log(this.state.discussions);
                            })
                            .catch(err => {
                                alert(err.message);
                            })
                        // console.log(this.state.product.category.name);
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
            })
            .catch(err => {
                alert(err.message);
            });
    }

    handleSubmitReview(e) {
        e.preventDefault();
        const message = e.target._review.value;
        this.review.addReview(this.state.product.uuid, message)
            .then(() => {
                this.service.getProduct(this.props.match.params.uuid)
                    .then(res => {
                        const product = res.data.data;
                        // console.log(product.weight);
                        const user = product.user;
                        const category = product.category;
                        this.setState({ product, user, category });
                        this.review.getReviews(this.state.product.uuid)
                            .then(res => {
                                const reviews = res.data.data[0] != undefined ? res.data.data[0].detail_review : [];
                                this.setState({ reviews });
                                // console.log(reviews);
                            })
                            .catch(err => {
                                alert(err.message);
                            })
                        this.discuss.getDiscussions(this.state.product.uuid)
                            .then(res => {
                                const discussions = res.data.data[0] != undefined ? res.data.data[0].detail_discussion : [];
                                this.setState({ discussions });
                                console.log(this.state.discussions);
                            })
                            .catch(err => {
                                alert(err.message);
                            })
                        // console.log(this.state.product.category.name);
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
            })
            .catch(err => {
                alert(err.message);
            })
        this.setState({ reload: !this.state.reload });
    }

    displayFullSize() {
        // alert("YEY");
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const total_feedback = this.state.user.positive_feedback + this.state.user.negative_feedback;
        var reputation = this.state.user.positive_feedback / total_feedback * 100;
        const kategori = this.state.category;
        if (isNaN(reputation)) reputation = 0;
        reputation = reputation.toFixed(2);
        // console.log(reputation);
        return (
            <div className="app">
                {
                    // alert(this.state.product.name)
                }
                <Header {...this.props} />
                <div className="content">
                    <div className="dummy dummy--header">
                        <Breadcrumb kategori={kategori}></Breadcrumb>
                    </div>
                    <div className="dummy">
                        <div className="perimeter">
                            <div className="image">
                                {
                                    this.state.isOpen && (
                                        <Lightbox
                                            mainSrc={this.state.image}
                                            onClick={this.displayFullSize.bind(this)}
                                        // nextSrc={images[(photoIndex + 1) % images.length]}
                                        // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                                        // onCloseRequest={() => this.setState({ isOpen: false })}
                                        // onMovePrevRequest={() =>
                                        //     this.setState({
                                        //         photoIndex: (photoIndex + images.length - 1) % images.length,
                                        //     })
                                        // }
                                        // onMoveNextRequest={() =>
                                        //     this.setState({
                                        //         photoIndex: (photoIndex + 1) % images.length,
                                        //     })
                                        // }
                                        />
                                    )
                                }
                                {/* <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: this.state.image,
                                        // srcSet: this.srcSet,
                                        sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',
                                    },
                                    largeImage: {
                                        alt: '',
                                        src: this.state.image,
                                        width: 1200,
                                        height: 1800,
                                    },
                                    isHintEnabled: false
                                }}  */}
                                {/* onClick={this.displayFullSize.bind(this)}/> */}
                                <img src={this.state.image} alt="Product Image" onClick={this.displayFullSize.bind(this)} />
                            </div>
                            <div className="copy">
                                <h1>{this.state.product.name}</h1>
                                <br />
                                <hr />
                                <br />
                                <div className="product-desc">
                                    {
                                        console.log(this.state.product)
                                    }
                                    <h1>{`Rp. ${this.state.product.price}`}</h1>
                                    <p className="App-intro">
                                        {
                                            this.state.product.description != '' ?
                                                (
                                                    <p>{this.state.product.description}</p>
                                                ) :
                                                (
                                                    <p>Tidak ada deskripsi untuk produk ini</p>
                                                )
                                        }
                                    </p>
                                    <br />
                                    <div>
                                        Cicilan 0% – 3 bulan Rp1.266.666/bulan
                                        <br />
                                        Cicilan 0% – 6 bulan Rp633.333/bulan
                                        <br />
                                        Cicilan 0% – 12 bulan Rp316.666/bulan
                                    </div>
                                    <p className="App-intro">
                                        Masukkan jumlah yang diinginkan:
                                        <br />
                                        <input type="number" min="1" max="20" name="_addCartAmount" onChange={this.updateInputAmountValue} defaultValue={this.state.toCartAmount} />
                                        {/* <span>Tersedia {this.state.toCartAmount} barang</span> */}
                                        {/* <div className="js-numstepper">
                                            <input type="text" name="_addCartAmount" onChange={this.updateInputAmountValue} />
                                        </div> */}
                                    </p>
                                    <p className="App-intro">
                                        Jaminan 100% Aman!
                                        Uang pasti kembali. Sistem pembayaran bebas penipuan. LukaBapak memang de best.
                                    </p>
                                    {/* <Link to="/payment"><button onClick={this.quickBuyIndexedDB.bind(this)}>Beli Sekarang!</button></Link> */}
                                    {
                                        this.state.product.stock > 0 ? (
                                            <button onClick={this.quickBuyIndexedDB.bind(this)}>Beli Sekarang!</button>
                                        ) : (
                                                null
                                            )
                                    }
                                    &nbsp;&nbsp;
                                    <button onClick={this.handleAddToFavorite}>Jadikan Favorit</button>
                                    &nbsp;&nbsp;
                                    <button onClick={this.handleAddToCart}>Masukkan ke Keranjang</button>
                                </div>
                            </div>
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
                                                <QRCode value={`http://localhost:8000${this.props.location.pathname}`} />
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
                                    <i className="fas fa-map-marker-alt">{this.state.product.city}</i>
                                </div>

                                <div className="dummy">
                                    Pengiriman Information Goes Here
                                    <div className="product-description">
                                        <h3>Pelanggan: 0</h3>
                                        <h3>Login terakhir: {new Date(Date.parse(this.state.user.created_at)).toDateString()} </h3>
                                        <h3>Bergabung: {this.state.user.created_at} </h3>
                                    </div>
                                </div>
                                {/* <div className="dummy">Favorite Button Goes Here</div> */}
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
                                    <h2>Masukkan Jumlah: </h2>
                                    <br />
                                    <input type="number" name="quantity" min="0" max="100" step="1" defaultValue="1" onChange={this.changePurchaseQuantity} />
                                </div>
                                <br />
                                <div>
                                    <h2>Masukkan Tujuan: </h2>
                                </div>
                                <br />
                                <div>
                                    <select name="select-province" onChange={this.handleProvinceChange} defaultValue={this.selectedProvince}>
                                        <option value> Pilih Provinsi </option>
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
                                    <select name="" onChange={this.handleCityChange} style={{ width: '200px' }}>
                                        <option value> Pilih Kota </option>
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
                                <br />
                                <h2>Estimasi Ongkos</h2>
                                <br />
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Kurir</th>
                                            <th>Servis</th>
                                            <th>Waktu Antar</th>
                                            <th>Ongkos Kirim</th>
                                            <th>Harga + Ongkos Kirim</th>
                                        </tr>
                                        {
                                            this.state.availableCourier.map((courier, index) => {
                                                // console.log(courier);
                                                return (
                                                    courier.map((service, id) => {
                                                        // console.log(service);
                                                        // alert(22);
                                                        return (
                                                            service.costs.map((cost, i) => {
                                                                console.log(cost);
                                                                return (
                                                                    <tr>
                                                                        <td>{service.name}</td>
                                                                        <td>{cost.service}</td>
                                                                        <td>{cost.cost[0].etd}</td>
                                                                        <td>{cost.cost[0].value}</td>
                                                                        <td>{cost.cost[0].value + this.state.product.price}</td>
                                                                    </tr>
                                                                )
                                                            })

                                                        )
                                                    })
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="product__bought-together dummy">Top Review
                        <div className="comment-container">
                                <div className="comment-box">
                                    <div className="comment-form">
                                        <div className="header">Review Produk Ini</div>
                                        <form onSubmit={this.handleSubmitReview.bind(this)}>
                                            {/* <div>
                                                <input id="name" placeholder="Nama" type="text" />
                                            </div> */}
                                            <div>
                                                <textarea id="comment" name="_review" rows={3} cols={30} placeholder="Pertanyaan atau apapun" defaultValue={""} />
                                            </div>
                                            <button type="submit">Review</button>
                                        </form>
                                    </div>
                                    <div>
                                        <h4 className="header" style={{ textAlign: "left", marginLeft: 60 }}>Review</h4>
                                        {
                                            this.state.reviews.map((r, idx) => {
                                                return (
                                                    <div id="comments" style={{ textAlign: "left", marginLeft: 60, fontSize: 18 }}>{r.message} <blockquote> - oleh {r.user.name}</blockquote><br /></div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dummy">Discussions
                        <div className="comment-container">
                                <div className="comment-box">
                                    <div className="comment-form">
                                        <div className="header">Tanyakan Apapun tentang {this.state.product.name}</div>
                                        <form onSubmit={this.handleSubmitDiscussion.bind(this)}>
                                            {/* <div>
                                                <input id="name" placeholder="Nama" type="text" />
                                            </div> */}
                                            <div>
                                                <textarea id="comment" name="_discuss" rows={3} cols={30} placeholder="Pertanyaan atau apapun" defaultValue={""} />
                                                <input type="hidden" name="_parentId" value="null" />
                                            </div>
                                            <button type="submit">Kirim</button>
                                        </form>
                                    </div>
                                    <div>
                                        <h4 className="header" style={{ textAlign: "left", marginLeft: 60 }}>Diskusi</h4>
                                        {
                                            this.state.discussions.map((disc, idex) => {
                                                let parentId = disc.id;
                                                console.log(parentId);
                                                return (
                                                    disc.parent_id == null ? (
                                                        <div id="comments" style={{ textAlign: "left", marginLeft: 60, fontSize: 18 }}>
                                                            {disc.message} - {disc.user.name}
                                                            <br />
                                                            {
                                                                disc.child.map((childDisc, child_id) => {
                                                                    // console.log(childDisc);
                                                                    // parentId = childDisc.parent_id;
                                                                    return (
                                                                        <div id="comments" style={{ textAlign: "left", marginLeft: 70, fontSize: 18 }}>
                                                                            {childDisc.message} - {childDisc.user.name}
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            <form onSubmit={this.handleSubmitDiscussion.bind(this)}>
                                                                <input style={{ margin: -10 }} type="text" name="_discuss" id="" />
                                                                <input type="hidden" name="_parentId" value={parentId} />
                                                                <button type="submit">Balas</button>
                                                            </form>
                                                            <br />
                                                            <br />
                                                            <hr />
                                                        </div>
                                                    ) : (null)
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="dummy">
                            <div className="comment-container">
                                <div className="product-description">
                                    <h1>Produk Serupa</h1>
                                    <div>
                                        {
                                            this.state.similarProducts.map((data, index) => {
                                                return (
                                                    <GridProduct product={data}></GridProduct>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
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
