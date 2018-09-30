import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard"
import ProductDetail from "./components/products/ProductDetail";
import ExploreProducts from "./components/products/ExploreProducts";
import AdminPanel from "./components/admin/AdminPanel";
import Logout from "./components/auth/Logout";
import FavoriteProducts from "./components/user/FavoriteProducts";

export default [
    { path: "/", component : Dashboard } ,
    { path: "/login", component : Login } ,
    { path: "/register", component : Register } ,
    { path: "/products/:uuid", component : ProductDetail } ,
    { path: "/products/search/:keyword", component : ExploreProducts } ,
    { path: "/admin", component : AdminPanel } ,
    { path: "/logout", component : Logout } ,
    { path: "/favorites", component : FavoriteProducts } ,
    // { path: "/products", component : ProductPage } ,
];