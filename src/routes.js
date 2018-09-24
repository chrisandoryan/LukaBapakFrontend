import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard"

export default [
    { path: "/", component : Dashboard } ,
    { path: "/login", component : Login } ,
    { path: "/register", component : Register } ,
    // { path: "/categories/:id/detail", component : CategoryPage } ,
    // { path: "/products", component : ProductPage } ,
];