import { React , useState } from 'react';
import styles from "./SignUpOrganizer.module.css";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { toastNotification } from "../../components/Notifications/toast";
import { apiSignUpOrganizer } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import cryptoRandomString from 'crypto-random-string';

function SignUpOrganizer() {
  var navigate = useNavigate();
  const [ signUpOrganizerData, setSignUpOrganizerData ] = useState({
      name:"",
      manager:"",
      contact1:"",
      contact2:"",
      email:"",
      address:"",
      gstin:"",
      password:""
  })

  function handleChange(event){
    setSignUpOrganizerData((prevData)=>{
      return {
        ...prevData,
        [event.target.name]:event.target.value
      }
    });
  }

  function formValidate(data){
    var name=/[a-zA-Z]/;
    var manager=/[a-zA-Z]/;
    var contact1=/[1-9]{1}[0-9]{9}/;
    var contact2=/[1-9]{1}[0-9]{9}/;
    var email=/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    var address=/[a-zA-Z0-9'\.\-\s\,]/;
    var gstin=/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/;

    for (let key in data){
      console.log(key+" "+data[key]);
      switch(key){
        case "name":
          if (!name.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "manager":
          if (!manager.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "contact1":
          if (!contact1.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "contact2":
          if (data.contact2!==""){
            if (!contact2.test(data[key])){
              Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
              return false;
            }
          }
          break;
        case "email":
          if (!email.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "address":
          if (!address.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "gstin":
          if (!gstin.test(data[key])){
            Store.addNotification({...toastNotification,message:'Enter a valid '+key, flag:'danger'});
            return false;
          }
          break;
        case "password":
          if(data[key].length<8){
              Store.addNotification({...toastNotification,message:'Password should be atleast 8 characters long',flag:'danger'})
              return false;
          }
          break;
      }
    }
    return true;
  }

  const onSubmit = async () => {
    var data = {...signUpOrganizerData};
    var x = formValidate(data);
    var orgID = 'ORG'+cryptoRandomString({length:5, type:'alphanumeric'})+cryptoRandomString({length:2, type:'numeric'});
    var data = {...signUpOrganizerData,orgId : orgID};
    console.log(data);
    if (x){
      const res = await apiSignUpOrganizer(data);
      console.log(res);
      if (res.status>=200 && res.status<=299){
        navigate('/');
      }
      Store.addNotification({...toastNotification,message:res.data.message,flag:res.data.flag});
    };  
  }

  return (
    <div>
        <label>Organization Name : <input type='text' name='name' onChange={handleChange} value={signUpOrganizerData.name} required/></label><br/>
        <label>Manager Name: <input type='text' name='manager' onChange={handleChange} value={signUpOrganizerData.manager} /></label><br/>
        <label>Contact Number 1: <input type='text' name='contact1' onChange={handleChange} value={signUpOrganizerData.contact1} required/></label><br/>
        <label>Contact Number 2: <input type='text' name='contact2' onChange={handleChange} value={signUpOrganizerData.contact2} /></label><br/>
        <label>Mail ID : <input type='email' name="email" onChange={handleChange} value={signUpOrganizerData.email} required/></label><br/>
        <label>Address : <textarea name='address' onChange={handleChange} value={signUpOrganizerData.address}/></label><br/>
        <label>GSTIN : <input type='text' name="gstin" onChange={handleChange} value={signUpOrganizerData.gstin} /></label><br/>
        <label>Password : <input type='password' name='password' onChange={handleChange} val={signUpOrganizerData.password} /></label><br/>
        <input type='button' onClick={onSubmit} value='SignUp'/>
    </div>
  );
}

export default SignUpOrganizer;