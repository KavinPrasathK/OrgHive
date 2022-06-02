import React from 'react';
import styles from "./CreateEventCustomer.module.css";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toastNotification } from '../../components/Notifications/toast';
import {apiCreateEventCustomer} from '../../auth/auth';
import cryptoRandomString from 'crypto-random-string';
import ButtonCust from '../../components/Button/ButtonCust'



function organizer(props) {
  
}


function CreateEventCustomer() {

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
      seteventdata((prevData)=>{
          return{
              ...prevData,
              [event.target.name]:event.target.value
          }
      })
    }

    function handlefromDate(event){
      setfromdate(event);
      console.log(event);
    }
    function handletoDate(event){
      settodate(event);
      console.log(event);
    }

    function handlefood(event){
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
      console.log(x);
      if(x){
        // console.log(data);
        // console.log('success');
          const res=await apiCreateEventCustomer(data);
          console.log(res);
          // if(res.status>=200 && res.status<=299){
              // navigate('/');
          // }
          // Store.addNotification({...toastNotification,message:res.data.message,type:res.data.flag})
          // console.log(res.data);
      //   res.redirect('/loginCustomer')
      };
  }
  

  

  return (
    <div className={`${styles.card}`}>
        <label>Event Name: <br/><select  name="eventname" onChange={handleChange} className={`${styles.inputfields}`}> 
          <option value="">-</option>
          <option value="volvo">Volvo</option>
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
        <ButtonCust text='Show Organizers'/>
        <input type='button' onClick={onSubmit} value='Create'/>
          
    </div>
  )
}

export default CreateEventCustomer