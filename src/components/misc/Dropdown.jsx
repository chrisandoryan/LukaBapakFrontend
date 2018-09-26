import React from 'react'
import {
    Link
} from 'react-router-dom'
import axios from 'axios'

const APIcategories = 'http://localhost:8000/api/categories';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent_categories: [],
            hover: [],
            prevHoverIndex: -1
        }
        // this.showSubMenu = this.showSubMenu.bind(this);
        // this.hideSubMenu = this.hideSubMenu.bind(this);
    }

    showSubMenu(index, event) {
        // event.preventDefault();
        const hover = this.state.hover
        hover[index] = true;
        this.setState({ hover });
        console.log(this.state.prevHoverIndex);
    }

    hideSubMenu(index, event) {
        for(let i = 0; i < this.state.parent_categories.length; i++) {
            this.state.hover[i] = false;
        }
        const hover = this.state.hover
        hover[index] = false;
        this.setState({ hover });
        console.log(this.state.prevHoverIndex);
    }

    componentDidMount() {
        axios.get(APIcategories)
            .then(res => {
                const parent_categories = res.data.data;
                // console.log(parent_categories);
                this.setState({ parent_categories });
                for(let i = 0; i < this.state.parent_categories.length; i++) {
                    this.state.hover[i] = false;
                }
            })
    }

    render() {
        return (
            <div className="dropdown-content show">
                {
                    this.state.parent_categories.map((name, index) => {
                    //console.log(this.state.hover[index]);
                    return (
                        <div key={index}>
                            {
                                this.state.hover[index] ? (
                                    <div className="dropdown-content-child show">
                                        {name['subcategory'].map((subname, subindex) => {
                                            // console.log(subname['name']);
                                            return (
                                                <a onMouseLeave={this.hideSubMenu.bind(this, index)} key={subindex}>{subname['name']}</a>
                                            );
                                        })}
                                    </div>
                                ) : (
                                        null
                                    )
                            }
                            <a key={index} onMouseEnter={this.showSubMenu.bind(this, index)}>{name.name}</a>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default Dropdown;
