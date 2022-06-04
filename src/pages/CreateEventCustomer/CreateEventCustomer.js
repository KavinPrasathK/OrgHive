import React, { useEffect } from 'react';
import styles from "./CreateEventCustomer.module.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import {apiCreateEventCustomer,apiGetOrganizerDataCreateEventCustomer} from '../../auth/auth';
import cryptoRandomString from 'crypto-random-string';
import ButtonCust from '../../components/Button/ButtonCust'
import {useNavigate} from 'react-router-dom';



function Organizer(props) {

  
  var rating=parseFloat(props.rating);
  const [isSent,setisSent]=React.useState(false);

  function addorg(orgid){
    var arr=props.orgdata;
    arr.push({
      orgid:orgid,
      username:localStorage.getItem('userName')
    })
    props.setorgdata(arr);
    // console.log(props.orgdata);

    setisSent(!isSent)
  }

  async function removeorg(orgid){
    var arr=props.orgdata;
    var newarr=arr.filter((orgd)=>{
      return orgd.orgid!=orgid
    })
    // console.log(newarr);
    await props.setorgdata(newarr);
    // console.log(props.orgdata);
    setisSent(!isSent)
    
  }
  
  return(
    <div className={`${styles.card}`}>
      <h1 className={`${styles.head}`}>{props.orgid}</h1>
      <div className={`${styles.content}`}>
          <span>Organzation Name : {props.name}</span><br/>
          <span>Manager Name     : {props.manager}</span><br />
          <span>Email            : {props.email}</span><br />
          <span>Contact1         : {props.contact1}</span><br />
          <span>Contact2         : {props.contact2==''?'NA':props.contact2}</span><br />
          <span>Rating           : {rating==0.0?'Not available':rating}</span><br />
          <input type='button' value={isSent?'Selected':'Select'} onClick={isSent?()=>removeorg(props.orgid):()=>addorg(props.orgid)}></input>

      </div>
    </div>
  )
}



function Organizers(props){
    const [orgcomp,setorgcomp]=React.useState([]);
    // const []
  useEffect(()=>{
    var x=props.eventname;
    apiGetOrganizerDataCreateEventCustomer(x).then((data)=>{
      // console.log(data.data);
      setorgcomp(data.data);
    }
    )
    },[props.eventname]);
    // console.log(orgcomp);
    var orgc=orgcomp.map((item,i)=>{
      return <Organizer orgid={item.ORGID} name={item.NAME} manager={item.MANAGER} email={item.EMAIL} contact1={item.CONTACT1} 
      contact2={item.CONTACT2} address={item.ADDRESS} rating={item.RATING} orgdata={props.orgdata} setorgdata={props.setorgdata}/>
    })
    return(
        orgc
    )

  };


function CreateEventCustomer() {
  let navigate=useNavigate();
    const [orgdata,setorgdata]=React.useState([]);
    const [org,setorg]=React.useState(false);
    var orgx=false;
    const [eventdata,seteventdata]=React.useState({
        eventID:"",
        username:localStorage.getItem('userName'),
        eventname:"",
        fromdate:null,
        todate:null,
        preferredlocation:"",
        budget:0,
        food:false,
        description:""
    })
    const [fromdate,setfromdate]=React.useState(null);
    const [todate,settodate]=React.useState(null);
    const [food,setfood]=React.useState(false);
    function handleChange(event){
      setorg(false);
      seteventdata((prevData)=>{
          return{
              ...prevData,
              [event.target.name]:event.target.value
          }
      })
    }

    function handlefromDate(event){
      setorg(false);
      setfromdate(event);
      console.log(event);
    }
    function handletoDate(event){
      setorg(false);
      settodate(event);
      console.log(event);
    }

    function handlefood(event){
      setorg(false);
      setfood(!food);
      console.log(food);
    }

    function formvalidate(data){
      if(data.eventname==""){
        Store.addNotification({...toastNotification,message:'Enter a valid event name'})
        return false;
      }
      if(data.fromdate==null){
        Store.addNotification({...toastNotification,message:'Enter a valid start date'})
        return false;
      }
      if(data.description==""){
        Store.addNotification({...toastNotification,message:`Description can't be empty`})
        return false;
      }
      return true;
    }

    const onSubmit= async() => {

      var str='E'+cryptoRandomString({length: 6, type: 'alphanumeric'});
      var data={...eventdata,fromdate:fromdate,todate:todate,food:food,eventID:str}
      // console.log(data);

      var x=formvalidate(data);
      if(x){
        setorgdata([]);
        setorg(true);
        // console.log(data);
        // console.log('success');
          // const res=await apiCreateEventCustomer(data);
          // console.log(res);
          // if(res.status>=200 && res.status<=299){
              // navigate('/');
          // }
          // Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag})
          // console.log(res.data);
      //   res.redirect('/loginCustomer')
      };
  }
  
  const submitpage=async ()=>{
    // console.log();
    // console.log(orgdata);
    const data={...eventdata,fromdate:fromdate,todate:todate,food:food,eventID:'E'+cryptoRandomString({length: 6, type: 'alphanumeric'}),orgdata:orgdata}
    // console.log(data);
    const res=await apiCreateEventCustomer(data);
    console.log(res);
    if(res.status>=200 && res.status<=299){
      Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag});
      navigate('/');
    }else{
      Store.addNotification({...toastNotification,message:'Error..'});
    }
  }

  
  return (
    <>
    <div className={`${styles.card}`}>
        <label>Event Name: <br/><select  name="eventname" onChange={handleChange} className={`${styles.inputfields}`}> 
          <option value="">-</option>
          <option value="wedding">wedding</option>
          <option value="birthday">birthday</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
          </select>
        </label><br/>
        <label>Preferred Location:  <br/><input type='text' name='preferredlocation' onChange={handleChange} value={eventdata.preferredlocation } className={`${styles.inputfields}`}/></label><br/>
        <br/>
        <label>Description :  <br/><textarea name='description' onChange={handleChange} value={eventdata.description} className={`${styles.inputfields}`}/></label><br/>
        <label>Budget:  <br/><input type="number" name="budget"  onChange={handleChange} value={eventdata.budget} className={`${styles.inputfields}`}/></label><br/>
        <label>Food :  <input type='checkbox' name="food" onChange={handlefood} checked={food} /></label><br/>

        <label>StartDate :  <br/><DatePicker selected={fromdate} name='fromdate' onChange={handlefromDate} className={`${styles.inputfields}`}
                                 dateFormat='dd/MM/yyyy'
                                 showYearDropdown
                                 scrollableMonthYearDropdown
                                //  popperContainer={CalendarContainer}
                                 popperPlacement='top'
          /></label><br/>

           <label>ToDate :  <br/><DatePicker selected={todate} name='todate' onChange={handletoDate} className={`${styles.inputfields}`}
                                 dateFormat='dd/MM/yyyy'
  
                                 showYearDropdown
                                 scrollableMonthYearDropdown
                                //  popperContainer={CalendarContainer}
                                 popperPlacement='top'
                                 isClearable
          /></label><br/>
        <ButtonCust text='Show Organizers' func={onSubmit}/>
        {/* <input type='button' onClick={onSubmit} value='Create'/> */}
          
    </div>
    {org?<Organizers eventname={eventdata.eventname} orgdata={orgdata} setorgdata={setorgdata} />:<></>}

    {org?<input type='button' value='Submit' onClick={submitpage}></input>:<></>}
    </>

  )
}

export default CreateEventCustomer