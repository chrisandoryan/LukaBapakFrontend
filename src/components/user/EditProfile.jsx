import React from 'react'
import {
    Link
} from 'react-router-dom'
import Header from '../shared/Header';
import GridProduct from '../products/GridProduct';
import PelapakService from '../../services/PelapakService';
import AuthService from '../../services/AuthService';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            user: {}
        }
        this.pelapakService = new PelapakService();
        this.authService = new AuthService();
    }

    componentDidMount() {
        this.authService.isLoggedIn()
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
                    alert("Please login to update your profile");
                    this.props.history.push("/");
                    // alert(1);
                    // console.log(this.state.user);
                }
            });
    }

    changePersonalProfile(e) {
        e.preventDefault();
        let username = e.target.name.value;
        let bdate = e.target.birthdate.value;
        let gender = e.target.gender.value;
        let password = e.target.password.value;

        // alert(username+bdate+gender+password);
    }

    changeLapakInformation(e) {
        e.preventDefault();
        let desc = e.target.description.value;
        let note = e.target.note.value;

    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <div className="content wrapper">
                    <div className="content-box header"></div>
                    <div class="content-box product-options">
                        <h3><b>{this.state.user.name}</b></h3>
                        <br />
                        <div>
                            <h3>Username: <b>{this.state.user.username}</b></h3>
                            <h3>100% (1231 feedback)</h3>
                            <br />
                            <br />
                            <h2>Catatan Pelapak</h2>
                            <br />
                            <h3>{this.state.user.lapak_note}</h3>
                            {/* <h3>Kepuasan pelanggan adalah kepuasan kami, kepuasan kami adalah peningkatan terhadap produk produk kami. Semangat TPA</h3> */}
                        </div>
                        <br />
                        <br />
                    </div>
                    <div className="content-box product-view-wrapper">
                    <form onSubmit={this.changePersonalProfile.bind(this)}>
                        <h1>Ubah Data Diri</h1>
                        <br/>
                        <div>
                            <p>Nama</p>
                            <input type="text" name="name" id="" placeholder="Nama"/>
                        </div>
                        <br/>
                        <div>
                            <p>Tanggal Lahir</p>
                            <input type="date" name="birthdate"/>
                        </div>
                        <br/>
                        <div>
                            <p>Jenis Kelamin</p>
                            <select name="gender" id="">
                             <option value="male">Male</option>
                             <option value="female">Female</option>
                            </select>
                        </div>
                        <br/>
                        <div>
                            <p>Password</p>
                            <input type="password" name="password" id="" placeholder="password"/>
                        </div>
                        <button>Save Changes</button>
                    </form>
                        <br/>
                    <form onSubmit={this.changeLapakInformation.bind(this)}>
                        <h1>Ubah Data Lapak</h1>
                        <br/>
                        <div>
                            <p>Header Photo</p>
                            <input type="file" name="" id=""/>
                        </div>
                        <br/>
                        <div>
                            <p>Deskripsi</p>
                            <textarea rows={20} cols={5} name="description" id="" placeholder="Deskripsi lapak anda"></textarea>
                        </div>
                        <br/>
                        <div>
                            <p>Notes</p>
                            <textarea rows={20} cols={5} name="note" id="" placeholder="Catatan Pelapak"></textarea>
                        </div>
                        <br/>
                        <button>Save Changes</button>
                    </form>
                    <br/>
                    <br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProfile;