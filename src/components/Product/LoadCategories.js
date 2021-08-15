import CategoryItem from "./CategoryItem";
import FetchContext from '../../context/create-context';
import { useState, useEffect, useContext } from 'react';
function LoadCategories() {
    const fetchContext = useContext(FetchContext);
    const [categories, setCategories] = useState([]);
    
    const loadCategories = async () => {
        const user_data = await JSON.parse(localStorage.getItem('login-cred'));
        const returnCategory = await fetchContext.get(`/categories/${user_data._id}`);
        setCategories(returnCategory);
    }
    useEffect(() => {
        loadCategories();
    }, [])

    

    return (
        <div className="categorieswrapper">
            <div className='categorylogo'>
                <p>Browse Categories</p>
            </div>
            <div className='loadcategories'>
            <CategoryItem  state={{category_name:'All Product'}} />
                {categories && categories.map(category => (
                    <CategoryItem key={category._id} state={category} />
                    
                ))}
               
               
            </div>
        </div>
    )
}

export default LoadCategories
