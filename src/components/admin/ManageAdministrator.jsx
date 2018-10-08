import React from 'react'
import {
    Link
} from 'react-router-dom'
import AdminService from '../../services/AdminService';

class ManageAdministrator extends React.Component {
    constructor(props) {
        super(props);
        this.service = new AdminService();
        this.state = {
            admins: [],
        }
    }

    componentDidMount() {
        this.service.getAdmins()
            .then(res => {
                console.log(res.data.data);
                this.setState({ admins: res.data.data });
            })
            .catch(err => {
                alert(err.message);
            });
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

    handleAdminRemoval(e) {
        e.preventDefault();
        const uuid = e.target._uuid.value;
        this.service.revokeAdmin(uuid)
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
                        {
                            this.state.admins.map((admin, index) => {
                                return (
                                    <ul>
                                        <li className="row">
                                            <div className="cell cell-50 text-center">{index + 1}</div>
                                            <div className="cell cell-100 text-center">{admin.email}</div>
                                            <div className="cell cell-100 text-center">
                                                {admin.name}
                                            </div>
                                            <div className="cell cell-100 text-center"><a href>{admin.created_at}</a></div>
                                            <form className="cell cell-100 text-center" onSubmit={this.handleAdminRemoval.bind(this)}>
                                                <input type="hidden" name="_uuid" value={admin.uuid}/>
                                                <button>Remove</button>
                                            </form>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </form>
                <br />
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
                                <br />
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
