import './auth.css';
import { Link,Redirect } from 'react-router-dom'
import { useState } from 'react';
import useFetch from 'use-http';
const API = process.env.REACT_APP_BACKEND;
function Login() {
  
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setredirect] = useState(false);
    const { get,post, response, cache, loading, error } = useFetch(API);
    const onSubmit =async (event) => {
        event.preventDefault();
        const useinfo = {
            email: email,
            password:password
        }
        console.log(API);
        const isUserCreated = await post('/login', useinfo);
        console.log(response.ok);
        if (response.ok) {
            setredirect(true);
            await localStorage.setItem('login-cred', JSON.stringify(isUserCreated)); 
        }
        else {
            console.log('Not saved');
        }
    }
    const loginForm = () => {
        return (
            <div className ="container">
            <div className='inner-left-container'>
                {/* LOGIN HERO SECTION  */}
                <div>
                <p>Login Section</p>
                <h5>Don't have an account?</h5>
                <button><Link to='/signup'>SignUp</Link></button>
               </div>
            </div>
            <div className='inner-right-container'>
                {/* login form */}
                <form class="form" onSubmit= {onSubmit}>
       
        
        <div className="form__group">
            <input onChange={e=>{setemail(e.target.value)}} type="email" placeholder="Email" class="form__input" />
        </div>
        
        <div className="form__group">
            <input onChange={e=>{setpassword(e.target.value)}}type="password" placeholder="Password" class="form__input" />
        </div>
        
        <button className="btn" >Login</button>
    </form>
            </div>

        </div>
        )
    }
    return (
        <>
            {redirect && <Redirect to='/home'/>}
             {loginForm()}
            </>
    )
}

export default Login
