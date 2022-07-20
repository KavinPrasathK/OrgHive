import { React , useState , useEffect , useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './AcceptEventsOrganizer.modules.css';
import {apiGetEventDetails} from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { toastNotification } from '../../components/Notifications/toast';
import ButtonCust from '../../components/Button/ButtonCust';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';

var orgId = localStorage.getItem('orgId');

function AcceptEventsOrganizer() {
    let navigate = useNavigate();
    var data = {ORGID:orgId};
    const [ eventAvl , setEventAvl ] = useState(false);
    const [ eventData , setEventData ] = useState([]);

    useEffect(()=>{
        // console.log('sdj');
        apiGetEventDetails(data).then((res)=>{
            if (res.status >= 200 && res.status <= 299) {
                setEventAvl(true);
                setEventData(res.data);
                console.log(eventData);
            }
            else {
                Store.addNotification({ ...toastNotification, message: 'No Events Found!', type:"danger"});
                setEventAvl(false);
            }
        });    
    },[]);

    return (
        <div>
            <div className="headerAE">
                <Navbar /><br/>
                <h2>Hello {orgId}!</h2>
                <h1>Events in your Queue</h1>
            </div>
            <div className={(eventAvl)?"eventCardHidden":"eventCard"}>No events found in your queue!</div>
            <div>
            {eventData.map((item,i)=>{
                return (eventAvl)?(
                <div className="eventCard">
                    <div>
                        <div>Date : {(item.FROMDATE).slice(0,10)}</div>
                        <div>Event : {(item.EVENTNAME[0]).toUpperCase() + (item.EVENTNAME).slice(1)}</div>
                        <div>Location : {(item.PREFERREDLOCATON)}</div>
                        <div>Customer : {(item.FIRSTNAME)+" "+(item.LASTNAME)+" ("+(item.USERNAME)+")"}</div>
                    </div>
                    <button onClick={()=>navigate('/aeo/'+item.EVENTID)}>Show Details</button>
                </div>
                ):<></>;
            })}
            </div>
            <Footer />
        </div>
  );
}

export default AcceptEventsOrganizer