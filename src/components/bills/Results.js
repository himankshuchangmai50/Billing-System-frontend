import './bills.css'
import Product from './Product'
import context from '../../context/create-context';
import { useState ,useEffect,useContext} from 'react';
function Results({search }) {
    const fetchContext = useContext(context);
    const [products, setProducts] = useState([]);
    const [selectedProd, setSelectedProd] = useState([]);
    const [selected_id, setSelected_id] = useState([]);
    const [total, setTotal] = useState(0.00);
  
    const grabProducts = async () => {
        const id = await JSON.parse(localStorage.getItem('login-cred'))._id;
        fetchContext.cache.clear();
        const responseFromBackend =  await fetchContext.get(`/products/${id}`)
        setProducts(responseFromBackend);
    }
    const grabSearchProducts = async () => {
        const id = await JSON.parse(localStorage.getItem('login-cred'))._id;
        fetchContext.cache.clear();
        const responseFromBackend =  await fetchContext.get(`/products/${search}/${id}`)
        setProducts(responseFromBackend);
    }
    useEffect(() => {
       grabProducts();
       
    }, []);

    useEffect(() => {
        if(search!=='')
        grabSearchProducts();
     }, [search]);
    
    const updateSelectedProd = (item) => {
        if (selected_id.includes(item._id)) {
            alert('Item already selected');
            return;
        }
        setSelected_id([...selected_id, item._id]);
        const newObj = {
            item,
            select: 1,
        }
        setSelectedProd([...selectedProd, newObj]);
        setTotal(total=>total+=item.discounted_mrp?item.discounted_mrp : item.mrp)
    }
    return (
        <div className="resultswrapper">
            <div className='innerresult'>
                <p className='resultswrapper-p'>
                    Products
                </p>
                <div className='productlistresult'>
                    {products.length > 0 && products.map((item) => (
                        <span key={item._id} className='resultproductname' onClick={e=>{updateSelectedProd(item)}}>{item.product_name}</span>
                    ))}
                  
                </div>
            </div>
            <div>
                <Product  products={selectedProd} total={total} setTotal={setTotal} setProducts={setSelectedProd} ids={selected_id} set_ids={setSelected_id}/>
            </div>
        </div>
    )
}

export default Results
