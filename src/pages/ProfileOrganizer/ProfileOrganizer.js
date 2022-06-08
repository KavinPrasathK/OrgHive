import React,{useEffect,useState} from 'react';
import { apiGetOrganizerProfile } from '../../auth/auth';
import styles from "./ProfileOrganizer.module.css";


function Prof(data){

  


  return(
    <>
    <h1 className={`${styles.head}`}>PROFILE</h1>
  <div className={`${styles.content}`} >
    <div><span>ORGID        : </span>{data.ORGID}</div><br/><br/>
    <div><span>NAME       : </span>{data.NAME}</div><br/><br/>
    <div><span>MANAGER        : </span>{data.MANAGER}</div><br/><br/>
    <div><span>GSTIN           : </span>{data.GSTIN}</div><br/><br/>

    <div><span>CONTACT 1           : </span>{data.CONTACT1}</div><br/><br/>
    <div><span>CONTACT 2           : </span>{data.CONTACT2}</div><br/><br/>

    <div><span>EMAIL           : </span>{data.EMAIL}</div><br/><br/>
    <div><span>RATING   : </span>{data.RATING}</div><br/><br/>
    <div><span>BALANCE         : </span>{data.WALLET}</div><br/><br/>
    <div><span>ADDRESS         : </span>{data.ADDRESS}</div><br/><br/>

  </div>
    </>
  )
}





function Profile() {

  const [gotdata,setgotdata]=useState(false);
  const [data,setdata]=useState({});

  useEffect(()=>{
    const orgid=localStorage.getItem('orgId');
    console.log(orgid)
    apiGetOrganizerProfile({orgid:orgid}).then((data)=>{
        console.log(data.data);
        setdata(data.data);
        setgotdata(true);
        
    })
  },[])

  return (
    
    <div className={`${styles.card}`}>
      {gotdata?<Prof ORGID={data.ORGID} NAME={data.NAME} MANAGER={data.MANAGER} CONTACT1={data.CONTACT1} CONTACT2={data.CONTACT2} EMAIL={data.EMAIL} GSTIN={data.GSTIN} RATING={data.RATING} ADDRESS={data.ADDRESS} WALLET={data.WALLET} />:<></>}
    </div>
    
  )
}

export default Profile