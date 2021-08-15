import Modal from 'react-modal'
import React, { useState,useContext } from 'react';
import Context from '../../context/create-context';

function DeletModal({ 
    state,
    setOepnModal,
    status,
    setProduct,
    setSearchedProducts
    ,products
}) {
     

    const fetchContext = useContext(Context);
    const [isOpen, setIsOpen] = useState(true);
    
  

    function closeModal() {
        setIsOpen(false);
        setOepnModal(false);
      }
    
    const deleteProduct = async () => {
        fetchContext.cache.clear();
        const responseBackend = await fetchContext.delete(`/delete/${state._id}`);
        if (fetchContext.response.ok) {
            //success 
            if (status === 'all') {
                
                setProduct(products=>products.filter(product => product._id !== state._id))
            }
            if (status === 'search') {
                setSearchedProducts(copyArray => copyArray.filter(item=>item._id!==state._id));
            }
            alert('Sccessfully deleted');
            setOepnModal(false);

        }
        else {
            alert('Deletetion failed');
        }
     }
    return (

       


            <Modal
                isOpen={isOpen}
              
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                    <p>Are you sure?</p>
            <div style={{display:'flex', justifyContent:'space-evenly' }}>
            <button style={{
                         backgroundColor: 'red',
                         color: '#fff',
                         padding: '10px',
                         marginTop:'5px',
                         borderRadius: '5px',
                         outline: 'none',
                         border: 'none',
                         cursor: 'pointer',
                      
                }}
                onClick ={deleteProduct}
                >YES</button>

            <button
                style={{
                            backgroundColor: 'red',
                            color: '#fff',
                            padding: '10px',
                            marginTop:'5px',
                            borderRadius: '5px',
                            outline: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            
                    }}
                 onClick = {e=>{ setOepnModal(false)}}    
                >NO</button>
                   </div>
                
            </Modal>
        
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
        width: '10%',
        position: 'absolute'
    },
};

export default DeletModal
