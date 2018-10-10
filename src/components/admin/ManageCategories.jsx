import React from 'react'
import {
    Link
} from 'react-router-dom'
import axios from 'axios'
import CategoryService from '../../services/CategoryService';

const APIcategories = 'http://localhost:8000/api/categories';

class ManageCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent_categories: [],
            dropdownCategorySelected: '',
        }
        this.handleDropDownCategoryChange = this.handleDropDownCategoryChange.bind(this);
        this.service = new CategoryService();
        this.handleCategoryInsert = this.handleCategoryInsert.bind(this);
    }

    handleDropDownCategoryChange(e) {
        // alert(e.target.value);
        this.setState({ dropdownCategorySelected: e.target.value });
    }

    handleCategoryInsert(e) {
        e.preventDefault();
        const parent_uuid = e.target._parentCategorySelect.value;
        const category_name = e.target._categoryName.value;
        // alert(parent_uuid + category_name);
        this.service.addCategory(parent_uuid, category_name)
            .then(res => {
                console.log(res);
                alert('Success adding category ' + res.data.data.name);
                this.forceUpdate();
            })
            .catch(err => {
                alert(err.message);
            });
    }

    componentDidMount() {
        axios.get(APIcategories)
            .then(res => {
                const parent_categories = res.data.data;
                this.setState({ parent_categories });
            });
    }

    handleCategoryDelete(e) {
        const uuid = e.target.value;
        // alert(uuid);
        this.service.deleteCategory(uuid)
            .then(res => {
                console.log(res);
                alert("Success!");
                axios.get(APIcategories)
                    .then(res => {
                        const parent_categories = res.data.data;
                        this.setState({ parent_categories });
                    });
            })
            .catch(err => {
                alert(err.message);
            })

    }

    render() {
        return (
            <div className="mainContent">
                <form action method="GET" name="listForm" className="form scrollX">
                    <div className="formHeader row">
                        <h2 className="text-1 fl">Available Categories</h2>
                        {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div> */}
                    </div>
                    <div className="table">
                        <div className="row bg-1">
                            <div className="cell cell-50 text-center text-fff">No.</div>
                            <div className="cell cell-100 text-center text-fff">UUID</div>
                            <div className="cell cell-100 text-center text-fff">Parent Category</div>
                            <div className="cell cell-100 text-center text-fff">Category</div>
                            {/* <div className="cell cell-100 text-center text-fff"><input className="checkbox checkAll" name="statusAll" target=".status" type="checkbox" /></div> */}
                            <div className="cell cell-100 text-center text-fff">EDIT</div>
                        </div>
                        {/*   BEGIN LOOP */}
                        {
                            this.state.parent_categories.map((data, index) => {
                                console.log(data);
                                return (
                                    <ul>
                                        <li className="row">
                                            <div className="cell cell-50 text-center">{index + 1}</div>
                                            <div className="cell cell-100 text-center">{data.uuid}</div>
                                            <div className="cell cell-100 text-center">
                                                {data.name}
                                            </div>
                                            <div className="cell cell-100 text-center"><a href>{data.name}</a></div>
                                            <div className="cell cell-100 text-center">
                                                <button value={data.uuid} onClick={this.handleCategoryDelete.bind(this)}>Remove</button>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                        {/*   END LOOP */}
                    </div>
                </form>
                <br />
                {/* CATE LIST    */}
                {/* <form action method="GET" name="listForm" className="form scrollX">
                <div className="formHeader row">
                    <h2 className="text-1 fl">Product List</h2>
                    {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div>
                </div>
                <div className="table">
                    <div className="row bg-1">
                        <div className="cell cell-50 text-center text-fff">ID</div>
                        <div className="cell cell-100 text-center text-fff">PARENT</div>
                        <div className="cell cell-100p text-fff">NAME</div>
                        <div className="cell cell-50 text-center text-fff">RANK</div>
                        <div className="cell cell-50"><input className="checkbox caretAll" type="checkbox" /></div>
                        <div className="cell cell-100 text-center text-fff">EDIT</div>
                    </div>
                    {/*    BEGIN LOOP 
                    <ul>
                        <li className="row">
                            <div className="cell cell-50 text-center">1</div>
                            <div className="cell cell-100 text-center">0</div>
                            <div className="cell cell-100p"><a href>CATE 1</a></div>
                            <div className="cell cell-50 text-center"><input name="rank[]" className="inputNumber" type="number" /></div>
                            <div className="cell cell-50 text-center"><span className="fa fa-caret-down btnCaret" /></div>
                            <div className="cell cell-100 text-center">
                                <a href className="btnEdit fa fa-pencil bg-1 text-fff" /><a href className="btnRemove fa fa-remove bg-1 text-fff" onclick="return confirm(&quot;Do you really want to remove it ?&quot;)" />
                            </div>
                            <ul className="sublist">
                                <li className="row">
                                    <div className="cell cell-50 text-center">ID</div>
                                    <div className="cell cell-100 text-center">PARENT</div>
                                    <div className="cell cell-100p"><a href>PRODUCT 2</a></div>
                                    <div className="cell cell-50 text-center"><span className="fa fa-caret-down btnCaret" /></div>
                                    <div className="cell cell-100 text-center">
                                        <a href className="btnEdit fa fa-pencil bg-1 text-fff" /><a href className="btnRemove fa fa-remove bg-1 text-fff" onclick="return confirm(&quot;Do you really want to remove it ?&quot;)" />
                                    </div>
                                    <ul className="sublist">
                                        <li>
                                            <div className="cell cell-50 text-center">ID</div>
                                            <div className="cell cell-100 text-center">PARENT</div>
                                            <div className="cell cell-100p"><a href>PRODUCT 2</a></div>
                                            <div className="cell cell-50" />
                                            <div className="cell cell-100 text-center">
                                                <a href className="btnEdit fa fa-pencil bg-1 text-fff" /><a href className="btnRemove fa fa-remove bg-1 text-fff" onclick="return confirm(&quot;Do you really want to remove it ?&quot;)" />
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {/*    END LOOP 
                </div>
            </form> */}
                {/* DETAIL FORM */}
                <form action method="POST" encType="multipart/form-data" className="form" onSubmit={this.handleCategoryInsert}>
                    <div className="formHeader row">
                        <h2 className="text-1 fl">Add New Category</h2>
                        {/* <div className="fr">
                        <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                    </div> */}
                    </div>
                    <div className="formBody row">
                        <div className="column s-6">
                            <label className="inputGroup">
                                <h3>Category Name</h3>
                                <br />
                                <input name="_categoryName" type="text" />
                            </label>
                            <label className="inputGroup">
                                <h3>Parent Category</h3>
                                <br />
                                <select name="_parentCategorySelect" onChange={this.handleDropDownCategoryChange} defaultValue={this.state.dropdownCategorySelected}>
                                    <option value="null">NULL (Set as Parent)</option>
                                    {
                                        this.state.parent_categories.map((data, index) => {
                                            return (
                                                <option value={data.uuid}>{data.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                            <label className="inputGroup">
                                <input type="submit" value="Add" />
                            </label>
                        </div>
                    </div>
                </form>
                {/* <div id="pagination">
                <ul className="pagination list-inline text-center">
                    <li><a href="?page=1">1</a></li>
                    <li className="is-active"><a href="?page=2">2</a></li>
                    <li><a href="?page=3">3</a></li>
                    <li><a href="?page=4">4</a></li>
                    <li><a href="?page=5">5</a></li>
                </ul>
            </div> */}
            </div>
        )
    }
}

export default ManageCategories;
