import React from 'react'
import {
    Link
} from 'react-router-dom'
import GridProduct from './GridProduct';
import axios from 'axios';

const APIPromos = 'http://localhost:8000/api/promotions';

class DisplayPromotedProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promos: []
        }
    }

    componentDidMount() {
        axios.get(APIPromos)
            .then(res => {
                const promos = res.data.data
                this.setState({ promos });
                // console.log(this.state.promos);
            });
    }

    render() {
        return (
            <div>
            {
                this.state.promos.map((data, index) => {
                    return (
                        <div key={index} className="content-promo">
                            <div className="small-title header">
                                <b>{ data.name }</b>
                                <Link to={`/promo/${data.id}`} style={{ float: 'right' }}><button style={{ float: 'right' }}>Lihat Semua</button></Link>
                            </div>
                            {
                                data.products.map((product, productIndex) => {
                                    console.log(product);
                                    return (
                                        <GridProduct product={product}/>
                                    );
                                })
                            }
                        </div>
                    )
                })
            }
            </div>
        );
    }
}

export default DisplayPromotedProducts;
