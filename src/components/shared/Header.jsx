import React from 'react'
import {
    Link
} from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ul class="top-nav">
                    <div class="content">
                        <li><a href="#home">LukaBapak</a></li>
                        <li><a href="#news">Category</a></li>
                        <li>
                            <div class="search-container">
                                <form>
                                    <input type="text" placeholder="Aku mau belanja..." name="search" />
                                    <button type="submit"><i class="fa fa-search"></i></button>
                                </form>
                            </div>
                        </li>
                        <li><a href="#about">Lihat Status Transaksi</a></li>
                        <li><a href="">Cart</a></li>
                        <li>
                            <button class="login-btn">Login</button>
                            <button class="register-btn">Daftar</button>
                        </li>
                    </div>
                </ul>
                <ul class="suggestion-nav">
                    <div class="content">
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
