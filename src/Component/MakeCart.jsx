import React, { useContext, useState } from "react";
import Rating from "../Icons/Rating";


const MakeCart = ({ data }) => {
    // console.log("Props => ", data)

    const { thumbnail, title, brand, category, price, discountPercentage, rating, id } = data;
    const [count, setCount] = useState(1);
    return (
        <div className="border border-amber-600 w-[80%] m-auto">
            <div className="flex">
                <div><img src={thumbnail} alt="" /></div>
                <h1>{title}</h1>
                <h3>{category}</h3>
                <div className="flex p-0.5 font-semibold gap-0.5 bg-[#FAF9F6]  w-20 "><Rating color="yellow" width="20px" />{rating}</div>
            </div>

            <div className="flex">
                <div className="flex">Quentity
                    <button onClick={() => setCount(count - 1)} className="cursor-pointer ">-</button>
                    <div>{count}</div>
                    <button onClick={() => setCount(count + 1)} className="cursor-pointer ">+</button>
                </div>

                <div >
                    <div className="p-0.5 text-sky-500 font-bold">{price}$</div>
                    <div className="p-0.5 text-green-700 font-semibold">{discountPercentage}%OFF</div>
                </div>
            </div>

            <div className="flex gap-7">
                <button>Remove</button>
                <button>Buy Now</button>
            </div>
        </div>

    )
}

export default MakeCart;