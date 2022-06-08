import React, { useEffect, useState } from 'react'
import styles from "./progressCustomer.module.css"
import { useParams } from 'react-router-dom'
import { apiProgressCustomer } from '../../auth/auth';
import Navbar from '../../components/Navbar/Navbar';


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
    console.log(arr);

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
    useEffect(() => {
        apiProgressCustomer({eventid:eventid}).then((data) => {
            console.log(data);
            setpdata(data);
            setshowprog(true);
        })
    },[])

  return (
    <>
        <div className={`${styles.headerPC}`}>
            <Navbar />
            <h1>EVENT ID : {eventid}</h1>
        </div>
        <br /><br />
        {showprog?<Progress pdata={pdata.data} />:<>No message available yet</>}
        
    </>      
  )
}

export default ProgressCustomer