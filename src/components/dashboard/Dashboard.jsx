import React from 'react'
import {
    Link
} from 'react-router-dom'
import { Header, Footer } from '../shared';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header />
            
            <Footer />
        )
    }
}

export default Dashboard;
