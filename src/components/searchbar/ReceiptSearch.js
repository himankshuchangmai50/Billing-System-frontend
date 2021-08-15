import SearchIcon from '@material-ui/icons/Search'
import './Searchbar.css'
import { useState } from 'react';
import context from '../../context/create-context';
function ReceiptSearch({ setSearch }) {
    const [input,setInput] = useState('')
    function handleSubmit(e) {
        e.preventDefault();
        setSearch(input)
   }
    return (
   
        <form className='searchbarwrapper' onSubmit={handleSubmit}>
            <input type="text" placeholder="Search Product..." onChange={e=>{setInput(e.target.value)}} />
            <button><SearchIcon className='searchicon' /></button>
           </form>

       
    )
}

export default ReceiptSearch
