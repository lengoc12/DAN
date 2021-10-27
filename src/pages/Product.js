import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { useParams } from "react-router"
import Apis, { endpoints } from "../configs/Apis";
import ProductCard from "../components/ProductCard";

export default function Product() {
    const [products, setProducts] = useState([])
    const { categoryId } = useParams()

    useEffect(() => {
        let loadProduct = async () => {
            try {
                let res = await Apis.get(endpoints['products'](categoryId))
                setProducts(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        loadProduct()
    }, [])

    return (
        <>
        <h1 className="text-center text-danger">DANH MUC BAI HOC CUA KHOA HOC</h1>

        <Row>
            {products.map(l => <ProductCard obj={l} type="product" />)}
        </Row>
        </>
    )
}