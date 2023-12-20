import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Cards from "../components/Cards";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Swiper from "../components/Swiper";
import Footer from "../components/Footer";



export default function Home(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [products,setProducts] = useState([]);
    useEffect(() => {
        getAllProducts();
    })
    const getAllProducts = () =>{
        fetch(`http://localhost:9000/products`)
        .then(res=>res.json())
        .then(products=>setProducts(products))
    }
    return(
        <>
            <ResponsiveAppBar />
            <Swiper />
            <div className="container">
             <Cards/>
            </div>
            <Footer />
            
        </>
    )
}