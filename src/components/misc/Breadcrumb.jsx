import React from 'react'
import {
    Link
} from 'react-router-dom'
import CategoryService from '../../services/CategoryService';


class Crumb extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        const kat = this.props.kategori
        return (
            <React.Fragment>
            <li><a href="">{this.props.kategori.name}</a></li>
            {
                kat.parent != undefined ? (
                    <Crumb kategori={kat.parent}></Crumb>
                ) : (null)
            }
            </React.Fragment>
        )
    }
}

class Breadcrumb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
        console.log('TES123', this.props.kategori);
        this.categoryService = new CategoryService();
    }

    componentDidMount() {
        // this.setState({ categories: this.props.kategori });
        console.log('WOOOOOO1', this.props.kategori);
        // this.categoryService.getNestedCategories(this.props.kategori.uuid)
        //     .then(res => {
        //         console.log('ubaba', res);
        //     })
        //     .catch(err => {
        //         alert(err.message)
        //     })
    }

    componentDidUpdate() {
        // this.setState({ categories: this.props.kategori });
        console.log('WOOOOOO2', this.props.kategori);
        // this.categoryService.getNestedCategories(this.props.kategori.uuid)
        //     .then(res => {
        //         console.log('ubaba', res.data);
        //         this.setState()
        //     })
        //     .catch(err => {
        //         alert(err.message)
        //     })
    }

    // filterName(a) {
    //     if (a.parent) {
    //         if (Array.isArray(a.parent)) {
    //             a.parent = a.children.filter(this.filterName);
    //         }
    //         return true;
    //     }
    // }

    render() {
        const kat = this.props.kategori;
        console.log('uyeeee', kat);
        // alert(kat.parent != undefined);
        // console.log('kat', kat.children == undefined);
        return (
            <div>
                <ul class="breadcrumbs">
                    <li><a href="">Home</a></li>
                    <li><a href="">{this.props.kategori.name}</a></li>
                    {
                        kat.parent != undefined ? (
                            <Crumb kategori={this.props.kategori.parent}></Crumb>
                        ) : (null)
                    }
                </ul>
            </div>
        )
    }

}

export default Breadcrumb;