import React from 'react'
import {
    Link
} from 'react-router-dom'
import Dropdown from '../misc/Dropdown';
import AuthService from '../../services/AuthService';
import Search from './Search';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.service = new AuthService();
        this.service.isLoggedIn()
            .then(res => {
                if (res === false) {
                    this.setState({isLoggedIn: res});
                }
                else {
                    this.setState({user: res});
                }
            });
        this.state = {
            showMenu: false,
            isLoggedIn: this.service.isLoggedIn(),
            keyword: '',
            user: {},
        }
        // console.log(props);
        this.handleKeywordChange = this.handleKeywordChange.bind(this);
        // this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {
        this.forceUpdate();
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.hideMenu);
        });
    }

    hideMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.hideMenu);
        });
    }

    handleSearch(event) {
        event.preventDefault();
        this.props.history.replace(`/products/search/${this.state.keyword}`);
    }

    handleKeywordChange(event) {
        // this.setState({ keyword: e.target.value });
        // alert(event.target.value);
        this.setState({ keyword: event.target.value });
    }

    render() {
        return (
            <div>
                <ul className="top-nav">
                    <div className="content">
                        <li><Link to="/">LukaBapak</Link></li>
                        <li className="dropdown"><a className="dropbtn" onClick={this.showMenu} href="">Category</a>
                            {
                                this.state.showMenu
                                    ? (
                                        <Dropdown />
                                    )
                                    : (
                                        null
                                    )
                            }
                        </li>
                        <li>
                            <div className="search-container">
                                <Search {...this.props}/>
                                {/* <form onSubmit={this.handleSearch.bind(this)}>
                                    <input type="text" onChange={this.handleKeywordChange} placeholder="Aku mau belanja..." name="search" />
                                    <button type="submit"><i className="fa fa-search"></i></button>
                                </form> */}
                            </div>
                        </li>
                        <li><Link to="/payment">Lihat Status Transaksi</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        {
                            this.state.isLoggedIn ? (
                                <div>
                                    <li>
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/logout">Logout</Link>
                                    </li>
                                </div>
                            ) :
                                (
                                    <div>
                                        <li>
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/register">Daftar</Link>
                                        </li>
                                    </div>
                                )
                        }
                    </div>
                </ul>
                <ul className="suggestion-nav">
                    <div className="content">
                        <li><a href="">#sepatumurah</a></li>
                        <li><a href="">#sepatumurah</a></li>
                        <li><a href="">#sepatumurah</a></li>
                        <li><a href="">#sepatumurah</a></li>
                        <li><a href="">#sepatumurah</a></li>
                        <li><a href="">#sepatumurah</a></li>
                        <li><a href="">#sepatumurah</a></li>
                        <li><a href="">#sepatumurah</a></li>
                        <li><a href="">#sepatumurah</a></li>
                        <li><button>Lihat Semua</button></li>
                    </div>
                </ul>
            </div>
        )
    }
}

export default Header;
