import React from 'react'
import { Link} from 'react-router-dom';
import { TfiPlus } from 'react-icons/tfi';
import { RiInboxLine } from 'react-icons/ri';
import { RiSendPlaneFill } from 'react-icons/ri';
import { SlArrowDown } from 'react-icons/sl';
import { SlPhone } from 'react-icons/sl';
import { SlUser } from 'react-icons/sl';
import { MdOutlineDuo } from 'react-icons/md';
import classes from './sidebar.module.css'


const Sidebar=()=>{
    return(
        <div>
             <div className={classes.sidebar}>
        <Link to="/mail" className={classes['sidebar-btn']}>
          <span>
            <TfiPlus />
          </span>
          Compose
        </Link>

        <div className={classes['options-list']}>
          <span className={classes['sidebar-icons']}>
            <RiInboxLine />
          </span>
          <Link to='/welcome' className={classes.listbtn}>
            <h3 className={classes.heading3}>Inbox</h3>
          </Link>
        </div>
        <div className={classes['options-list']}>
          <span className={classes['sidebar-icons']}>
            <RiSendPlaneFill />
          </span>
          <Link to="/sentbox" className={classes.listbtn}>
            <h3 className={classes.heading3}>Sent</h3>
          </Link>
        </div>
        <div className={classes['options-list']}>
          <span className={classes['sidebar-icons']}>
            <SlArrowDown />
          </span>
          <button className={classes.listbtn}>
            <h3 className={classes.heading3}>More</h3>
          </button>
        </div>

        <div className={classes.footer}>
          <span className={classes['footer-icons']}>
            <SlUser />
          </span>
          <span className={classes['footer-icons']}>
            <SlPhone />
          </span>
          <span className={classes['footer-icons']}>
            <MdOutlineDuo />
          </span>
        </div>
      </div>

        </div>
    )
}
export default Sidebar