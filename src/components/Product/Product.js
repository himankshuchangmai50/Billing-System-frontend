import Header from "../header/Header";
import Searchbar from "../searchbar/Searchbar";
import ListProduct from "./ListProduct";
import LoadCategories from "./LoadCategories";
import ProductSidebar from "./ProductSidebar";


function AddProduct() {
    return (
        <div>
            <Header />
            <ProductSidebar />
            <div className="containerProduct">
                <Searchbar />
                <div className='container-inner'>
                    <LoadCategories />
                    <ListProduct />
                </div>
            </div>


        </div>
    )
}

export default AddProduct
