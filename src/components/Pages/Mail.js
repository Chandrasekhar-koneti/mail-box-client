import { useRef, useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import Nav from "../Main/Nav"
import { mailActions } from "../Store/mailStore-slice"
import { useDispatch } from "react-redux"
import { EditorState } from "draft-js"
import classes from './mail.module.css'
import './editor.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from "react-router-dom"


const Mail=()=>{
    const History=useNavigate()
    const dispatch=useDispatch()
    // const editorState=EditorState.createEmpty()
    let [mailingTo, setMailingTo] =useState('')
    const[messageStore, setMessageStore]=useState()
    const [input, setInput] = useState([]);
    const regex = /[`@.`]/g;


    let mailTo = mailingTo.replace(regex, '');
  console.log('mailing to: ', mailTo)

    const sendMailToref = useRef();
    const subjectref = useRef();

    const senderMail = localStorage.getItem('email');

    let usermail;

  if (senderMail != null) {

    usermail = senderMail.replace(regex, '');

    console.log(usermail);
  }

  let message;

  const[editorState,setEditoState]=useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {
      setEditoState(editorState)
      // message=event.getCurrentContent().getPlainText()
      setMessageStore(editorState)
      console.log(messageStore)
  };

  const sendMailHandler = (e) => {
    e.preventDefault();
    const receiverMail = sendMailToref.current.value;
    const subject = subjectref.current.value;    
    const mailDetails = {
        senderMail,
        receiverMail,
        subject,
        // message,
        messageStore
      }
    setMailingTo(receiverMail)
    console.log('mailing details: ', mailDetails)
    sendMail(mailDetails);
    fetch(`https://mail-box-client-71c38-default-rtdb.firebaseio.com/mail/${usermail}Sentbox.json`,
    {
      method:'POST',
      body: JSON.stringify({
        mail:receiverMail,
        subject: subject,
        message:message
      }),
      headers :{'Content-Type': 'application/json'}
    }) .then((resp) => {
      if (resp.ok) {
        console.log("resp1", resp);
        return resp.json();
      } else {
        return resp.json().then((data) => {
          console.log(data);
        });
      }
    })
    .then((data) => {
      console.log(data.name);
      alert("Mail sent successfully...")
      History('/sentbox');
    })
    .catch((err) => {
      alert(err);
    });

   
   

  const existingInput = [...input];

  
  
  async function sendMail(mailDetails) {
      try{
        const response = await fetch(`https://mail-box-client-71c38-default-rtdb.firebaseio.com/mail/${mailTo}Inbox.json`,{
          method: 'POST',
          body: JSON.stringify(
            mailDetails
          ),
          headers :{'Content-Type': 'application/json'} 
        });      
        if(response.status === 200){
          console.log('mailing success');
          dispatch(mailActions.storeInBox(mailDetails));
          existingInput.push(mailDetails);
          setInput(existingInput);
        }
        else {
          alert('mailing error');
        }
      }catch(error){
          alert(error.message)           
      }

  }

  }

    return(
        <div>
            <Nav />
            <div className={classes.container}>
                <form onSubmit={sendMailHandler}>
                <input type="email" placeholder="To " ref={sendMailToref} /> <br/>
                <input type="text" placeholder="Subject"  ref={subjectref} /> <br/>
                {/* <textarea rows={10} cols={}/> */}
                <div className={classes.editor}>
                    <Editor 
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                    onEditorStateChange={onEditorStateChange}

                    />
                </div>
                <button className={classes.btn}>Send</button>
                </form>
            </div>
        </div>
    )

}

export default Mail