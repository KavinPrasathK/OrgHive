import React, { useEffect, useState } from 'react';
import styles from "./ProfileCustomer.module.css";
import {apiGetCustomerProfile,apiAddWallet} from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import {useNavigate} from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";


function Prof(data){
  let navigate=useNavigate();
  const [amt,setamt]=useState(0);
  
  function handleChange(event){
    setamt(event.target.value);
  }

 const submit = async () => {
   const res=await apiAddWallet({amt:amt,username:data.USERNAME});
  //  console.log(res);
  if(res.status>=200 && res.status<=299){
    Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag});
    // navigate('/profile');
    data.setx(data.x+1);
    // window.location='/profile';
  }
 }

  return(
    <>
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
    <label>Add Amount : <input value={amt} onChange={handleChange} /></label>
    <input type='button' onClick={submit} value='Add to wallet' />
  </div>
    </>
  )
}



function Profile() {
  const [gotdata,setgotdata]=useState(false);
  const [data,setdata]=useState({});
  const [x,setx]=useState(0);
  // const [addamount,setaddamount]=useState(0);
   
  // function handleChange(){
  //   // setaddamount(event.target.value);
  //   console.log('add');
  // }

  useEffect(()=>{
    const username=localStorage.getItem('userName');
    apiGetCustomerProfile({username:username}).then((data)=>{
        // console.log(data.data);
        setdata(data.data);
        setgotdata(true);
    })
  },[x])




  return (
    // <>anjadncjakn</>
    <div className={`${styles.card}`}>
      {gotdata?<Prof x={x} setx={setx} USERNAME={data.USERNAME} FIRSTNAME={data.FIRSTNAME} LASTNAME={data.LASTNAME} PHONE={data.PHONE} EMAIL={data.EMAIL} AADHAR={data.AADHAR} DOB={data.DOB} ADDRESS={data.ADDRESS} WALLET={data.WALLET} />:<></>}
  </div>
  )
}

export default Profile