import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard"
import ProductDetail from "./components/products/ProductDetail";
import ExploreProductsByKeyword from "./components/products/ExploreProductsByKeyword";
import ExploreProductsByCategory from "./components/products/ExploreProductsByCategory";
import AdminPanel from "./components/admin/AdminPanel";
import Logout from "./components/auth/Logout";
import FavoriteProducts from "./components/user/FavoriteProducts";
import Cart from "./components/user/Cart";
import PurchasePayment from "./components/transaction/PurchasePayment";
import Profile from "./components/user/Profile";
import AddProduct from "./components/products/AddProduct";
import ExploreProductsByPromo from "./components/products/ExploreProductsByPromo";
import Order from "./components/user/Order"

export default [
    { path: "/", component : Dashboard } ,
    { path: "/login", component : Login } ,
    { path: "/register", component : Register } ,
    { path: "/products/:uuid", component : ProductDetail } ,
    { path: "/products/category/:uuid", component    : ExploreProductsByCategory } ,
    { path: "/products/search/:keyword", component : ExploreProductsByKeyword } ,
    { path: "/admin", component : AdminPanel } ,
    { path: "/logout", component : Logout } ,
    { path: "/favorites", component : FavoriteProducts } ,
    { path: "/cart", component : Cart } ,
    { path: "/payment", component : PurchasePayment } ,
    { path: "/profile", component : Profile } ,
    { path: "/addproduct", component : AddProduct } ,
    { path: "/promo/:promoid", component : ExploreProductsByPromo } ,
    { path: "/order", component : Order } ,
    // { path: "/products", component : ProductPage } ,
];