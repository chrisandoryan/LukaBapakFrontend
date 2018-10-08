import React from 'react'
import {
    Link
} from 'react-router-dom'
import VoucherService from '../../services/VoucherService';

class ManageVouchers extends React.Component {
    constructor(props) {
        super(props);
        this.service = new VoucherService();
    }

    componentDidMount() {

    }

    updateVoucherList() {

    }

    handleAddVoucher(e) {
        e.preventDefault();
        const code = e.target._code.value;
        const name = e.target._name.value;
        this.service.storeVoucher(code, name)
            .then(res => {
                alert("Success!");
            })
            .catch(err => {
                alert(err.message);
            })
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
                            <div className="cell cell-100 text-center text-fff">Added At</div>
                            {/* <div className="cell cell-100 text-center text-fff"><input className="checkbox checkAll" name="statusAll" target=".status" type="checkbox" /></div> */}
                            <div className="cell cell-100 text-center text-fff">Action</div>
                        </div>
                        {/*   BEGIN LOOP */}
                        <ul>
                            <li className="row">
                                <div className="cell cell-50 text-center">1</div>
                                <div className="cell cell-100 text-center">LBPROMO100</div>
                                <div className="cell cell-100 text-center">
                                    Promo Cashback 100 Ribu
                            </div>
                                <div className="cell cell-100 text-center"><a href>119 Transaction(s)</a></div>
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
                <br />
                {/* CATE LIST    */}
                {/* <form action method="GET" name="listForm" className="form scrollX">
                <div className="formHeader row">
                    <h2 className="text-1 fl">Product List</h2>
                    {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div>
                </div>
                <div className="table">
                    <div className="row bg-1">
                        <div className="cell cell-50 text-center text-fff">ID</div>
                        <div className="cell cell-100 text-center text-fff">PARENT</div>
                        <div className="cell cell-100p text-fff">NAME</div>
                        <div className="cell cell-50 text-center text-fff">RANK</div>
                        <div className="cell cell-50"><input className="checkbox caretAll" type="checkbox" /></div>
                        <div className="cell cell-100 text-center text-fff">EDIT</div>
                    </div>
                    {/*    BEGIN LOOP 
                    <ul>
                        <li className="row">
                            <div className="cell cell-50 text-center">1</div>
                            <div className="cell cell-100 text-center">0</div>
                            <div className="cell cell-100p"><a href>CATE 1</a></div>
                            <div className="cell cell-50 text-center"><input name="rank[]" className="inputNumber" type="number" /></div>
                            <div className="cell cell-50 text-center"><span className="fa fa-caret-down btnCaret" /></div>
                            <div className="cell cell-100 text-center">
                                <a href className="btnEdit fa fa-pencil bg-1 text-fff" /><a href className="btnRemove fa fa-remove bg-1 text-fff" onclick="return confirm(&quot;Do you really want to remove it ?&quot;)" />
                            </div>
                            <ul className="sublist">
                                <li className="row">
                                    <div className="cell cell-50 text-center">ID</div>
                                    <div className="cell cell-100 text-center">PARENT</div>
                                    <div className="cell cell-100p"><a href>PRODUCT 2</a></div>
                                    <div className="cell cell-50 text-center"><span className="fa fa-caret-down btnCaret" /></div>
                                    <div className="cell cell-100 text-center">
                                        <a href className="btnEdit fa fa-pencil bg-1 text-fff" /><a href className="btnRemove fa fa-remove bg-1 text-fff" onclick="return confirm(&quot;Do you really want to remove it ?&quot;)" />
                                    </div>
                                    <ul className="sublist">
                                        <li>
                                            <div className="cell cell-50 text-center">ID</div>
                                            <div className="cell cell-100 text-center">PARENT</div>
                                            <div className="cell cell-100p"><a href>PRODUCT 2</a></div>
                                            <div className="cell cell-50" />
                                            <div className="cell cell-100 text-center">
                                                <a href className="btnEdit fa fa-pencil bg-1 text-fff" /><a href className="btnRemove fa fa-remove bg-1 text-fff" onclick="return confirm(&quot;Do you really want to remove it ?&quot;)" />
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {/*    END LOOP 
                </div>
            </form> */}
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
