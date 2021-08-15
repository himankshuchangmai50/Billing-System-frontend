import Header from '../header/Header'; 
import { useContext,useState,useEffect } from 'react'
import FetchContext from '../../context/create-context';
import Select from 'react-select';
import './addproduct.css'

import ProductSidebar from '../Product/ProductSidebar';
function Addproduct() {
    const fetchContext = useContext(FetchContext);
    const [product_name, setproduct_name] = useState('');
    const [stock, setstock] = useState(0);
    const [mrp, setmrp] = useState(0.00);
    const [selectedCatgory, setSelectedCategory] = useState('')
    const [category, setCategory] = useState([]);
    const [options, setoptions] = useState([])
    const retrieveCategory = async () => {
        const user_data = await JSON.parse(localStorage.getItem('login-cred'));
         const categories = await fetchContext.get(`/categories/${user_data._id}`);
        setCategory(categories)
    }
    useEffect(() => {
        retrieveCategory();
    }, [])
    useEffect(() => {
        const newArray = [] 
        category && category.forEach(item => {
            let newObject = { value: item, label: item.category_name }
            newArray.push(newObject)
        })
        setoptions(newArray);
    }, [category])
    const submitHandler = async(event) => {
        event.preventDefault();
        const user_data = await JSON.parse(localStorage.getItem('login-cred'));
        const productinfo = {
            product_name: product_name,
            stock: stock,
            mrp: mrp,
            category: selectedCatgory,
            product_id : user_data._id
        }
        if (selectedCatgory === '') {
            alert('Please select a ctegory');
            return 
        }
        
        fetchContext.cache.clear();
        await fetchContext.post('/addproduct', productinfo);
       
        if (fetchContext.response.ok) {
            
            alert('Successfully added'); 
        }
        else {
            alert('Unable to add product')
        }
    }
    const handleChange = (data) => {
    
        console.log(data);
        setSelectedCategory(data.value._id); 
    }
    const addProductForm = () => {
        return (
            <div className='addformwrapper'>
                <form className='addform' onSubmit={submitHandler}>
                    <h4 style={{ textAlign: 'center' }}>Insert Product details</h4>
                    <div className='productfield' >
                        <p>Product Name</p>
                        <input required autoComplete='off' onChange={e => { setproduct_name(e.target.value) }} type='text' name='product_name' />
                        <p>Select Category</p>
                        <Select
                            className="select"
                            required
                            onChange={handleChange}
                            options={options}
                        />
                        <p>Stock</p>
                        <input autoComplete='off' required onChange={e=>{setstock(e.target.value)}} type='Number' name='product_name' />
                        <p>MRP(Rs)</p>
                        <input autoComplete='off' required onChange={e=>{setmrp(e.target.value)}} type="Number" step="0.01" name='mrp' />
                        <button>Add Product</button>
                    </div>
                </form>
            </div >
        )
    }
    return (
        <div>
            <Header />
            <ProductSidebar />
            {addProductForm()}
        </div>
    )
}

export default Addproduct
