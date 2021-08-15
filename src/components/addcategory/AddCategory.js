import Header from "../header/Header";
import ProductSidebar from "../Product/ProductSidebar";
import './AddCategory.css'
import { useContext,useState } from 'react';
import FetchContext from '../../context/create-context';

function AddCategory() {
    const AddCategoryForm = () => {
        const fetchContext = useContext(FetchContext);
        const [name, setname] = useState('')
        const submitHandler = async (event) => {
            event.preventDefault();
            const user_data = await JSON.parse(localStorage.getItem('login-cred'));
            const categoryInfo = {
                category_name: name,
                category_id:user_data._id 
            }
            fetchContext.cache.clear();
            await fetchContext.post('/addcategory', categoryInfo);
            if (fetchContext.response.ok) {
                alert('Category Added')
            }
            else {
                alert('Unable to Add')
            }
        }
        return (
            <div className='addformwrapper'>
                <form className='categoryaddform' onSubmit ={submitHandler}>
                    <h4 style={{ textAlign: 'center' }}>Add Category Detail</h4>
                    <div className='categoryfield' >
                        <p>Category Name</p>
                        <input onChange={e => { setname(e.target.value) }} type='text' name='category_name' autoComplete='off' />
                        <button>Add Category</button>
                    </div>
                </form>
            </div >
        )
    }
    return (
        <>
            <Header />
            <ProductSidebar />
            {AddCategoryForm()}
        </>
    )
}

export default AddCategory
