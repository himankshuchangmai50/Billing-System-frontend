import { InformationCircleIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import DeletModal from '../modals/DeleteModal';
import EditProductModal from '../modals/EditProductModel';
import ProductInfoModal from '../modals/ProductInfoModal';
function ProductItem({ state,status,
    setProduct,
    products,
    setSearchedProducts }) {
    const [infoModal, setinfoModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deletMoal, setDeleteModal] = useState(false);
    return (
        <div className="productItemwrapper">
            {infoModal && <ProductInfoModal state={state} setinfoModal={setinfoModal} />}
            {editModal && <EditProductModal state={state} products={products} status={status}  setSearchedProducts={setSearchedProducts} setProduct ={setProduct}   setOpenMpdal={setEditModal}/>}
            {deletMoal && <DeletModal state={state} products={products} status={status}  setSearchedProducts={setSearchedProducts} setProduct ={setProduct}   setOepnModal={setDeleteModal} />}
            <div> <span className='sno'> </span>{state.product_name}</div>
            <div className='sellingdetail'>
                <span> Stock: {state.stock}</span>
                {state.discount!==0 ? (<span>
                    MRP: {state.discounted_mrp}<span>({state.discount}%)</span>
                </span>) :
                 <span>MRP: {state.mrp}rs</span>
                }
               
            </div>
            <div className='btnwrapper'>
                <button onClick={e => { setinfoModal(true) }}>Info</button>
                <button onClick={e => { setEditModal(true) }}>Edit</button>
                <button onClick={e => { setDeleteModal(true) }}>Delete</button>

            </div>
        </div>
    )
}

export default ProductItem
