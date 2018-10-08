import React from 'react'
import {
    Link
} from 'react-router-dom'
import axios from 'axios'
import ReactDOM from 'react-dom';
import PromoService from '../../services/PromoService';
import ContentEditable from "react-sane-contenteditable";

const APIPromos = 'http://localhost:8000/api/promotions';

class ManagePromo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promos: [],
            dropdownPromoSelected: '',
            selectedPromo: null,
            newPromoName: "",
            selectedPromoId: 0,
        }
        this.service = new PromoService();
        this.handlePromoInsert = this.handlePromoInsert.bind(this);
        this.handleAddProductToPromo = this.handleAddProductToPromo.bind(this);
        this.handleDropDownPromoChange = this.handleDropDownPromoChange.bind(this);
    }

    handleViewDetail(e) {
        e.preventDefault();
        const id = e.target.value;
        this.service.getPromoDetail(id)
            .then(res => {
                console.log(res.data.data);
                this.setState({ selectedPromo: res.data.data[0] });
                console.log(this.state.selectedPromo);
            })
            .catch(err => {
                alert(err.message);
            })
        // alert(id);
    }

    handleNameChange = (ev, value) => {
        console.log(value);
        this.state.newPromoName = value;
    }

    handleDropDownPromoChange(e) {
        this.setState({ dropdownPromoSelected: e.target.value });
    }

    handleDeactivatePromo(e) {
        e.preventDefault();
        const id = e.target.value;
        // alert(id);
        this.service.removePromo(id)
            .then(res => {
                alert("Success!");
                axios.get(APIPromos)
                    .then(res => {
                        const promos = res.data.data
                        this.setState({ promos });
                        // console.log(this.state.promos);
                    });
            })
            .catch(err => {
                alert(err.message);
            });
    }

    updatePromoList() {
        axios.get(APIPromos)
            .then(res => {
                const promos = res.data.data
                this.setState({ promos });
                // console.log(this.state.promos);
            });
    }

    handlePromoInsert(e) {
        e.preventDefault();
        const promo_name = e.target._addPromoName.value;
        this.service.storePromo(promo_name)
            .then(res => {
                console.log(res);
                this.updatePromoList();
                alert('Success adding promo ' + res.data.data.name);
            })
            .catch(err => {
                console.log(err.message);
                alert('Failed');
            })
    }

    updatePromoName = (e, data) => {
        const newName = this.state.newPromoName;
        // console.log(data);
        const id = data.id;
        // alert(id);
        // const id = ReactDOM.findDOMNode(this.refs['promoId']);
        // console.log(e.target.value);
        this.service.updatePromo(id, newName)
            .then(res => {
                alert("Success!");
                this.updatePromoList();
            })
            .catch(err => {
                alert(err.message);
            })
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
        // alert(this.state.selectedPromo);
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
                                console.log(data);
                                return (
                                    <ul>
                                        <li className="row">
                                            <div className="cell cell-50 text-center">{index + 1}</div>
                                            {/* <div className="cell cell-100 text-center">{data.name}</div> */}
                                            <ContentEditable
                                                // key={index}
                                                tagName="div"
                                                content={`${data.name}`}
                                                className="cell cell-100 text-center"
                                                editable={true}
                                                maxLength={140}
                                                multiLine={false}
                                                value={data.id}
                                                // ref="promoId"
                                                onBlur={((e) => this.updatePromoName(e, data))}
                                                onChange={this.handleNameChange.bind(this)}
                                            />
                                            <div className="cell cell-100 text-center">
                                                {data.created_at.date}
                                            </div>
                                            <div className="cell cell-100 text-center"><a href>{data.products.length}</a></div>
                                            <div className="cell cell-100 text-center">
                                                <button value={data.id} onClick={this.handleViewDetail.bind(this)}>View Detail</button>
                                                <button value={data.id} onClick={this.handleDeactivatePromo.bind(this)}>Deactivate</button>
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
                    this.state.selectedPromo != null ? (
                        <form action method="GET" name="listForm" className="form scrollX">
                            <div className="formHeader row">
                                <h2 className="text-1 fl">Products on Promo <i>{this.state.selectedPromo.name}</i>: </h2>
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
                                {
                                    this.state.selectedPromo.products.map((prod, idx) => {
                                        return (
                                            <ul>
                                                <li className="row">
                                                    <div className="cell cell-50 text-center">{idx + 1}</div>
                                                    <div className="cell cell-100 text-center">{prod.name}</div>
                                                    <div className="cell cell-100 text-center">
                                                        Rp. {prod.price}
                                                    </div>
                                                    <div className="cell cell-100 text-center">
                                                        <a contenteditable href>Rp. 79900</a></div>
                                                    <div className="cell cell-100 text-center">
                                                        <button>Remove</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                                {/*   END LOOP */}
                            </div>
                        </form>
                    ) : (null)
                }
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
