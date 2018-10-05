import React from 'react'
import {
    Link
} from 'react-router-dom'
import ProductService from '../../services/ProductService';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.service = new ProductService();
    }

    handleAddProduct(e) {
        e.preventDefault();
        const name = e.target._name.value;
        const stock = e.target._stock.value;
        const price = e.target._price.value;
        const weight = e.target._weight.value;
        const condition = e.target._condition.value;
        const description = e.target._description.value;
        const city = e.target._city.value;
        const province = e.target._province.value;
        const category = e.target._category.value;

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

        this.service.addProduct(d)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                alert(err.message);
            });
    }

    render() {
        return (
            <div className="content wrapper">
                <form action="">
                    <h2>Add Product</h2>
                    <br />
                    <br />
                    <p>Category</p>
                    <select name="_category" id="">
                        <option value=""></option>
                    </select>
                    <br />
                    <br />
                    <p>Product Name</p>
                    <input type="text" placeholder="Product Name" name="_name"/>
                    <p>Stock</p>
                    <input type="text" placeholder="Stock" name="_stock"/>
                    <p>Price</p>
                    Rp. <input type="text" placeholder="Price" name="_price"/>
                    <p>Weight</p>
                    <input type="text" placeholder="Weight" name="_weight"/> gram
                    <br />
                    <p>Product Condition</p>
                    <select name="_condition" id="">
                        <option selected value="new">New</option>
                        <option selected value="old">Old</option>
                    </select>
                    <br />
                    <br />
                    <p>Description</p>
                    <textarea name="_description" id="" cols="30" rows="10" placeholder="Description"></textarea>
                    <br />
                    <br />
                    <p>City</p>
                    <select name="_city" id="">
                        <option value=""></option>
                    </select>
                    <br />
                    <br />
                    <p>Province</p>
                    <select name="_province" id="">
                        <option value=""></option>
                    </select>
                    <br />
                    <br />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddProduct;
