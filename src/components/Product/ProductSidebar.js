import './Product.css'
import { Link } from 'react-router-dom'
function ProductSidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-items'>

                <Link to='/home' className='sidebar-item'>Products</Link>
                <span className='line border-25'>  </span>
                <Link to='addproducts' className='sidebar-item '>Add Products</Link>
                <span className='line border-25'>  </span>

                <Link to='adddiscount' className='sidebar-item'>Add Discount</Link>
                <span className='line border-25'>  </span>
                <Link to='addcategory' className='sidebar-item'>Add Categories</Link>
                <span className='line border-25'>  </span>
            </div>
        </div >
    )
}

export default ProductSidebar
