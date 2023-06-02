import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate,Link} from "react-router-dom"
import { mailActions } from "../Store/mailStore-slice"
import Nav from "../Main/Nav"
import Sidebar from "../Main/Sidebar"
import classes from './inbox.module.css'
import {FcSms} from 'react-icons/fc'
import { SlStar } from 'react-icons/sl';
import {SlArrowDown} from 'react-icons/sl'
import {SlActionRedo} from 'react-icons/sl'
import {SlOptionsVertical} from 'react-icons/sl'



const Inbox=()=>{

    const dispatch=useDispatch()
    const History=useNavigate()
    const[items,setItems]=useState([])
    const[view,setView]=useState(false)



  const storedMails = useSelector((state) => state.mail.mails);
  console.log(storedMails);

  const senderMail = localStorage.getItem('email');
  let usermail;
  const regex = /[`@.`]/g;
  if (senderMail != null) {
    usermail = senderMail.replace(regex, '');
  }

  useEffect(()=>{
    let responseData
    const listOfMails=[]

    axios.get(`https://mail-box-client-71c38-default-rtdb.firebaseio.com/mail/${usermail}Inbox.json`)
    .then((response)=>{
        responseData=response.data
        if(responseData !== null){
            Object.entries(responseData).forEach((item)=>{
                listOfMails.push({
                    id: item[0],
                    mail:item[1].senderMail ,
                    subject: item[1].subject,
                    message:item[1].message ,
                    read:item[1].read
                })
            })
            setItems(listOfMails)
            dispatch(mailActions.storeInBox(listOfMails))
        }
    }).catch((error)=>{
        alert(error)
    })
  },[])

  const ItemSelected = (item) => {
    console.log(item);


    const updatedItem = {
        id: item.id,
        mail: item.mail,
        subject: item.subject,
        message: item.message,
        read: true,
      };

      console.log(updatedItem)

      setView(true);

    fetch(
      `https://mail-box-client-71c38-default-rtdb.firebaseio.com/mail/${usermail}Inbox/${item.id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify(updatedItem),
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
      .then((response) => {
        response.json().then((data) => {
          console.log('Editing item successful', data);
        });
      })
      .catch((err) => {
        alert(err.message);
      });

    }

    return(
        <div>
        <Nav />
        <div className={classes['main-container']} >
            <Sidebar />
            <div className={classes['email-section']}>
        <div className={classes['email-section-left']}>
          <span>
            <input type="checkbox" />
          </span>
          <span className={classes['sidebar-icons']}>
            <SlArrowDown />
          </span>
          <span className={classes['sidebar-icons']}>
            <SlActionRedo />
          </span>
          <span className={classes['sidebar-icons']}>
            <SlOptionsVertical />
          </span>
        </div>
        <div className={classes['email-section-right']}>
{/*promotions section start */}
<div className={classes['email-List']}>
  <div className={classes['list-header']}>
    <span>
      <h4>Primary</h4>
    </span>
  </div>
  <div className={classes['list-header']}>
    <span>
      <h4>Social</h4>
    </span>
  </div>
  <div className={classes['list-header']}>
    <span>
      <h4>Promotions</h4>
    </span>
  </div>
</div>


<div className={classes['emailList-list']}>
{items.map((item) => (
    <Link
      to={{
        pathname: `/welcome/veiwmail/${item.id}`,
        state: {
          senderMail: item.mail,
          subject: item.subject,
          message: item.message,
         id: item.id,
        },
      }}

      key={item.id}
      id={item.id}
      className={classes.arrayItem}
      onClick={() => {
        ItemSelected(item);
      }}
    >  
      <div className={classes.emailRow}>
        <div className={classes['emailRow-options']}>
          <span>
            <input type="checkbox" /> 
          </span>
          <span>
            <SlStar />
          </span>
          {item.read === false && (
            <span>
              <FcSms />
            </span>
          )}
        </div>
      </div>
      <h3 className={classes.title}>{item.mail}</h3>

      <div className={classes.emailMessage}>
        <h4>{item.subject}</h4>
        <p>{item.message}</p>
      </div>
      </Link>
  ))}
            </div>
          </div>   
        </div>
        </div>
        </div>
    )
}

export default Inbox












