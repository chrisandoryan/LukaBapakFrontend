import React from 'react'
import {
    Link
} from 'react-router-dom'
import '../../css/auth.css';
import AuthService from '../../services/AuthService';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
    }

    componentWillMount() {
        this.service.isLoggedIn()
            .then(res => {
                this.service.logout()
                    .then(stat => {
                        console.log(stat);
                    });
            });
        this.props.history.replace('/');
    }

    render() {
        return (
            <div>Bye</div>
        )
    }
}

export default Logout;