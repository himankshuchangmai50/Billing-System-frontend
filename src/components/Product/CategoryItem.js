import { useContext } from 'react';
import context from '../../context/create-context';
//easy -> component , state , react-routing 
//hard => redux,context-api,useCallback,useEffects

function CategoryItem({ state }) {
    const contextStore = useContext(context); 
    const handleClick = () => {
        
        if (state.category_name === 'All Product') {
            contextStore.dispatch({ type: 'All' });
          
        } else {
          
            contextStore.dispatch({ type: 'category-selected', payload: state.category_name });
        }
        
    }

    return (
        <>
            <div onClick={handleClick} className='categoryItemWrapper'>
                <div className="categoryItem">
                    <p>{state.category_name}</p>
                </div>
            </div>



        </>

    )
}

export default CategoryItem
