import './adddiscount.css'
import { useContext, useState, useEffect } from 'react'
import FetchContext from '../../context/create-context';
function AddDiscountList({ state }) {
    const fetchContext = useContext(FetchContext);
    const [discount, setdiscount] = useState(0)
    const submitHandler = async (event) => {
        event.preventDefault();
        const pproductInfo = {
            discount: discount,
            mrp : state.mrp 
        }
        fetchContext.cache.clear();
        await fetchContext.post(`/discount/${state._id}`, pproductInfo);
        if (fetchContext.response.ok) {
            alert('Discount Addedd Success');
        }
        else {
            alert('Discount Addedd Failed');
        }
    }
    return (
        <>
            <div className='listdiscountwrapper'>
                <div style={{ display: 'flex', alignItems: 'center', flex: 'none' }}>
                  
                    <p className='productname'>
                        {state.product_name }
                    </p>
                </div>
                <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center' }}>
                    <h6 style={{ marginRight: '5px' }}>Discount:</h6>
                    <input type='Number' className='stockcountinp' min='0' onChange={e=>{setdiscount(e.target.value)}} />
                    <h6 style={{ fontWeight: 'bold' }}>%</h6>
                    <input className='btndiscountloadproduct' type='submit' value='Add' />
                    </form>
                  
            
            </div>
        </>


    )
}

export default AddDiscountList
