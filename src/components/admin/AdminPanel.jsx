import React from 'react'
import {
    Link
} from 'react-router-dom'
import '../../css/admin.css'

class AdminPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                {/*     SIDE AREA */}
                <div className="sideArea">
                    <div className="avatar">
                        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCNOdyoIXDDBztO_GC8MFLmG_p6lZ2lTDh1ZnxSDawl1TZY_Zw" alt /> */}
                        <div className="avatarName"><h2>LukaBapak Administrator</h2></div>
                    </div>
                    <ul className="sideMenu">
                        {/* <li><a href="javascript:void(0)" className="has-submenu"><span className="fa fa-table" />Products</a>
                            <ul className="submenu">
                                <li><a href="index.php?c=product&a=list01"><span className="fa fa-list" />Product List</a></li>
                                <li><a href="index.php?c=product&a=list02"><span className="fa fa-tags" />Category List</a></li>
                            </ul>
                        </li> */}
                        <li><a href="menu_list.php"><span className="fa fa-sitemap" />Categories</a></li>
                        <li><a href="invoice_list.php"><span className="fa fa-money" />Promo</a></li>
                        <li><a href="user_list.php"><span className="fa fa-user-o" />Vouchers</a></li>
                        <li><a href="contact_list.php"><span className="fa fa-envelope-o" />Admins</a></li>
                    </ul>
                </div>
                {/*     SIDE AREA */}
                <div className="mainArea">
                    {/* BEGIN NAV */}
                    <nav className="navTop row">
                        <div className="account fr">
                            <div className="name has-submenu">John Doe</div>
                        </div>
                    </nav>
                    {/* END NAV */}
                    {/* CONTAINER  */}
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
                                <ul>
                                    <li className="row">
                                        <div className="cell cell-50 text-center">1</div>
                                        <div className="cell cell-100 text-center">uada-dhjdask-jdiaod-dmchyuaec/div>
                                        <div className="cell cell-100 text-center">
                                            Bola
                                        </div>
                                        <div className="cell cell-100 text-center"><a href>Pompa Bola</a></div>
                                        {/* <div className="cell cell-100 text-center">
                                            <input className="status" name="status" defaultValue={0} type="hidden" />
                                            <input className="btnSwitch status" name="status" type="checkbox" />
                                        </div> */}
                                        {/* <div className="cell cell-100 text-center">
                                            <a href className="btnRemove fa fa-remove bg-1 text-fff" onclick="return confirm(&quot;Do you really want to remove it ?&quot;)" />
                                        </div> */}
                                    </li>
                                </ul>
                                {/*   END LOOP */}
                            </div>
                        </form>
                        {/* CATE LIST    */}
                        <form action method="GET" name="listForm" className="form scrollX">
                            <div className="formHeader row">
                                <h2 className="text-1 fl">Product List</h2>
                                {/* <div className="fr">
                                    <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                                </div> */}
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
                                {/*    BEGIN LOOP */}
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
                                {/*    END LOOP */}
                            </div>
                        </form>
                        {/* DETAIL FORM */}
                        <form action method="POST" encType="multipart/form-data" className="form">
                            <div className="formHeader row">
                                <h2 className="text-1 fl">Product Detail</h2>
                                {/* <div className="fr">
                                    <button type="submit" className="btnSave bg-1 text-fff text-bold fr">SAVE</button><a href className="btnAdd fa fa-plus bg-1 text-fff" />
                                </div> */}
                            </div>
                            <div className="formBody row">
                                <div className="column s-6">
                                    <label className="inputGroup">
                                        <span>Name</span>
                                        <span><input name="name" type="text" /></span>
                                    </label>
                                    <label className="inputGroup">
                                        <span>Code</span>
                                        <span><input name="code" type="text" /></span>
                                    </label>
                                    <label className="inputGroup">
                                        <span>Price</span>
                                        <span><input name="price" type="text" /></span>
                                    </label>
                                    <label className="inputGroup">
                                        <span>Note</span>
                                        <span><input name="note" type="text" /></span>
                                    </label>
                                </div>
                                <div className="column s-6">
                                    <label className="inputGroup">
                                        <span>Category</span>
                                        <span>
                                            <select name="cate">
                                                <option value="cate01">Category01</option>
                                                <option value="cate02">Category02</option>
                                            </select>
                                            <i className="btnNewInput fa fa-plus bg-1 text-fff" />
                                        </span>
                                    </label>
                                    <label className="inputGroup hide">
                                        <span>Brand</span>
                                        <span>
                                            <input name="cate" type="text" />
                                            <select name="brand">
                                                <option value="cate01">Brand01</option>
                                                <option value="cate02">Brand02</option>
                                            </select>
                                        </span>
                                    </label>
                                    <label className="inputGroup">
                                        <span>Image</span>
                                        <input name="img" defaultValue="src" type="hidden" />
                                        <span>
                                            <input name="img" onchange="getImg(this)" multiple type="file" />
                                            <img src="http://bookstore.crunchpress.com/wp-content/uploads/2013/05/b2.jpg" alt width={50} />
                                        </span>
                                    </label>
                                </div>
                                <div className="column">
                                    <label className="inputGroup">
                                        <span>Description</span>
                                        <textarea name="description" defaultValue={""} />
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
                    {/* END CONTAINER  */}
                </div>
            </div>
        )
    }
}

export default AdminPanel;
