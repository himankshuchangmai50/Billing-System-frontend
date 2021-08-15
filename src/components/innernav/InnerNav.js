import './innernav.css'
import {Link} from 'react-router-dom'
function InnerNav() {
    return (
        <div style={{
            display: 'flex',
            marginTop: '10px',
            justifyContent:'space-evenly'
        }}>
            <Link to='/receipt'> <button className='btninnernav'>Receipt</button></Link>
            <Link to='/order'> <button className='btninnernav'>Orders</button></Link>
           
        </div>
    )
}

export default InnerNav
