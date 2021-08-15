import Modal from 'react-modal'
import React, { useState } from 'react';


function ProductInfoModal({
    state,
    setinfoModal
}) {
     

   
    const [isOpen, setIsOpen] = useState(true);
    function openModal() {
      setIsOpen(true);
    }
  

    function closeModal() {
        setIsOpen(false);
        setinfoModal(false);
      }
    

    return (

        <div>


            <Modal
                isOpen={isOpen}
              
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div >
                    <p style={{fontWeight:'bold', fontSize:'17px'}} >{state.product_name}</p>
                    <p style={{ fontSize: '20px' }}> Category : {state.category.category_name} </p>
                    <p style={{ fontSize: '20px' }}> MRP : {state.mrp} </p>
                    {state.discount!==0 && <p style={{  fontSize: '20px' }}> Discounted MRP : {state.discounted_mrp} ({state.discount}%) </p> }
                </div>
            </Modal>
        </div>
    )
}

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    content: {
        top: '30%',
        left: '50%',
        borderRadius: '10px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        position: 'absolute'
    },
};

export default ProductInfoModal
