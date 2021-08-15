import Header from "../header/Header";
import InnerNav from "../innernav/InnerNav";
import { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import OrderItem from "./OrderItem";
export default function Order() {
    const history = useHistory();
    const [search, setSearch] = useState('');
    return ( 
        <div>
            <Header/>
            <InnerNav />
            <OrderItem setSearch={setSearch} history={history} search={search}/>
        </div>
    )
}
