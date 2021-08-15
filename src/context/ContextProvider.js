import FetchUrlContext from './create-context';
import useFetch from 'use-http';
import { useReducer } from 'react';
const API = process.env.REACT_APP_BACKEND;

const reducer = (state, action) => {
    if(action.type==='reload') { 
        console.log(!state.reload)
        return {...state, reload:!state.reload}
    }
    if (action.type === 'category-selected') {
        return { ...state, category: action.payload, isAll:false, isCategorySelected: true, isSearched: false }; 
    }
    if (action.type === 'All') {
        console.log('ALL')
        return { ...state,isAll:true, isCategorySelected: false, isSeached: false }; 
    }
    if (action.type === 'searched') {
        return { ...state, searched:action.payload, isAll:false,isCategorySelected: false, isSearched: true };
    }
 
}


function ContextProvider(props) {
    const initialState = {
        category: '',
        searched: '' ,
        isCategorySelected: false,
        isSearched: false,
        isAll : true ,
        reload: false,
    }
    const [selectedState, dispatch] = useReducer(reducer, initialState)
    const { get, post, del, response, data,cache } = useFetch(API);
    const fetchContext = {
        get: get,
        post:post,
        delete: del,
        response: response,
        cache: cache,
        data: data,
        selectedState : selectedState,
        dispatch : dispatch 
    }
    return (
        <FetchUrlContext.Provider value={fetchContext}>
                 {props.children}
        </FetchUrlContext.Provider>
    )
}

export default ContextProvider
