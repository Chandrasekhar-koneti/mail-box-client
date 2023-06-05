import { Button } from "react-bootstrap"
import classes from './nav.module.css'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authActions } from "../Store/auth-slice"

const Nav=()=>{

    const mail=localStorage.getItem('email')
    const dispatch=useDispatch()
    const History=useNavigate()
    const logoutHandler=()=>{
        dispatch(authActions.logout())
        History('/')
        console.log('user logged out')

    }
    return(
        <div>
            <nav className={classes.nav}>
                <h2><header>Welcome to Mail Box</header></h2>
                <Button variant='primary' onClick={logoutHandler}>Logout</Button>
            </nav>
            <p>loggedInUser:{mail}</p>
            <hr></hr>
        </div>
    )
}

export default Nav