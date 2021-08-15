import SearchIcon from '@material-ui/icons/Search'
import './Searchbar.css'
import { useContext,useState } from 'react';
import context from '../../context/create-context';
function Searchbar() {
    const [input, setInput] = useState('');
    const ContextStore = useContext(context);
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(input)
        if (input === '') {
            return 
        }
        ContextStore.dispatch({type:'searched',payload:input})
    }
    return (
   
        <form onSubmit={ submitHandler}className='searchbarwrapper'>
            <input onChange={ e=>setInput(e.target.value)}type="text" placeholder="Search Product..." />
            <button><SearchIcon className='searchicon' /></button>
           </form>

       
    )
}

export default Searchbar
