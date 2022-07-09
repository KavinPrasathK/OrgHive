import React, { useEffect, useState } from 'react'
import styles from "./progressCustomer.module.css"
import { Navigate, useParams,useNavigate } from 'react-router-dom'
import { apiProgressCustomer,apiGetToDate,apiMakePayment } from '../../auth/auth';
import Navbar from '../../components/Navbar/Navbar';
import ButtonCust from "../../components/Button/ButtonCust";
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';

function Progressitem(props) {

    return (
    <div className={`${styles.card}`}>
        <div className={`${styles.container}`} >
            <h3>{props.msg}</h3><br />
            <span className={`${styles.subhead}`}>DATE : </span>{props.date}<br />
            <span className={`${styles.subhead}`}>TIME : </span>{props.time}<br />
        </div>
 

    </div>
    )
}

function Progress(props){
    var arr=props.pdata;
    // console.log(arr);

    var newarr=arr.map((item,i) => {
        return <><Progressitem msg={item.MSG} date={item.CREATEDAT.slice(0,10)} time={item.CREATEDAT.slice(11,19)} /><br/></>
    })
    return(
        newarr
    )
}

function ProgressCustomer() {
    let { eventid } = useParams();
    const [pdata,setpdata]=useState([]);
    const [showprog,setshowprog]=useState(false);
    const [showpay,setshowpay]=useState(false);
    const [mkp,setmkp]=useState(0);
    let navigate=useNavigate();
    var date=new Date();

    // console.log(date.toISOString().slice(0,10));
    var curdate=date.toISOString().slice(0,10);
    var findate;
    useEffect(() => {
        apiGetToDate({eventid:eventid}).then((data)=>{
            console.log(data.data.findate);
            findate=data.data.findate.slice(0,10);
            console.log(findate);
            findate='2021-01-01';
            if(curdate>=findate){
                 setshowpay(true);
            }
        })
        apiProgressCustomer({eventid:eventid}).then((data) => {
            // console.log(data);
            setpdata(data);
            setshowprog(true);
        })
    },[])

    function handlemkp(event){
        setmkp(event.target.value);
    }

    const makepayment=async () => {
        const result1=await apiMakePayment({amt:mkp,eventid:eventid});
        console.log(result1);
        Store.addNotification({...toastNotification,message:result1.data.message,type:result1.data.flag})
        navigate('/eventsComplete')
    }

  return (
    <>
        <div className={`${styles.headerPC}`}>
            <Navbar />
            <h1>EVENT ID : {eventid}</h1>
        </div>
        <br /><br />
        {showprog?<Progress pdata={pdata.data} />:<>No message available yet</>}
        <br/><br/>
        {showpay?<>
            {/* <input type='number' value={mkp} onChange={handlemkp} /> */}
            <input type='button' value='Make Payment' onClick={makepayment} />
        </>:<></>}
    </>      
  )
}

export default ProgressCustomer