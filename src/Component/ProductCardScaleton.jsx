import React from "react";

const ProductCardScaleton = () => {

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-2 p-4">

            {
                Array.from({ length: 30 }, (ele, idx) => {
                    return (
                        <div key={idx} className=" mt-7 w-[20rem] h-[40vh] bg-gray-200 rounded-xl flex  items-center flex-col justify-start  overflow-hidden p-2 animate-pulse "></div>

                    )
                })
            }
        </div>
    )
}

export default ProductCardScaleton;