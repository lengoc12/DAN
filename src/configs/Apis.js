import axios from "axios"

export let endpoints = {
    "products": (categoryId) => `/categories/${categoryId}/products/`,
    'categories': '/categories/',
    'slides': '/slides/',
    'newproducts': '/newproducts/',
    'sale': '/sale/',
}
export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})