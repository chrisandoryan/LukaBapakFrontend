import React from 'react'
import {
    Link
} from 'react-router-dom'
import '../../css/admin.css'
import { HashRouter as Router, Route } from 'react-router-dom'
import ManageCategories from './ManageCategories';

const adminRoutes = [
    {
        path: '/categories',
        component: ManageCategories
    },
    {
        path: '/promo',
        component: ManageCategories
    },
    {
        path: '/vouchers',
        component: ManageCategories
    },
    {
        path: '/admins',
        component: ManageCategories
    }
]

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
                        <li><Link to="#categories"><span className="fa fa-sitemap" />Categories</Link></li>
                        <li><Link to="#promo"><span className="fa fa-money" />Promo</Link></li>
                        <li><Link to="#vouchers"><span className="fa fa-user-o" />Vouchers</Link></li>
                        <li><Link to="#admins"><span className="fa fa-envelope-o" />Admins</Link></li>
                    </ul>
                </div>
                {/*     SIDE AREA */}
                <div className="mainArea">
                    {/* BEGIN NAV */}
                    <nav className="navTop row">
                        <div className="account fr">
                            <div className="name has-submenu">John Doe</div>
                        </div>
                    </nav>
                    {/* END NAV */}
                    {/* CONTAINER  */}
                    <Router hashType="noslash">
                        <div>
                            {adminRoutes.map(route => (
                                <Route path={route.path} component={route.component} />
                            ))}
                        </div>
                    </Router>
                    {/* END CONTAINER  */}
                </div>
            </div>
        )
    }
}

export default AdminPanel;
