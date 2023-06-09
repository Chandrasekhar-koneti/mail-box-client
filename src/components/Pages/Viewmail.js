import React from 'react'
import Nav from '../Main/Nav'
import Header from '../Main/Header'
import SideBar from '../Main/Sidebar'
import classes from './viewmail.module.css'
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import { TfiArrowLeft } from "react-icons/tfi";
import { BsTrash } from "react-icons/bs";
import mail from '../images/mail.jpg'


const ViewMail = (props) => {
    console.log(props.item)
    const params = useParams();
    console.log(params)
    const History=useNavigate()
    const loggedInUser = localStorage.getItem('email');
    const location = useLocation();
    const {senderMail, subject, message, id} = location.state;
    console.log(senderMail,subject,message,id);

    const loggedInMail=localStorage.getItem('email')
    let usermail

    const regex=/[`@.`]/g
    if(loggedInMail !== null){
        usermail=loggedInMail.replace(regex,'')
    }

    const deleteItem = (id) => {
        console.log('deleting item', id)
        fetch(`https://mail-box-client-71c38-default-rtdb.firebaseio.com/mail/${usermail}Inbox/${id}.json`,
        {
            method:'DELETE'
        }).then((response)=>{
            response.json().then((res)=>{
                console.log('deleting item');
                alert('Are you sure? ')
                History('/welcome')
                console.log('ress is', res)

            })
        }).catch((err)=>{
            alert(err)
        })
    }
  return (
    <div>
        <Nav/>
        <Header />
        <div className={classes['main-container']}>
            <SideBar />
            <div className={classes.viewSection}>
                <div className={classes.icon} >
                    <div><span><TfiArrowLeft/></span> <Link to='/welcome' className={classes.link}>Back</Link></div>
                   <button className={classes.deletebtn} onClick={()=>deleteItem(id)}><BsTrash/></button>
                </div>
                <div className={classes['main-veiw-content']}>
                    <div className={classes['inner-container']}>
                    <div className={classes.mailtitle}>
                        <h3>{subject}</h3> 
                        <img src={mail} alt='' className={classes.mailImg}/>
                        <h2 className={classes.spanStyle}>{senderMail}</h2>
                        <p style={{fontSize:'12px'}}>{`<${senderMail}>`}</p>
                        </div>
                        <div className={classes.mailFormat}>

                            <p>To: {loggedInUser} </p>
                        </div>
                        <p className={classes.msg}>{message}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ViewMail