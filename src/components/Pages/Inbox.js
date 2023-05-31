import { useDispatch } from "react-redux";
import Nav from "../Form/Nav"
import axios from "axios";
import { useEffect, useState } from "react";
import { mailActions } from "../Store/mailStore-slice";

const Inbox=()=>{

    const dispatch = useDispatch();
    const senderMail = localStorage.getItem('email');

    let usermail;
    const regex = /[`@.`]/g;
    if (senderMail != null) {    
      usermail = senderMail.replace(regex, '');
    }
    const [mail, setMail] = useState([]);
    let responseData;
    useEffect(() =>{
        const listOfMails = [];
       axios.get(`https://mail-box-client-71c38-default-rtdb.firebaseio.com/mail/${usermail}Sentbox.json`)
            .then((response)=>{
                responseData = response.data;
                console.log(responseData);
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
            }).catch(error => {
                alert(error.message);
            })
    },[])


    return(
        <div>
            <Nav />
            <div>
                {mail.length !==0 && (
                    <div>
                        <h1>InBox</h1>
                        {mail.map((item)=> (
                            <li key={item.id} id={item.id}>
                                <span>{item.mail}</span>
                                <span>{item.subject}</span>
                                <span>{item.message}</span>
                            </li>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Inbox