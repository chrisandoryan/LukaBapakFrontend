import React from 'react'
import {
    Link
} from 'react-router-dom'
import ProductService from '../../services/ProductService';
import CategoryService from '../../services/CategoryService';
import axios from 'axios'
import OngkirService from '../../services/OngkirService';

const APIcategories = 'http://localhost:8000/api/categories';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.service = new ProductService();
        this.categoryService = new CategoryService();
        this.ongkirService = new OngkirService();
        this.state = {
            parent_categories: [],
            provinces: [],
            cities: [],
            selectedProvince: null,
            image: null,
        }
    }

    componentDidMount() {
        this.categoryService.getAllCategories()
            .then(res => {
                const parent_categories = res.data.data;
                this.setState({ parent_categories });
            })
            .catch(err => {
                alert(err.message);
            })
        this.ongkirService.getProvinces()
            .then(res => {
                const provinces = res.data.rajaongkir.results;
                // console.log(provinces);
                this.setState({ provinces });
            })
        // axios.get()
        //     .then(res => {
        //         const parent_categories = res.data.data;
        //         this.setState({ parent_categories });
        //     });
    }

    handleProvinceChange = (event) => {
        const province_id = event.target.value;
        this.setState({ selectedProvince: province_id });
        this.ongkirService.getCities(province_id)
            .then(res => {
                const cities = res.data.rajaongkir.results;
                console.log(cities);
                this.setState({ cities });
            })
            .catch(err => {
                console.log(err);
            });
    };

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

    handleAddProduct(e) {
        e.preventDefault();
        const name = e.target._name.value;
        const stock = e.target._stock.value;
        const price = e.target._price.value;
        const weight = e.target._weight.value;
        const condition = e.target._condition.value;
        const description = e.target._description.value;
        const city = '1';
        const province = '1';
        const category = e.target._category.value;
        const image = this.state.image;
        const tags = e.target.tags.value;
        alert(tags);

        let d = new FormData();

        d.append('name', name);
        d.append('stock', stock);
        d.append('price', price);
        d.append('weight', weight);
        d.append('condition', condition);
        d.append('description', description);
        d.append('city', city);
        d.append('province', province);
        d.append('category_id', category);
        d.append('image', this.state.image);
        d.append('tags', tags);
        // console.log(this.state.image);
        // console.log(name + stock + price + category);
        this.service.addProduct(d)
            .then(res => {
                console.log(res);
                alert(`Success added ${res.data.data.name}`);
                this.forceUpdate();
            })
            .catch(err => {
                alert(err.message);
            });
    }

    render() {
        return (
            <div className="content wrapper">
                <form onSubmit={this.handleAddProduct.bind(this)}>
                    <h2>Add Product</h2>
                    <br />
                    <br />
                    <p>Category</p>
                    <select name="_category" id="">
                        {
                            this.state.parent_categories.map(category => {
                                return (
                                    // console.log(category);
                                    category.subcategory.map(sub => {
                                        console.log(sub);
                                        return (
                                            <option value={sub.uuid}>{sub.name}</option>
                                        )
                                    })
                                )
                            })
                        }
                    </select>
                    <br />
                    <br />
                    <p>Product Name</p>
                    <input type="text" placeholder="Product Name" name="_name" />
                    <p>Stock</p>
                    <input type="text" placeholder="Stock" name="_stock" />
                    <p>Price</p>
                    Rp. <input type="text" placeholder="Price" name="_price" />
                    <p>Weight</p>
                    <input type="text" placeholder="Weight" name="_weight" /> gram
                    <br />
                    <p>Product Condition</p>
                    <select name="_condition" id="">
                        <option selected value="new">New</option>
                        <option selected value="old">Old</option>
                    </select>
                    <br />
                    <br />
                    <p>Image</p>
                    <input type="file" onChange={this.handleImageUpload.bind(this)}/>
                    <br />
                    <br />
                    <p>Description</p>
                    <textarea name="_description" id="" cols="30" rows="10" placeholder="Description"></textarea>
                    <br />
                    <br />
                    <p>Product Tag</p>
                    <input type="text" name="tags" placeholder="Separate with comma (,)"/>
                    {/* <p>Province</p>
                    <select name="_province" id="" onChange={this.handleProvinceChange.bind(this)}>
                        {
                            this.state.provinces.map(p => {
                                // console.log(p);
                                return (
                                    <option value={p.province_id}>{p.province}</option>
                                )
                            })
                        }
                    </select>
                    <br />
                    <br />
                    <p>City</p>
                    <select name="_city" id="">
                        {
                            this.state.cities.map(c => {
                                return (
                                    <option value={c.city_id}>{c.city_name}</option>
                                )
                            })
                        }
                    </select> */}
                    <br />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddProduct;
