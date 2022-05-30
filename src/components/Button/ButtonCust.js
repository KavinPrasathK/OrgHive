import React from "react";
import styles from "./ButtonCust.modules.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreativeCommonsBy } from '@fortawesome/free-brands-svg-icons';

function ButtonCust(props){
        return (
        <button className="button-cust" onClick=""><FontAwesomeIcon icon={faCreativeCommonsBy} className="icon"/>{props.text}</button>
        );
}
export default ButtonCust;