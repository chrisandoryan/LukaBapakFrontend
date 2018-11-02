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
        this.service.isLoggedIn()
            .then(res => {
                if (res !== false) {
                    this.props.history.push("/");
                }
            });
    }

    checkUsername(e) {
        let username = e.target.value;
        // alert(username);
        this.service.checkUsername(username)
            .then(res => {
                console.log(res.data);
                if (res.data.status == false) {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                alert(err.message);
            })
    }

    handleRegister(e) {
        e.preventDefault();

        let name = e.target.name.value;
        let email = e.target.email.value;
        let gender = e.target[2].checked ? e.target[2].value : e.target[3].value;
        let username = e.target.username.value;
        let password = e.target.password.value;
        let phone = e.target.phone.value;

        // alert(email+"email");
        // alert(username+"username");
        // alert(password+"pass");
        // alert(gender+"gender");
        // alert(phone+"phone");
        // alert(name+"name");

        // this.service.register(username, name, password, email, gender).then(registered_data => {
        //     this.setState({data: registered_data});
        // });

        this.service.register(username, name, password, email, gender, phone).then(() => {
            this.props.history.replace('/login');
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
                            <input type="text" className="login-field" placeholder="Nama Lengkap" id="login-name" name="name" />
                            <label className="login-field-icon fui-user" htmlFor="login-name"></label>
                        </div>

                        <div className="control-group">
                            <input type="text" className="login-field" placeholder="Email" id="login-pass" name="email" />
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                        </div>

                        <div className="control-group">
                            <input type="text" className="login-field" placeholder="No Handphone" id="login-pass" name="phone" />
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                        </div>
                        <br/>
                        <br/>
                        <div style={{marginRight: 190}}>
                            <span className="check-gender">
                                <input type="radio" name="gender" value="male" defaultChecked /> Laki-laki
                            </span>
                            <span className="check-gender">
                                <input type="radio" name="gender" value="female" /> Perempuan
                            </span>
                        </div>
                        <br/>
                        <br/>
                        <br />
                        <div className="control-group">
                            <input type="text" className="login-field" placeholder="Lukabapak.com/username" id="login-pass" name="username" onBlur={this.checkUsername.bind(this)}/>
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                        </div>

                        <div className="control-group">
                            <input type="password" className="login-field" placeholder="Password LukaBapak" id="login-pass" name="password"/>
                            <label className="login-field-icon fui-lock" htmlFor="login-pass"></label>
                        </div>

                        <div className="control-group">
                            <div>Dengan klik daftar, kamu telah menyetujui <a href="#">Aturan Penggunaan dan Kebijakan
                            Privasi</a> dari LukaBapak </div>
                        </div>

                        <div className="control-group">
                            <input type="submit" className="btn btn-primary btn-large btn-block" value="Daftar" />
                        </div>
                        <Link className="login-link" to="/login">Sudah punya akun?</Link>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;