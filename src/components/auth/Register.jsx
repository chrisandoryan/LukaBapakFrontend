import React from 'react'
import {
    Link
} from 'react-router-dom'
import '../../css/auth.css';
class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="login">
                <div class="login-screen">
                    <div class="app-title">
                        <h3>Daftar akun baru sekarang</h3>
                    </div>
                    <br />
                    <div class="login-form">
                        <div class="control-group">
                            <input type="text" class="login-field" value="" placeholder="Nama Lengkap" id="login-name" />
                            <label class="login-field-icon fui-user" for="login-name"></label>
                        </div>

                        <div class="control-group">
                            <input type="email" class="login-field" value="" placeholder="Email/No Handphone" id="login-pass" />
                            <label class="login-field-icon fui-lock" for="login-pass"></label>
                        </div>

                        <div><input type="radio" name="gender" value="male" checked />Laki-laki</div>
                        <div><input type="radio" name="gender" value="female" />Perempuan</div>

                        <div class="control-group">
                            <input type="text" class="login-field" value="" placeholder="Lukabapak.com/username" id="login-pass" />
                            <label class="login-field-icon fui-lock" for="login-pass"></label>
                        </div>

                        <div class="control-group">
                            <input type="email" class="login-field" value="" placeholder="Password LukaBapak" id="login-pass" />
                            <label class="login-field-icon fui-lock" for="login-pass"></label>
                        </div>

                        <div class="control-group">
                            <input type="text" class="login-field" value="" placeholder="Kode Referral" id="login-pass" />>
                                                            <label class="login-field-icon fui-lock" for="login-pass"></label>
                        </div>

                        <div class="control-group">
                            <div>Dengan klik daftar, kamu telah menyetujui <a href="#">Aturan Penggunaan dan Kebijakan
                            Privasi</a> dari LukaBapak </div>
                        </div>
                        <a class="btn btn-primary btn-large btn-block" href="#">Daftar</a>
                        <a class="login-link" href="#">Lost your password?</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;