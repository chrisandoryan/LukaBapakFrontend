import React from 'react'
import {
    Link
} from 'react-router-dom'
import '../../css/auth.css';
import AuthService from '../../services/AuthService';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillMount() {
        this.service.isLoggedIn()
            .then(res => {
                if (res != false) {
                    this.props.history.replace('/');
                }
            });
    }

    handleLogin(e) {
        e.preventDefault();
        let email = e.target[0].value;
        let mode = "";
        if ((/^\d+$/g).test(email)) {
            mode = "phone";
            // alert('phone mode' + email)
        }
        else if((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            mode = "email";
        }
        else {
            mode = "username";
        }

        // alert(mode);

        let password = e.target[1].value;

        this.service.login(email, password, mode).then(access_token => {
            this.service.isLoggedIn()
                .then(res => {
                    if (res !== false) {
                        this.props.history.push("/");
                    }
                });
        });
    }

    render() {
        return (
            <div className="login">
                <div className="login-screen">
                    <div className="app-title">
                        <h3>Silakan masuk ke dalam akun kamu</h3>
                    </div>
                    <br />
                    <form onSubmit={this.handleLogin} className="login-form">

                        <div className="control-group">
                            <input type="text" className="login-field" placeholder="Email/Username/No Handphone" id="login-pass" />
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                        </div>

                        <div className="control-group">
                            <input type="password" className="login-field" placeholder="Password" id="login-pass" />
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                        </div>

                        <div className="control-group">
                            <input type="checkbox" name="remember" checked />Ingat Saya
                        </div>

                        <div>
                            <input type="submit" className="btn btn-primary btn-large btn-block" value="Login" />
                        </div>
                        <a className="login-link" href="/register">Belum punya akun? Daftar di sini</a>
                        <a className="login-link" href="#">Lupa password?</a>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
