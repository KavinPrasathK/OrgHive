import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiEventsInProgressOrganizer } from "../../auth/auth";
import Navbar from '../../components/Navbar/Navbar';
import styles from "./EventsInProgressOrganizer.module.css"
import Footer from '../../components/Footer/Footer';


function Epcitem(props) {
    let navigate=useNavigate();
    function redir (eventid){
        navigate('/progress/'+eventid);
    }

    return (
    <div className={`${styles.card}`} onClick={()=>redir(props.eventid)} >
        <div className={`${styles.container}`} >
            <h3>{props.eventname.toUpperCase()}</h3><br />
            <span className={`${styles.subhead}`}>Event Id : </span>{props.eventid}<br />
            <span className={`${styles.subhead}`}>Organizer Name : </span>{props.orgname}<br />
            <span className={`${styles.subhead}`}>Description : </span>{props.description}<br />

        </div>
 

    </div>
    )
}

function Epc(props){
    var arr=props.epcdata;
    var newarr=arr.map((item,i) => {
        return <><Epcitem  eventname={item.EVENTNAME} eventid={item.EVENTID} orgname={item.NAME} description={item.DESCRIPTION}/><br/></>
    })
    return(
        newarr
    )
}


function EventsinProgressOrganizer(){
    const orgid=localStorage.getItem('orgId');
    const [epcdata,setepcdata]=useState([]);
    const [showepc,setshowepc]=useState(false);
    
    useEffect(()=>{
        // console.log(orgid);
        apiEventsInProgressOrganizer({orgid:orgid}).then((data)=>{
            console.log(data.data.data);
            setepcdata(data.data.data);
            setshowepc(true);
        })
    },[])
    return (
        <>
        <div className={`${styles.headerEPC}`}>
            <Navbar />
            <h1>Events In Progress</h1>
        </div>
        <br /><br />
        {showepc?<Epc epcdata={epcdata}/>:<>No events in progress</>}
        <Footer />
        </>  
    )
}
export default EventsinProgressOrganizer;
