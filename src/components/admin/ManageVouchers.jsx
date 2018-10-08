import React from 'react'
import {
    Link
} from 'react-router-dom'
import VoucherService from '../../services/VoucherService';
import ContentEditable from "react-sane-contenteditable";

class ManageVouchers extends React.Component {
    constructor(props) {
        super(props);
        this.service = new VoucherService();
        this.state = {
            vouchers: [],
            newPriceCut: 0,
            selectedVoucherId: null,
        }
        this.handleSelectVoucher = this.handleSelectVoucher.bind(this);
    }

    componentDidMount() {
        this.updateVoucherList();
    }

    updateVoucherList() {
        this.service.getVouchers()
            .then(res => {
                console.log(res.data.data);
                this.setState({ vouchers: res.data.data });
            })
            .catch(err => {
                alert(err.message);
            })
    }

    handleRemoveVoucher(e) {
        e.preventDefault();
        const id = e.target._id.value;
        this.service.deleteVoucher(id)
            .then(res => {
                console.log("Success!");
                this.updateVoucherList();
            })
            .catch(err => {
                alert(err.message);
            })
    }

    handleAddVoucher(e) {
        e.preventDefault();
        const code = e.target._code.value;
        const name = e.target._name.value;
        const price = e.target._price.value;
        this.service.storeVoucher(code, name, price)
            .then(res => {
                alert("Success!");
                this.updateVoucherList();
            })
            .catch(err => {
                alert(err.message);
            })
    }

    updatePriceCut() {
        const newPrice = this.state.newPriceCut;
        const id = this.state.selectedVoucherId;
        // alert(id);
        this.service.updateVoucher(newPrice, id)
            .then(res => {
                alert("Success!");
                this.updateVoucherList();
            })
            .catch(err => {
                alert(err.message);
            })
    }

    handlePriceChange = (ev, value) => {
        console.log(value);
        this.state.newPriceCut = value;
    }

    render() {
        return (
            <div className="mainContent">
                <form action method="GET" name="listForm" className="form scrollX">
                    <div className="formHeader row">
                        <h2 className="text-1 fl">Active Voucher Codes</h2>
                        {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div> */}
                    </div>
                    <div className="table">
                        <div className="row bg-1">
                            <div className="cell cell-50 text-center text-fff">No.</div>
                            <div className="cell cell-100 text-center text-fff">Code</div>
                            <div className="cell cell-100 text-center text-fff">Voucher Name</div>
                            <div className="cell cell-100 text-center text-fff">Price Cut</div>
                            {/* <div className="cell cell-100 text-center text-fff"><input className="checkbox checkAll" name="statusAll" target=".status" type="checkbox" /></div> */}
                            <div className="cell cell-100 text-center text-fff">Action</div>
                        </div>
                        {/*   BEGIN LOOP */}
                        {
                            this.state.vouchers.map((v, id) => {
                                return (
                                    <ul>
                                        <li className="row">
                                            <div className="cell cell-50 text-center">{id + 1}</div>
                                            <div className="cell cell-100 text-center">{v.code}</div>
                                            <div className="cell cell-100 text-center">
                                                {v.name}
                                            </div>
                                            <div className="cell cell-100 text-center">
                                            Rp. 
                                            <ContentEditable
                                                tagName="text"
                                                content={`${v.price_cut}`}
                                                editable={true}
                                                maxLength={140}
                                                multiLine={false}
                                                onClick={this.state.selectedVoucherId = v.uuid}
                                                onBlur={this.updatePriceCut.bind(this)}
                                                onChange={this.handlePriceChange.bind(this)}
                                            />
                                            </div>
                                            <form className="cell cell-100 text-center" onSubmit={this.handleRemoveVoucher.bind(this)}>
                                                <input type="hidden" name="_id" value={v.uuid} />
                                                <button>Remove</button>
                                            </form>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                        {/*   END LOOP */}
                    </div>
                </form>
                <br />
                {/* DETAIL FORM */}
                <form onSubmit={this.handleAddVoucher.bind(this)} className="form">
                    <div className="formHeader row">
                        <h2 className="text-1 fl">Add Voucher Code</h2>
                        {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div> */}
                    </div>
                    <div className="formBody row">
                        <div className="column s-6">
                            <label className="inputGroup">
                                <h3>Voucher Code</h3>
                                <br />
                                <input name="_code" type="text" />
                            </label>
                            <label className="inputGroup">
                                <h3>Voucher Name</h3>
                                <br />
                                <input name="_name" type="text" />
                            </label>
                            <label className="inputGroup">
                                <h3>Price Cut</h3>
                                <br />
                                Rp. <input name="_price" type="text" />
                            </label>
                            <label className="inputGroup">
                                <input type="submit" value="Activate" />
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

export default ManageVouchers;
