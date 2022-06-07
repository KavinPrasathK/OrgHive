import { React , useState , useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './AcceptEventCustomer.modules.css';
import { apiEventReqDetail } from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { toastNotification } from '../../components/Notifications/toast';
import ButtonCust from '../../components/Button/ButtonCust';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';

var username = localStorage.getItem('userName');

function AcceptEventCustomer() {
    let navigate = useNavigate();
    var data = {USERNAME:username};
    const [ eventAvl , setEventAvl ] = useState(false);
    const [ eventData , setEventData ] = useState([]);

    useEffect(()=>{
        apiEventReqDetail(data).then((res)=>{
            if (res.status >= 200 && res.status <= 299) {
                setEventAvl(true);
                setEventData(res.data);
                console.log(eventData);
            }
            else {
                Store.addNotification({ ...toastNotification, message: 'No events added!', type:"danger"});
                setEventAvl(false);
            }
        });    
    },[]);

    return (
        <div>
            <div className="headerAE">
                <Navbar /><br/>
                <h2>Hello {username}!</h2>
                <h1>Event Requests to be accepted</h1>
            </div>
            <div className={(eventAvl)?"eventCardHidden":"eventCard"}>No events founds!<br/><br/>
            <button onClick={()=>navigate('/createEventCustomer')}>Add Event</button></div>
            <div className='contentDiv'>
            {eventData.map((item,i)=>{
                return (eventAvl)?(
                <div className="eventCard">
                    <div>
                        <div>Request from {(item.ORGID)}</div>
                        <div>Proposal for your Event : {(item.EVENTNAME[0]).toUpperCase() + (item.EVENTNAME).slice(1)} with Event-ID : {(item.EVENTID)}
                        has been accepted, with a proposed budget of Rs. {(item.NEWBUDGET)}</div>
                        <div>Message from the Organizer : {(item.REQDESCRIPTION)}</div>
                    </div><br/>
                    <button onClick={()=>navigate('/aec/'+item.ORGID+'$'+item.EVENTID)}>Show Details</button><br/>
                </div>
                ):<></>;
            })}
            </div>
            <Footer/>
        </div>
  );
}

export default AcceptEventCustomer