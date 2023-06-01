import React from 'react'
import classes from './Header.module.css'
import { BiMenu } from "react-icons/bi";
import gmailLogo from '../images/gmailLogo.png'
import { SlMagnifier } from "react-icons/sl";
import { IoMdApps } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";




const Header = () => {
  return (
    <>
        <div className={classes.header}>
            <div className={classes['header-left']}>
                <span className = {classes.spanIcon}> <BiMenu/> </span>
                <img src = {gmailLogo} alt='' className={classes.img}/>
            </div>
            <div className={classes['header-middle']}>
                <span className = {classes.spanIcon}><SlMagnifier /></span>
                <input type="text"  placeholder="search" className={classes.input} />
            </div>
            <div className={classes['header-right']}>
                <span className = {classes.spanIcon}><IoMdApps/></span>
                <span className = {classes.spanIcon}><IoIosNotifications/></span>
                <span className = {classes.spanIcon}><BiUserCircle/></span>
            </div>
        </div>
    </>
  )
}

export default Header