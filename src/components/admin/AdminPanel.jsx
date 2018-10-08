import React from 'react'
import {
    Link
} from 'react-router-dom'
import '../../css/admin.css'
import { HashRouter as Router, Route } from 'react-router-dom'
import ManageCategories from './ManageCategories';
import ManageAdministrator from './ManageAdministrator';
import ManageVouchers from './ManageVouchers';
import ManagePromo from './ManagePromo';
import AuthService from '../../services/AuthService';

const adminRoutes = [
    {
        path: '/categories',
        component: ManageCategories
    },
    {
        path: '/promo',
        component: ManagePromo
    },
    {
        path: '/vouchers',
        component: ManageVouchers
    },
    {
        path: '/admins',
        component: ManageAdministrator
    }
]

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
        this.state = {
            isLoggedIn: true,
            user: {},
        }
    }

    componentDidMount() {
        this.service.isLoggedIn()
            .then(res => {
                if (res === false) {
                    this.setState({ isLoggedIn: false });
                }
                else {
                    // alert(2);
                    console.log(res);
                    this.setState({ user: res });
                }
            })
            .then(() => {
                if (!this.state.user || this.state.user.is_admin == 0 || this.state.isLoggedIn === false) {
                    this.props.history.push("/");
                    // alert(1);
                    // console.log(this.state.user);
                }
            });
        // alert(this.state.user.is_admin);
    }

    render() {
        return (
            <Router hashType="noslash">
                <div className="container">
                    {/*     SIDE AREA */}
                    <div className="sideArea">
                        <div className="avatar">
                            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNOdyoIXDDBztO_GC8MFLmG_p6lZ2lTDh1ZnxSDawl1TZY_Zw" alt /> */}
                            <div className="avatarName"><h2>LukaBapak Administrator</h2></div>
                        </div>
                        <ul className="sideMenu">
                            {/* <li><a href="javascript:void(0)" className="has-submenu"><span className="fa fa-table" />Products</a>
                            <ul className="submenu">
                                <li><a href="index.php?c=product&a=list01"><span className="fa fa-list" />Product List</a></li>
                                <li><a href="index.php?c=product&a=list02"><span className="fa fa-tags" />Category List</a></li>
                            </ul>
                        </li> */}
                            <li><Link to="categories">Categories</Link></li>
                            <li><Link to="promo">Promo</Link></li>
                            <li><Link to="vouchers">Vouchers</Link></li>
                            <li><Link to="admins">Admins</Link></li>
                        </ul>
                    </div>
                    {/*     SIDE AREA */}
                    <div className="mainArea">
                        {/* BEGIN NAV */}
                        <nav className="navTop row">
                            <div className="account fr">
                                <div className="name has-submenu">{this.state.user.name}</div>
                            </div>
                        </nav>
                        {/* END NAV */}
                        {/* CONTAINER  */}

                        <div>
                            {adminRoutes.map(route => (
                                <Route path={route.path} component={route.component} />
                            ))}
                        </div>
                        {/* END CONTAINER  */}
                    </div>
                </div>
            </Router>
        )
    }
}

export default AdminPanel;
