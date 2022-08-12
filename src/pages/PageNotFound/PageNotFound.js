import React from 'react'
import styles from "./PageNotFound.module.css"
import BgSnowAnim from '../../components/BgSnowAnim/BgSnowAnim';

function PageNotFound() {
  return (
    <div >
    <BgSnowAnim/>
    <div className={`${styles.pnf}`}>Err404! PageNotFound</div>
    <h1 className={`${styles.foot}`}>This Page doesn't exist : (</h1>
    </div>
  )
}

export default PageNotFound