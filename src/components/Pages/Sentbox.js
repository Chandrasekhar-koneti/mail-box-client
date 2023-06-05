import { useDispatch } from "react-redux";
import Nav from "../Main/Nav"
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { mailActions } from "../Store/mailStore-slice";
import classes from './sentbox.module.css'
import Header from "../Main/Header";
import Sidebar from "../Main/Sidebar";
import { Link } from "react-router-dom";

const Sentbox=()=>{

    const dispatch = useDispatch();
    const senderMail = localStorage.getItem('email');
    console.log(senderMail)

    let usermail;
    const regex = /[`@.`]/g;
    if (senderMail != null) {    
      usermail = senderMail.replace(regex, '');
    }
    console.log('usermail is',usermail)
    const [Mail, setMail] = useState([]);

    let responseData;
    useEffect(() =>{
        const listOfMails = [];
       axios.get(`https://mail-box-client-71c38-default-rtdb.firebaseio.com/mail/${usermail}Sentbox.json`)
            .then((response)=>{
                responseData = response.data;
                console.log('sentbox response is',responseData)
                dispatch(mailActions.totalMails(responseData));
                if(responseData === null){
                    alert('No Mails to show')
                }
                else{
                    let keys = Object.entries(responseData); 
                console.log(keys);
               Object.entries(responseData).forEach((item) => {
                listOfMails.push({
                    id:item[0],
                    mail: item[1].mail,
                    subject: item[1].subject,
                    message: item[1].message
                })
               })}
               setMail(listOfMails)
               console.log(listOfMails)
            }).catch(error => {
                alert(error.message);
            })
    },[])


    return(
        <div>
            <div>
            <Nav />
            <Header />
            </div>
           

            <h3 className={classes.sentbox}>SentBox</h3>
            <div style={{display:'flex'}}>

                <Sidebar />
            <div className={classes.container}>
            <div className={classes.sentSectionHeader}>
            <h2>primary</h2>
            </div>


            {Mail.length !== 0 && (
          <div className={classes.itemList}>

            {Mail.map((item) => (
              <Link
              to={`/sentbox/viewmail/:${item.id}`}
                  state={{
                    senderMail: item.mail,
                    subject: item.subject,
                    message: item.message,
                   id: item.id,
                  }}
              key={item.id} id={item.id} className={classes.arrayItem}>
                <span className={classes.mailTo}>
                    To :
                    <h3>{item.mail}</h3></span>
                    <div className={classes.emailMessage}>
                    <span className={classes.mailSubject}>{item.subject}</span>
                    {/* <span className={classes.mailBody}>{item.message}</span> */}
                    </div>

              </Link>
            ))}
               </div>
        )}







            {/* {Mail.length !==0 && (
                    <div className={classes.itemList}>

                        {Mail.map((item)=>
                              <li key={item.id} id={item.id} className={classes.arrayItem}>
                              <span className={classes.mailTo}> To:<h3>{item.mail}</h3></span>
                              <span className={classes.mailSubject}>{item.subject}</span>
                              {/* <span className={classes.mailBody}>{item.message}</span> */}
                          {/* </li>
                        )}
                    </div> 
                )}  */}

            </div>
            </div> 
            </div>
    )
}

export default Sentbox

