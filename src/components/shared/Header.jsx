import React from 'react'
import {
    Link
} from 'react-router-dom'
import Dropdown from '../misc/Dropdown';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
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

        render() {
            return (
                <div>
                    <ul className="top-nav">
                        <div className="content">
                            <li><a href="#home">LukaBapak</a></li>
                            <li class="dropdown"><a class="dropbtn" onClick={this.showMenu} href="">Category</a>
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
                                    <form>
                                        <input type="text" placeholder="Aku mau belanja..." name="search" />
                                        <button type="submit"><i className="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </li>
                            <li><a href="#about">Lihat Status Transaksi</a></li>
                            <li><a href="">Cart</a></li>
                            <li>
                                <button className="login-btn">Login</button>
                                <button className="register-btn">Daftar</button>
                            </li>
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
