import { createContext } from 'react';


const FetchUrlContext = createContext({
    get: (url) => { },
    post: (url,data) => { },
    delete: (url) => { },
    response: {},
    cache: () => { },
    data: {},
    selectedState: {},
    dispatch: () => { }
})

export default FetchUrlContext;