import { Login, Register } from "./components/auth";
import { Header, Footer } from "./components/shared";

export default [
    { path: "/", component : DashboardPage } ,
    { path: "/categories", component : CategoryPage } ,
    { path: "/categories/insert", component : InsertCategoryPage } ,
    { path: "/categories/:id/detail", component : CategoryPage } ,
    { path: "/products", component : ProductPage } ,
];