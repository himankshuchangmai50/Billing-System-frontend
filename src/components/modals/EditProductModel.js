import Modal from 'react-modal'
import React, { useState,useEffect,useContext } from 'react';
import context from '../../context/create-context';
function EditProductModal({
    state,
    setOpenMpdal,
    status,
    setProduct,
    setSearchedProducts
    ,products
}) {
    const fetchContext = useContext(context);
    const [stock, setStock] = useState(0)
    const [name, setname] = useState('')
    const [mrp, setmrp] = useState(0.00)
    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }
    
    useEffect(() => {
        setname(state.product_name);
        setStock(state.stock);
        setmrp(state.mrp); 
    }, [])
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {
            initial: {
                product_name: state.product_name,
                stock: state.stock,
                mrp : state.mrp 
            },
            final: {
                product_name: name,
                stock: stock,
                mrp : mrp 
            }
        }
        fetchContext.cache.clear();
        const responseFromBackend = await fetchContext.post(`/update/${state._id}`, data);
        if (fetchContext.response.ok) {
            
            if (status === 'all') {
                const copyArray = [...products];
                let ind;
                console.log(copyArray);
                copyArray.forEach((item, index) => {
                    if (item._id === state._id) {
                        ind = index; 
                        return 
                    }
                })
                copyArray[ind] = responseFromBackend;
                
                setProduct(copyArray);
            }
            if (status === 'search') {
                const copyArray = [...products];
                let ind;
                copyArray.forEach((item, index) => {
                    if (item._id === state._id) {
                        ind = index; 
                        return 
                    }
                })
                console.log(copyArray);
                copyArray[ind] = responseFromBackend;
                setSearchedProducts(copyArray);
            }
            
            alert('Edit was success');
        }
        
    }

    return (


        <Modal
            isOpen={true}
            onafter={afterOpenModal}
            style={customStyles}
            contentLabel="Edit"
            ariaHideApp={false}
        >
            <button style={{
                backgroundColor: 'red',
                color: '#fff',
                padding: '5px',
                borderRadius: '5px',
                outline: 'none',
                border: 'none',
                cursor: 'pointer',
                float: 'right',
            }} onClick={e => { setOpenMpdal(false) }}>
                Close
            </button>
            <br />
            <form className="flex  flex-col items-center" onSubmit={handleSubmit}>
                <p style={{fontSize:'18px',fontWeight:'bold',textAlign: 'center'}}> Edit </p>
                <p  style={{fontSize:'18px'}}>Product Name</p>
                <input style={{
                     outline: 'none',
                     border: 'none',
                     backgroundColor: '#e5e5e5',
                     height: '20px',
                     padding: '20px',
                     borderRadius: '10px',
                     fontSize: '15px',   
                }} onChange={e => { setname(e.target.value) }} value={name} type='text' /> <br />
                <p  style={{fontSize:'18px'}}>Stock</p>
                <input
                  style={{
                    outline: 'none',
                    border: 'none',
                    backgroundColor: '#e5e5e5',
                    height: '20px',
                    padding: '20px',
                    borderRadius: '10px',
                    fontSize: '15px',   
               }} onChange={e => { setStock(e.target.value) }} value={stock} type='Number' /> <br />
                <p style={{ fontSize: '18px' }}>MRP</p>
                <input
                    style={{
                        outline: 'none',
                        border: 'none',
                        backgroundColor: '#e5e5e5',
                        height: '20px',
                        padding: '20px',
                        borderRadius: '10px',
                        fontSize: '15px',
                        
                   }} onChange={e => { setmrp(e.target.value) }} value={mrp} type='Number' step="0.01" /> <br/>
                <button style={{
                backgroundColor: '#75A7A3',
                color: '#fff',
                padding: '10px',
                marginTop:'5px',
                borderRadius: '5px',
                outline: 'none',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '40%',
            }} >
                Submit
            </button>
            </form>


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
        top: '50%',
        left: '54%',
        borderRadius: '10px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '20%'
    },
};

export default EditProductModal
