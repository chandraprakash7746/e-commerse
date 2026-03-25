
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const SearchBar = ()=>{
     const [text, setText] = useState("");
        const [suggetion, setSuggetion] = useState([]);
    
        function handleText(e) {
            let inputData = e.target.value.trim();
            console.log(inputData);
            setText(inputData);
        }
    
        async function getData() {
            if (text.length == 0) return;
            let apiData = await fetch(`https://dummyjson.com/products/search?q=${text}`);
            let jsonData = await apiData.json();
            console.log(jsonData.products);
            setSuggetion(jsonData.products);
    
        }
        let timerId = useRef(null);
        useEffect(() => {
            if (timerId.current) {
                clearTimeout(timerId.current);
            }
            timerId.current = setTimeout(() => {
                getData();
            }, 400)
        }, [text])
    return(
        <div className="relative w-87.5">
                <input onChange={handleText} value={text} className="w-full px-4 py-2  border border-gray-300 
                    text-black outline-0 rounded-2xl bg-neutral-200" type="text" />
                <div className="absolute top-12 left-0 w-full bg-white rounded-lg
                     shadow-lg max-h-72 overflow-y-auto z-50">
                 
                    {
                        text.length != 0 && suggetion.map((productObj) => {
                            return (<Link to={`/products/${productObj.id} `}>
                                <p  key={productObj.id} className="px-2 md:px-2 lg:px-5">{productObj.title}</p>
                            </Link>)
                        })
                    }
                </div>
             
            </div>
    )
}
export default SearchBar;