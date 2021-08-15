import './auth.css';
import { Link,Redirect } from 'react-router-dom'
import { useState } from 'react';
import useFetch from 'use-http';
const API = process.env.REACT_APP_BACKEND;
function Signup() {
    const [store, setStore] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setredirect] = useState(false);
    const { get,post, response, loading, error } = useFetch(API);
    const onSubmit =async (event) => {
        event.preventDefault();
        const useinfo = {
            store_name: store,
            email: email,
            password:password
        }
       console.log(API); 
        const isUserCreated = await post('/signup', useinfo);
        console.log(response);
        if (response.ok) {
            setredirect(true); 
        }
        else {
            console.log('Not saved');
        }
   }
    
    const singupForm = () => {
        return (
            <div className ="container">
            <div className='inner-left-container'>
                {/* LOGIN HERO SECTION  */}
                <div>
                <p>SignUp Section</p>
                <h5>Have an account alreayd?</h5>
                <button><Link to='/'>Login</Link></button>
               </div>
            </div>
            <div className='inner-right-container'>
                {/* login form */}
                <form class="form" onSubmit={onSubmit}>
        <div className="form__group">
            <input type="text" placeholder="Store Name" onChange={e=>{setStore(e.target.value)}} className="form__input" />
        </div>
        
        <div class="form__group">
            <input type="email" placeholder="Email" onChange={e=>{setemail(e.target.value)}}  className="form__input" />
        </div>
        
        <div class="form__group">
            <input type="password" placeholder="Password" onChange={e=>{setpassword(e.target.value)}} className="form__input" />
        </div>
        
        <button className="btn" >Sign Up</button>
    </form>
            </div>

        </div>
        )
    }
   
    return (
        <> {redirect && <Redirect to ='/'/>}
            {singupForm()}
            </>
      
    )
}

export default Signup
