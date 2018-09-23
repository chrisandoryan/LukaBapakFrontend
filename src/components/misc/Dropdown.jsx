import React from 'react'
import {
    Link
} from 'react-router-dom'
import axios from 'axios'

const APIcategories = 'http://localhost:8000/api/categories';

class Dropdown extends React.Component {
    state = {
        parent_categories: []
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        axios.get(APIcategories)
            .then(res => {
                const parent_categories = res.data.data;
                console.log(parent_categories);
                this.setState({ parent_categories });
            })
    }

    render() {
        return (
            <div className="dropdown-content show">
                {this.state.parent_categories.map(function (name, index) {
                    // console.log(name['name']);
                    return (
                        <div class="dropdown-content-child">
                            {/* loop the subcategories here */}
                            <a href="#">Link A</a>
                            <a href="#">Link B</a>
                            <a href="#">Link C</a>
                        </div>
                        <a key={index}>{name['name']}</a>
                    );
                })}
                {/* <a href="#">Link 1</a>
                <div className="dropdown-content-child show">
                    <a href="#">Link A</a>
                    <a href="#">Link B</a>
                    <a href="#">Link C</a>
                    <a href="#">Link C</a>
                </div>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a> */}
            </div>
        )
    }
}

export default Dropdown;
