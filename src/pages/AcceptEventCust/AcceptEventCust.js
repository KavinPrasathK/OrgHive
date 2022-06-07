import { React , useState , useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import styles from './AcceptEventCust.modules.css';
import { apiEventOrgDetail,apiDeleteReqCust,apiAcceptReqCust} from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { toastNotification } from '../../components/Notifications/toast';
import ButtonCust from '../../components/Button/ButtonCust';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';

var username = localStorage.getItem('userName');

function AcceptEventOrg(){
    let navigate = useNavigate();
    let { urldata } = useParams();
    const orgId = urldata.slice(0,10);
    const eventid = urldata.slice(11);
    const [ events , setEvents ] = useState([]);
    const [ fetched , setFetched ] = useState(false);

    var data = { EVENTID:eventid , ORGID:orgId};
    useEffect(()=>{
        apiEventOrgDetail(data).then((res)=>{
            if (res.status >= 200 && res.status <= 299) {
                setEvents(res.data);
                setFetched(true);
                // console.log(res.data);
                // console.log(fetched);
                // console.log(events);
            }
            else{
                // console.log("hello");
            }
        });    
    },[]);

    const acceptEvent = (async (evnt,usr)=>{
        var evntdata = {USERNAME: usr, EVENTID : evnt };
        // const res = await apiAcceptReqOrg(evntdata);
        // if (res.status >= 200 && res.status <=299){
        //     Store.addNotification({...toastNotification, type:"success",message:"Request accepted"});
        //     navigate('/AcceptEventsOrganizer');
        // }
        // else{
        //     Store.addNotification({ ...toastNotification, message:'Error', flag:'danger' });
        // }
    });

    const rejectEvent = (async (evnt,org)=>{
        var evntdata = {EVENTID : evnt, ORGID : org};
        const res = await apiDeleteReqCust(evntdata);
        if (res.status >= 200 && res.status <=299){
            Store.addNotification({...toastNotification, type:"success",message:"Request rejected"});
            navigate('/AcceptEventCustomer');
        }
        else{
            Store.addNotification({ ...toastNotification, message:'Error', flag:'danger' });
        }
    });

    return (
        <div>
            <div className="headerA">
                <Navbar /><br/>
                <h1>Event {eventid} : Organizer {orgId}</h1>
            </div>
            {events.map((item)=>{
            return (fetched) ? (
            <div>
                <div className="eventCardAE">
                    <div>
                        <div>Organizer-ID : {(item.FROMDATE).slice(0,10)}</div>
                        <div>Organizer Name : {(item.EVENTNAME[0]).toUpperCase() + (item.EVENTNAME).slice(1)}</div>
                        <div>Manager : {(item.BUDGET)}</div>
                        <div>Contact : {(item.PREFERREDLOCATION)}</div>
                        <div>Mail : {(item.FOODPREFERENCE)?"Required":"Not Required"}</div>
                        <div>Rating : {(item.FIRSTNAME)+" "+(item.LASTNAME)+" ("+(item.USERNAME)+")"}</div>
                        <div>Budget Proposed : {(item.PHONE)}</div><br/>
                    </div>
                    <br/>
                    <button onClick={()=>acceptEvent(item.EVENTID,item.USERNAME)}>Accept</button>
                    <button onClick={()=>rejectEvent(item.EVENTID,item.ORGID)}>Reject</button>
                </div>
            </div>)
            : (<></>)})};
            <button onClick={()=>navigate('/AcceptEventCustomer')}></button> 
            <Footer/>       
        </div>
  );
}

export default AcceptEventOrg;