import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiEventsCompleteCustomer } from "../../auth/auth";
import Navbar from '../../components/Navbar/Navbar';
import styles from "./EventsCompleteCustomer.module.css"
import Footer from '../../components/Footer/Footer';


function Eccitem(props) {
    let navigate=useNavigate();


    return (
    <div className={`${styles.card}`} >
        <div className={`${styles.container}`} >
            <h3>{props.eventname.toUpperCase()}</h3><br />
            <span className={`${styles.subhead}`}>Event Id : </span>{props.eventid}<br />
            <span className={`${styles.subhead}`}>Organizer Name : </span>{props.orgname}<br />
            <span className={`${styles.subhead}`}>Description : </span>{props.description}<br />

        </div>
 

    </div>
    )
}

function Ecc(props){
    var arr=props.eccdata;
    var newarr=arr.map((item,i) => {
        return <><Eccitem  eventname={item.EVENTNAME} eventid={item.EVENTID} orgname={item.NAME} description={item.DESCRIPTION}/><br/></>
    })
    return(
        newarr
    )
}


function EventsCompleteCustomer(){
    const username=localStorage.getItem('userName');
    const [eccdata,seteccdata]=useState([]);
    const [showecc,setshowecc]=useState(false);
    
    useEffect(()=>{
        console.log(username);
        apiEventsCompleteCustomer({username:username}).then((data)=>{
            console.log(data.data.data);
            seteccdata(data.data.data);
            setshowecc(true);
        })
    },[])

    return (
        <>
        <div className={`${styles.headerEPC}`}>
            <Navbar />
            <h1>Events Completed</h1>
        </div>
        <br /><br />
        {showecc?<Ecc eccdata={eccdata}/>:<>No events in progress</>}
        <Footer/>
        
        </>  
    )
}
export default EventsCompleteCustomer;
