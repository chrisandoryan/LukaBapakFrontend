import React from 'react'
import {
    Link
} from 'react-router-dom'
import axios from 'axios'

const APIcategories = 'http://localhost:8000/api/categories';

class Subdropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: {},
            hasChild: false
        }
    }

    componentDidMount() {
        this.setState({ categories: this.props.child })
        console.log('hoo', this.props.child)
    }

    render() {
        return (
            <div className="dropdown-content-child show">
                {
                    this.props.child.map((subname, subindex) => {
                        console.log('subname.name')
                        return (
                            <Link to={`/products/category/${subname['uuid']}`} key={subindex}>{subname['name']}</Link>
                        );
                    })
                }
            </div >
        )
    }
}

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent_categories: [],
            hover: [],
            prevHoverIndex: -1,
            doRender: false,
            selectedChildren: [],
        }
        this.forceUpdate();
        // this.showSubMenu = this.showSubMenu.bind(this);
        // this.hideSubMenu = this.hideSubMenu.bind(this);
    }


    showSubMenu(index, event) {
        // event.preventDefault();
        // console.log(this.state.parent_categories[index])
        var child = this.state.parent_categories[index].subcategory.length > 0 ? this.state.parent_categories[index].subcategory : []
        this.setState({ selectedChildren: child, doRender: true })
        this.hideSubMenu(index);
        console.log('uaa', this.state.selectedChildren)
        const hover = this.state.hover
        hover[index] = true;
        this.setState({ hover });
        console.log(this.state.prevHoverIndex);

    }

    hideSubMenu(index, event) {
        for (let i = 0; i < this.state.parent_categories.length; i++) {
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
                console.log(parent_categories);
                this.setState({ parent_categories });
                for (let i = 0; i < this.state.parent_categories.length; i++) {
                    this.state.hover[i] = false;
                }
            });
    }

    componentWillUnmount() {
        this.setState({ doRender: false })
    }

    render() {
        return (
            <div className="dropdown-content show">
                {
                    this.state.parent_categories.map((name, index) => {
                        //console.log(this.state.hover[index]);
                        return (
                            <div key={index}>
                                <Link key={index} to={`/products/category/${name.uuid}`} onMouseEnter={this.showSubMenu.bind(this, index)}>{name.name}</Link>
                            </div>
                        );
                    })}
            {this.state.selectedChildren.length > 0 ? (<Subdropdown child={this.state.selectedChildren}></Subdropdown>) : (null)}
            </div>
        )
    }
}

export default Dropdown;
