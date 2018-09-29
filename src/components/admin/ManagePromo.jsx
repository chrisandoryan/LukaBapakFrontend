import React from 'react'
import {
    Link
} from 'react-router-dom'
import axios from 'axios'
import PromoService from '../../services/PromoService';

const APIPromos = 'http://localhost:8000/api/promotions';

class ManagePromo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promos: [],
            dropdownPromoSelected: '',
        }
        this.service = new PromoService();
        this.handlePromoInsert = this.handlePromoInsert.bind(this);
        this.handleAddProductToPromo = this.handleAddProductToPromo.bind(this);
        this.handleDropDownPromoChange = this.handleDropDownPromoChange.bind(this);
    }

    handleDropDownPromoChange(e) {
        this.setState({dropdownPromoSelected: e.target.value });
    }

    handlePromoInsert(e) {
        e.preventDefault();
        const promo_name = e.target._addPromoName.value;
        this.service.storePromo(promo_name)
            .then(res => {
                console.log(res);
                alert('Success adding promo ' + res.data.data.name);
            })
            .catch(err => {
                console.log(err.message);
                alert('Failed');
            })
        this.forceUpdate()
    }

    handleAddProductToPromo(e) {
        e.preventDefault();
        const product_uuid = e.target._puuid.value;
        const promo_id = e.target.promo_id.value;
        this.service.addPromotedProduct(promo_id, product_uuid)
            .then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                alert(err.message);
            });
    }

    componentDidMount() {
        axios.get(APIPromos)
            .then(res => {
                const promos = res.data.data
                this.setState({ promos });
                // console.log(this.state.promos);
            });
    }

    render() {
        return (
            <div className="mainContent">
                <form action method="GET" name="listForm" className="form scrollX">
                    <div className="formHeader row">
                        <h2 className="text-1 fl">Active Promo</h2>
                        {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div> */}
                    </div>
                    <div className="table">
                        <div className="row bg-1">
                            <div className="cell cell-50 text-center text-fff">No.</div>
                            <div className="cell cell-100 text-center text-fff">Promo Name</div>
                            <div className="cell cell-100 text-center text-fff">Active Since</div>
                            <div className="cell cell-100 text-center text-fff">Total Product(s)</div>
                            {/* <div className="cell cell-100 text-center text-fff"><input className="checkbox checkAll" name="statusAll" target=".status" type="checkbox" /></div> */}
                            <div className="cell cell-100 text-center text-fff">Action</div>
                        </div>
                        {/*   BEGIN LOOP */}
                        {
                            this.state.promos.map((data, index) => {
                                return (
                                    <ul>
                                        <li className="row">
                                            <div className="cell cell-50 text-center">{index + 1}</div>
                                            <div className="cell cell-100 text-center">{data.name}</div>
                                            <div className="cell cell-100 text-center">
                                                {data.created_at.date}
                                            </div>
                                            <div className="cell cell-100 text-center"><a href>{data.products.length}</a></div>
                                            <div className="cell cell-100 text-center">
                                                <button>View Detail</button>

                                                <button>Deactivate</button>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                        {/*   END LOOP */}
                    </div>
                </form>
                <br />
                {
                    this.state.selected_promo ? (
                        <form action method="GET" name="listForm" className="form scrollX">
                            <div className="formHeader row">
                                <h2 className="text-1 fl">Products on Promo <i>Kemerdekaan Dari TPA</i>: </h2>
                                {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div> */}
                            </div>
                            <div className="table">
                                <div className="row bg-1">
                                    <div className="cell cell-50 text-center text-fff">No.</div>
                                    <div className="cell cell-100 text-center text-fff">Product Name</div>
                                    <div className="cell cell-100 text-center text-fff">Old Price</div>
                                    <div className="cell cell-100 text-center text-fff">New Price</div>
                                    {/* <div className="cell cell-100 text-center text-fff"><input className="checkbox checkAll" name="statusAll" target=".status" type="checkbox" /></div> */}
                                    <div className="cell cell-100 text-center text-fff">Action</div>
                                </div>
                                {/*   BEGIN LOOP */}
                                <ul>
                                    <li className="row">
                                        <div className="cell cell-50 text-center">1</div>
                                        <div className="cell cell-100 text-center">Promo Kemerdekaan dari TPA</div>
                                        <div className="cell cell-100 text-center">
                                            Rp. 99900
                            </div>
                                        <div className="cell cell-100 text-center"><a href>Rp. 79900</a></div>
                                        {/* <div className="cell cell-100 text-center">
                                <input className="status" name="status" defaultValue={0} type="hidden" />
                                <input className="btnSwitch status" name="status" type="checkbox" />
                            </div> */}
                                        <div className="cell cell-100 text-center">
                                            <button>Remove</button>
                                        </div>
                                    </li>
                                </ul>
                                {/*   END LOOP */}
                            </div>
                        </form>
                    ) : (null)
                }
                <br />
                {/* DETAIL FORM */}
                {
                    this.state.promos.length > 0 ? (
                         <form action method="POST" encType="multipart/form-data" onSubmit={this.handleAddProductToPromo} className="form">
                            <div className="formHeader row">
                                <h2 className="text-1 fl">Promote Product</h2>
                            </div>
                            <div className="formBody row">
                                <div className="column s-6">
                                    <label className="inputGroup">
                                        <h3>Promo</h3>
                                        <br />
                                        <select name="promo_id" id="" onChange={this.handleDropDownPromoChange} defaultValue={this.state.dropdownPromoSelected}>
                                        {
                                            this.state.promos.map((promo, index) => (
                                                <option value={promo.id}>{promo.name}</option>
                                            ))
                                        }
                                        </select>
                                    </label>
                                    <label className="inputGroup">
                                        <h3>Search Product</h3>
                                        <br />
                                        <input name="_puuid" type="text" placeholder="Insert UUID" />
                                    </label>
                                    <label className="inputGroup">
                                        <input type="submit" value="Submit" />
                                    </label>
                                </div>
                            </div>
                        </form>
                    ) : (null)
                }
                <br />
                <form action method="POST" onSubmit={this.handlePromoInsert} encType="multipart/form-data" className="form">
                    <div className="formHeader row">
                        <h2 className="text-1 fl">Add Promo</h2>
                    </div>
                    <div className="formBody row">
                        <div className="column s-6">
                            <label className="inputGroup">
                                <h3>Promo Name</h3>
                                <br />
                                <input type="text" name="_addPromoName" id="" />
                            </label>
                            <label className="inputGroup">
                                <input type="submit" value="Save" />
                            </label>
                        </div>
                    </div>
                </form>
                {/* <div id="pagination">
                <ul className="pagination list-inline text-center">
                    <li><a href="?page=1">1</a></li>
                    <li className="is-active"><a href="?page=2">2</a></li>
                    <li><a href="?page=3">3</a></li>
                    <li><a href="?page=4">4</a></li>
                    <li><a href="?page=5">5</a></li>
                </ul>
            </div> */}
            </div>
        )
    }
}

export default ManagePromo;
