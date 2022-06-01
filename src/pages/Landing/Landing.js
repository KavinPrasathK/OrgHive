import React,{useContext} from 'react'
// import styles from "./Landing.module.css"
// import React from "react";
import styles from "./Landing-style.css";
import Navbar from "../../components/Navbar/Navbar";
import ButtonCust from "../../components/Button/ButtonCust";
import ButtonOrg from "../../components/Button/ButtonOrg";

function Landing(){
    return(
        <div className="header">
            <Navbar />
            <div className="headerText">
                <h1>Want to make your events more special? Then you've come to the right place!</h1>
                <h4>A Site with more than 100+ Professional Event Organisers</h4>
            </div>
            <div className="button">
                <a href="/SignUpCustomer"><ButtonCust text="Login as Customer"/></a>
                <a href="/SignUpOrganizer"><ButtonOrg text="Login as Organizer"/></a>
            </div>
        </div>
    );
}

export default Landing;