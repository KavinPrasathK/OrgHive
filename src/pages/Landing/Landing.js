import React,{useContext, useEffect, useState} from 'react'
// import styles from "./Landing.module.css"
// import React from "react";
import styles from "./Landing-style.css";
import Navbar from "../../components/Navbar/Navbar";
import ButtonCust from "../../components/Button/ButtonCust";
import ButtonOrg from "../../components/Button/ButtonOrg";

function Landing(){

    const [x,setx]=useState(1);
    useEffect(()=>{
        if(localStorage.getItem('loginState')==1){
            setx(1);
          }else if(localStorage.getItem('loginState')==2){
            setx(2);
          }else{
              setx(3);
          }
    },[])

    console.log(document.getElementsByClassName("button"));
    return(
        <div className="header">
            <Navbar y={x} sety={setx}/>
            <div className="headerText">
                <h1>Want to make your events more special? Then you've come to the right place!</h1>
                <h4>A Site with more than 100+ Professional Event Organisers</h4>
            </div>
            <div className="button">
                {x==1?<>
                <a href="/loginCustomer"><ButtonCust text="Login as Customer"/></a>
                <a href="/loginOrganizer"><ButtonOrg text="Login as Organizer"/></a>
                </>:<></>}
                {x==2?<>
                <a href="/profile"><ButtonOrg text="View Profile"/></a>
                <a href="/eventsinprogress"><ButtonOrg text="Events In Progress"/></a>
                <a href="/eventsComplete"><ButtonOrg text="Events Completed"/></a>
                </>:<></>}
                {x==3?<>
                <a href="/profile"><ButtonCust text="View Profile"/></a>
                <a href="/createEventCustomer"><ButtonCust text="Create Event"/></a>
                <a href="/eventsinprogress"><ButtonCust text="Events In Progress"/></a>
                <a href="/eventsComplete"><ButtonCust text="Events Completed"/></a>
                
                </>:<></>}

                
            </div>
        </div>
    );
}

export default Landing;