import { Button } from "react-bootstrap"
import classes from './signin.module.css'
import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"

const SignIn=()=>{
    const History=useNavigate()

    const[isLogin, setIsLogin]=useState(true)

    const emailref=useRef()
    const passwordref=useRef()

    const submitHandler=(e)=>{
        e.preventDefault()

        const enteredemail=emailref.current.value
        const enteredpassword=passwordref.current.value

    let url;
    if(isLogin){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCnPDA9ctLzLgTzEI8O4QLfVecj3mCdeO0'
    }
    fetch(url,{
        method:'POST',
        body:JSON.stringify({
            email:enteredemail,
            password:enteredpassword,
            returnSecureToken:true
        }),
        headers:{
            'Content-Type':'applications/json'
        }
    })
    .then((res)=>{
        if(res.ok){
            console.log('signuuup done')
            localStorage.setItem('email',enteredemail)
            return res.json()
        }
        else{
            return res.json().then((data)=>{
            let errormessage='Authentication failed'
            if(data && data.error && data.error.message){
                errormessage=data.error.message
            }
            throw new Error(errormessage)
            })
        }
    }).then((data)=>{
        console.log('login done')
        History('/welcome')

    }).catch((err)=>{
        alert(err.message)
    })
    }

    return(
        <div>
            <form className={classes.form} onSubmit={submitHandler}>
                <h1 style={{marginTop:'1rem', marginBottom:'1rem'}}>SignIn</h1>
                <div className={classes.control}>
                    <input type="email" placeholder="Email" required ref={emailref}/>
                </div>
                <div className={classes.control}>
                    <input type="password" placeholder="Password" required ref={passwordref} />
                </div>
                <div>
                    <Link>Forgot Password</Link>
                </div>
                <div>
                    <Button style={{marginTop:'1rem',marginBottom:'1rem'}} type="submit">Login</Button>
                </div>
            </form>
            <div className={classes.button}>
            <Link to='/signup'><button className={classes.btn}>Create New Account</button></Link>
            </div>
        </div>
    )
}

export default SignIn