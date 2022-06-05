import React, { useEffect, useState } from 'react';
import styles from "./ProfileCustomer.module.css";
import {apiGetCustomerProfile} from '../../auth/auth';

function Profile() {

  const [data,setdata]=useState({});
   
  useEffect(()=>{
    const username=localStorage.getItem('userName');
    apiGetCustomerProfile({username:username}).then((data)=>{
        console.log(data.data);
        setdata(data.data);
    })
  },[])

  return (
    <div className={`${styles.card}`}>
    <h1 className={`${styles.head}`}>PROFILE</h1>
    <div className={`${styles.content}`} >
      <div><span>USERNAME        : </span>{data.USERNAME}</div><br/><br/>
      <div><span>FIRSTNAME       : </span>{data.FIRSTNAME}</div><br/><br/>
      <div><span>LASTNAME        : </span>{data.LASTNAME}</div><br/><br/>
      <div><span>PHONE           : </span>{data.PHONE}</div><br/><br/>
      <div><span>EMAIL           : </span>{data.EMAIL}</div><br/><br/>
      <div><span>AADHAR          : </span>{data.AADHAR}</div><br/><br/>
      <div><span>DATE OF BIRTH   : </span>{data.DOB.slice(0,10)}</div><br/><br/>
      <div><span>ADDRESS         : </span>{data.ADDRESS}</div><br/><br/>
      <div><span>BALANCE         : </span>{data.WALLET}</div><br/><br/>

    </div>
  </div>
  )
}

export default Profile