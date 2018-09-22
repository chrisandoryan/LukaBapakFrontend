import React from 'react'
import {
    Link
} from 'react-router-dom'
import '../../css/auth.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="login">
                <div class="login-screen">
                    <div class="app-title">
                        <h3>Silakan masuk ke dalam akun kamu</h3>
                    </div>
                    <br />
                    <div class="login-form">

                        <div class="control-group">
                            <input type="text" class="login-field" value="" placeholder="Email/Username/No Handphone" id="login-pass" />
                            <label class="login-field-icon fui-lock" for="login-pass"></label>
                        </div>

                        <div class="control-group">
                            <input type="password" class="login-field" value="" placeholder="Password" id="login-pass" />
                            <label class="login-field-icon fui-lock" for="login-pass"></label>
                        </div>

                        <div>
                            <input type="checkbox" name="remember" />Ingat Saya
                </div>

                        <a class="btn btn-primary btn-large btn-block" href="#">Login</a>
                        <a class="login-link" href="#">Belum punya akun? Daftar di sini</a>
                        <a class="login-link" href="#">Lupa password?</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
