import { Link, useNavigate } from "react-router-dom"
import Nav from "../Form/Nav"
import classes from './welcome.module.css'
import Header from "./Header"

const Welcome=()=>{
    const History=useNavigate()
    const createMailHandler=()=>{
        History('/Mail')
    }
    return(
        <div>
            <Nav />
            <Header />
            <div>
                <button className={classes.composebtn} onClick={createMailHandler}>+Compose</button>
            </div>
            <div>
                <Link to='/inbox' className={classes.inbox}>Inbox</Link>
            </div>
            <div >
                <Link className={classes.inbox} to='/sentbox'>Sent</Link>
            </div>
        </div>
    )
}

export default Welcome