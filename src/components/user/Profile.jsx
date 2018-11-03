import React from 'react'
import {
    Link
} from 'react-router-dom'
import Header from '../shared/Header';
import GridProduct from '../products/GridProduct';
import PelapakService from '../../services/PelapakService';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            user: {}
        }
        this.pelapakService = new PelapakService();
    }

    componentDidMount() {
        this.pelapakService.getPelapak(this.props.match.params.uuid)
            .then(res => {
                console.log(res.data[0]);
                this.setState({user: res.data[0], products: res.data[0].products})
                console.log('prod', this.state.products)
            })
            .catch(err => {
                alert(err.message);
            })
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
                        </div>
                        <br />
                        <br />
                    </div>
                    <div className="content-box product-view-wrapper">
                        <img src={this.state.user.header_photo} alt="Header Photo" />
                        <div className="header">{this.state.user.name}</div>
                        {/* <h4>Menjual Berbagai Jenis barang yang bisa meledak</h4> */}
                        <h4>{this.state.user.description}</h4>
                        {
                            this.state.products.map((data, index) => {
                                console.log('d', data);
                                return (
                                    // <div>hai</div>
                                    <GridProduct hoverable="false" product={data} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;