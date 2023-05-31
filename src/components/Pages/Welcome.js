import { Link, useNavigate } from "react-router-dom"
import Nav from "../Form/Nav"
import classes from './welcome.module.css'

const Welcome=()=>{
    const History=useNavigate()
    const createMailHandler=()=>{
        History('/Mail')
    }
    return(
        <div>
            <Nav />
            <div>
                <button className={classes.composebtn} onClick={createMailHandler}>+Compose</button>
            </div>
            <div >
                <Link className={classes.inbox} to='/Inbox'>Inbox</Link>
            </div>
        </div>
    )
}

export default Welcome