import React from "react";
import styles from "./BgSnowAnim.module.css";

function BgSnowAnim(){
    return (
    <>
    <div className={`${styles.stars_1}`}></div>
    <div className={`${styles.stars_2}`}></div>
    <div className={`${styles.stars_3}`}></div>
    </>
    );
}
export default BgSnowAnim;