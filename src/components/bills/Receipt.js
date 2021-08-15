import Header from "../header/Header"
import InnerNav from "../innernav/InnerNav"
import ReceiptSearch from "../searchbar/ReceiptSearch"
import Results from "./Results"
import { useState } from 'react'


function Receipt() {
    const [searchedTerm, setSearchTerm] = useState('');
    return (
        <div> 
            <Header/>
            <InnerNav />
            <ReceiptSearch setSearch ={setSearchTerm} />
            <Results search={searchedTerm} />
        </div>
    )
}

export default Receipt