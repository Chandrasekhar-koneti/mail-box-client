import { Fragment, useState } from "react"
import { Button } from "react-bootstrap"
import classes from './signup.module.css'
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
const SignUp=()=>{

    const History= useNavigate()

     const strongRegex= new RegExp(
        '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$'
    )

    const[error,setError]=useState(false)

    const emailref=useRef()
    const passwordref=useRef()
    const conformpasswordref=useRef()

    const submitHandler=(e)=>{
        e.preventDefault()
        
    const enteredemail=emailref.current.value
    const enteredpassword=passwordref.current.value
    const enteredconformpassword=conformpasswordref.current.value

    if(enteredpassword !== enteredconformpassword){
        setError('password and conform password not matching')
    }
    if(enteredpassword <6){
        setError('password should be atleast 6 characters')
    }
    if(strongRegex.test(enteredpassword)){
            setError('password should have special characters')
        }

    let url;
    if(enteredpassword === enteredconformpassword){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCnPDA9ctLzLgTzEI8O4QLfVecj3mCdeO0'
    }
    fetch(url,{
        method:'POST',
        body:JSON.stringify({
            email:enteredemail,
            password:enteredpassword,
            conformpassword:enteredconformpassword,
            returnSecuretoken:true
        }
        ),
        headers:{
            'Content-Type':'applications/json'
        }
    }).then((res)=>{
        if(res.ok){
            console.log('signup done')
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
        console.log('signup is successful')
        alert('New Account Created')
        History('/')
    }).catch((err)=>{
        alert(err.message)
    })
    }

    return(
        <div >
            <form className={classes.form} onSubmit={submitHandler}>
            <h1 style={{marginTop:'1rem', marginBottom:'1rem'}}>SignUp</h1>

                <div className={classes.control}>
                    {/* <label htmlFor="email">Email</label> */}
                    <input type="email" id="email" placeholder="Email" required ref={emailref}/>
                </div>
                <div className={classes.control}>
                    {/* <label htmlFor="password">Password</label> */}
                    <input type="password" placeholder="Password" required  ref={passwordref}/>
                </div>
                <div className={classes.control}>
                    {/* <label htmlFor="conformpassword">Conform Password</label> */}
                    <input type="password" placeholder="ConformPassword" required ref={conformpasswordref} />
                </div>
                <div>
                    <Button variant="primary" type="submit" style={{marginBottom:'1.5rem',marginTop:'1.5rem'}}>SignUp</Button>
                </div>
            </form>
            <div>
                <Link to='/'><button className={classes.btn}>Have an Account? Login</button></Link>
            </div>
        </div>
    )

}
 
export default SignUp