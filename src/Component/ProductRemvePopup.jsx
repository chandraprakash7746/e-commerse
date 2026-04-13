import React from 'react'
import Cart from '../Screen/Cart'
import Close from '../Icons/Close'
import UseWishlistProduct from '../CustomHooks/UseWishlistProduct'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../app/ProductSlice'

const ProductRemvePopup = ({ showModal = false, setShowModal, productData }) => {
  // console.log("Data.....", data);
  const { handleWishlist, isProductInWishlist } = UseWishlistProduct(productData);
  const dispatch = useDispatch();

  if (!showModal) {
    return null;
  }


  const handleRemove = () => {
    dispatch(removeFromCart(productData.id));
    setShowModal(false);
  };

  const handleMoveToWishlist = () => {
    dispatch(removeFromCart(productData.id));
    handleWishlist();
    setShowModal(false);
  };

  return (

    <div className='border border-amber-400 flex justify-center items-center fixed inset-0 bg-black/50 p-4 w-full h-full text-white'>
      <div className='w-1/2 h-2/5 border-2 border-white bg-black'>
        <div onClick={() => setShowModal(false)} className='flex justify-end items-center m-auto mr-3 mt-2 border w-8'>
          <Close />
        </div>
        <div className='flex justify-between items-center'>
          <div className='w-[80%] border mt-5.5 m-auto items-center '>Are you sure you want to remove the product!</div>
        </div>

        <div className=' mt-20 flex justify-around'>
          {!isProductInWishlist &&
            <button onClick={handleMoveToWishlist} className='border w-40'>Move To WishList</button>
          }
          <button onClick={handleRemove} className='border w-40' >Yes</button>
        </div>

      </div>
    </div>
  )
}

export default ProductRemvePopup


