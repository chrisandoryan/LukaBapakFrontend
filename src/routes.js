import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard"
import ProductDetail from "./components/products/ProductDetail";
import ExploreProducts from "./components/products/ExploreProducts";

export default [
    { path: "/", component : Dashboard } ,
    { path: "/login", component : Login } ,
    { path: "/register", component : Register } ,
    { path: "/products/:uuid", component : ProductDetail } ,
    { path: "/products/search/:keyword", component : ExploreProducts } ,
    // { path: "/categories/:id/detail", component : CategoryPage } ,
    // { path: "/products", component : ProductPage } ,
];