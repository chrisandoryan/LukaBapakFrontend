import React from 'react'
import {
    Link
} from 'react-router-dom'
import '../../css/auth.css';
import AuthService from '../../services/AuthService';
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.service = new AuthService();
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentWillMount() {
        if (this.service.isLoggedIn()) {
            this.props.history.replace('/');
        }
    }

    handleRegister(e) {
        e.preventDefault();

        let name = e.target[0].value;
        let email = e.target[1].value;
        let gender = e.target[2].checked ? e.target[2].value : e.target[3].value;
        let username = e.target[4].value;
        let password = e.target[5].value;

        // this.service.register(username, name, password, email, gender).then(registered_data => {
        //     this.setState({data: registered_data});
        // });

        this.service.register(username, name, password, email, gender).then(() => {
            if (this.service.isLoggedIn()) {
                this.props.history.replace('/');
            }
        });
    }

    render() {
        return (
            <div className="login">
                <div className="login-screen">
                    <div className="app-title">
                        <h3>Daftar akun baru sekarang</h3>
                    </div>
                    <br />
                    <form onSubmit={this.handleRegister} className="login-form">
                        <div className="control-group">
                            <input type="text" className="login-field" placeholder="Nama Lengkap" id="login-name" />
                            <label className="login-field-icon fui-user" htmlFor="login-name"></label>
                        </div>

                        <div className="control-group">
                            <input type="email" className="login-field" placeholder="Email/No Handphone" id="login-pass" />
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                        </div>
                        <div >
                            <span className="check-gender">
                                <input type="radio" name="gender" value="male" defaultChecked /> Laki-laki
                            </span>
                            <span className="check-gender">
                                <input type="radio" name="gender" value="female" /> Perempuan
                            </span>
                        </div>
                        <br />
                        <div className="control-group">
                            <input type="text" className="login-field" placeholder="Lukabapak.com/username" id="login-pass" />
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                        </div>

                        <div className="control-group">
                            <input type="password" className="login-field" placeholder="Password LukaBapak" id="login-pass" />
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                        </div>

                        <div className="control-group">
                            <div>Dengan klik daftar, kamu telah menyetujui <a href="#">Aturan Penggunaan dan Kebijakan
                            Privasi</a> dari LukaBapak </div>
                        </div>

                        <div className="control-group">
                            <input type="submit" className="btn btn-primary btn-large btn-block" href="#" value="Daftar" />
                        </div>
                        <a className="login-link" href="/login">Sudah punya akun?</a>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;