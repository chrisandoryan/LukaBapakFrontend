import React from 'react'
import {
    Link
} from 'react-router-dom'
import AdminService from '../../services/AdminService';

class ManageAdministrator extends React.Component {
    constructor(props) {
        super(props);
        this.service = new AdminService();
    }

    handleAdminInvitation(e) {
        e.preventDefault();
        // alert(e.target._email.value);
        this.service.sendAdminInvitation(e.target._email.value)
            .then(res => {
                alert("Invitation sent!");
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
                        <h2 className="text-1 fl">Active Administrators</h2>
                        {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div> */}
                    </div>
                    <div className="table">
                        <div className="row bg-1">
                            <div className="cell cell-50 text-center text-fff">No.</div>
                            <div className="cell cell-100 text-center text-fff">Email</div>
                            <div className="cell cell-100 text-center text-fff">Name</div>
                            <div className="cell cell-100 text-center text-fff">Last Login</div>
                            {/* <div className="cell cell-100 text-center text-fff"><input className="checkbox checkAll" name="statusAll" target=".status" type="checkbox" /></div> */}
                            <div className="cell cell-100 text-center text-fff">Revoke</div>
                        </div>
                        {/*   BEGIN LOOP */}
                        <ul>
                            <li className="row">
                                <div className="cell cell-50 text-center">1</div>
                                <div className="cell cell-100 text-center">chrisando.siahaan@gmail.com</div>
                                <div className="cell cell-100 text-center">
                                    Chrisando Ryan
                            </div>
                                <div className="cell cell-100 text-center"><a href>28-02-2018 14:30:12</a></div>
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
                <form action method="POST" encType="multipart/form-data" className="form">
                    <div className="formHeader row">
                        <h2 className="text-1 fl">Invite Admin</h2>
                        {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div> */}
                    </div>
                    <form className="formBody row" onSubmit={this.handleAdminInvitation.bind(this)}>
                        <div className="column s-6">
                            <label className="inputGroup">
                                <h3>Email</h3>
                                <br/>
                                <input name="_email" type="text" />
                            </label>
                            <label className="inputGroup">
                                <input type="submit" value="Invite" />
                            </label>
                        </div>
                    </form>
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

export default ManageAdministrator;
