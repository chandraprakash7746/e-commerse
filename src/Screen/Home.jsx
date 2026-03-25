import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import ProductGrid from "../Component/ProductGrid";
import Crowser from "../Component/Crowser";

const Home = () => {

    // const [showData, setShowData] = useState([]);

    // async function getData(){
    //     const data = await fetch(`https://dummyjson.com/products?limit=30&skip=0`);
    //     const jsonData = await data.json();
    //     console.log("Home api data",jsonData.products);
    //     setShowData(jsonData.products);
    // }
    // useEffect(()=>{
    //     getData();
    // },[])

    return (
        <div>
            {/* <h1>Hello from home screen</h1> */}
            <Navbar></Navbar>
            <Crowser />
            <ProductGrid></ProductGrid>
            {/* {
               showData.map((pObj)=>{
                return(
                    <div>

                    </div>
                )
               }) 
            } */}
        </div>
    )
}
export default Home;



