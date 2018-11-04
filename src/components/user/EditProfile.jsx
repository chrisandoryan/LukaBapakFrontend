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
            user: {},
            image: {}
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

        let d = new FormData();
        d.append("name", username);
        d.append("birthdate", bdate);
        d.append("gender", gender);
        d.append("username", password);
        d.append("mode", "user");

        this.pelapakService.updateUserProfile(d, this.state.user.uuid)
            .then(res => {
                console.log(res);
                this.componentDidMount();
            })
            .catch(err => {
                alert(err.message);
            })
        // alert(username+bdate+gender+password);
    }

    handleImageUpload(e) {
        e.preventDefault();
        let file = e.target.files[0];
        // if (!file.length) return;
        alert("Uploading");
        this.createImage(file);
    }

    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({image: e.target.result});
        }
        reader.readAsDataURL(file);
    }

    changeLapakInformation(e) {
        e.preventDefault();
        let desc = e.target.description.value;
        let note = e.target.note.value;

        let d = new FormData();
        d.append("description", desc);
        d.append("note", note);
        d.append('image', this.state.image);
        d.append("mode", "lapak");

        this.pelapakService.updateLapakProfile(d, this.state.user.uuid)
            .then(res => {
                console.log(res);
                this.props.history.replace(`/profile/${this.state.user.uuid}`)
                this.componentDidMount();
            })
            .catch(err => {
                alert(err.message);
            })

        // alert(desc+note);

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
                            <input type="file" name="" id="" onChange={this.handleImageUpload.bind(this)}/>
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