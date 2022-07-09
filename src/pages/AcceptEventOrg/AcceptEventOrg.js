import { React , useState , useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import styles from './AcceptEventOrg.modules.css';
import { apiEventDetail,apiDeleteReqOrg,apiAcceptReqOrg} from '../../auth/auth';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { toastNotification } from '../../components/Notifications/toast';
import ButtonCust from '../../components/Button/ButtonCust';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';

const orgId = localStorage.getItem('orgId');

function AcceptEventOrg(){
    let navigate = useNavigate();
    let { eventid } = useParams();
    const [ events , setEvents ] = useState([]);
    const [ fetched , setFetched ] = useState(false);
    const [ newBudget , setBudget ] = useState(0);
    const [ description , setDescription ] = useState("");

    var data = { EVENTID:eventid };
    useEffect(()=>{
        apiEventDetail(data).then((res)=>{
            if (res.status >= 200 && res.status <= 299) {
                setEvents(res.data);
                setFetched(true);
                console.log(res.data);
                console.log(fetched);
                console.log(events);
            }
            else{
                console.log("hello");
            }
        });    
    },[]);

    function handleBudget(event){
        setBudget(event.target.value);
    }
    function handleDescription(event){
        setDescription(event.target.value);
    }
    const acceptEvent = (async (evnt,usr)=>{
        var evntdata = {USERNAME: usr, EVENTID : evnt, ORGID : orgId, BUDGET : newBudget, DESCRIPTION : description };
        const res = await apiAcceptReqOrg(evntdata);
        if (res.status >= 200 && res.status <=299){
            Store.addNotification({...toastNotification, type:"success",message:"Request accepted"});
            navigate('/AcceptEventsOrganizer');
        }
        else{
            Store.addNotification({ ...toastNotification, message:'Error', flag:'danger' });
        }
    });

    const rejectEvent = (async (evnt)=>{
        var evntdata = {EVENTID : evnt, ORGID : orgId };
        const res = await apiDeleteReqOrg(evntdata);
        if (res.status >= 200 && res.status <=299){
            Store.addNotification({...toastNotification, type:"success",message:"Request rejected"});
            navigate('/AcceptEventsOrganizer');
        }
        else{
            Store.addNotification({ ...toastNotification, message:'Error', flag:'danger' });
        }
    });

    return (
        <div>
            <div className="headerA">
                <Navbar /><br/>
                <h1>Event {eventid}</h1>
            </div>
            {events.map((item)=>{
            return (fetched) ? (
            <div>
                <div className="eventCardAE">
                    <div>
                        <div>Date : {(item.FROMDATE).slice(0,10)}</div>
                        <div>Event : {(item.EVENTNAME[0]).toUpperCase() + (item.EVENTNAME).slice(1)}</div>
                        <div>Expected Budget : {(item.BUDGET)}</div>
                        <div>Location : {(item.PREFERREDLOCATON)}</div>
                        <div>Food Arrangements : {(item.FOODPREFERENCE)?"Required":"Not Required"}</div>
                        <div>Customer : {(item.FIRSTNAME)+" "+(item.LASTNAME)+" ("+(item.USERNAME)+")"}</div>
                        <div>Contact : {(item.PHONE)}</div><br/>
                    </div>
                    Enter the Budget with which you can complete the event : <br/>
                    <input type="number" name="newBudget" onChange={handleBudget}></input><br/>
                    Description<br/>
                    <textarea name="description" onChange={handleDescription} />
                    <br/>
                    <button onClick={()=>acceptEvent(item.EVENTID,item.USERNAME)}>Accept</button>
                    <button onClick={()=>rejectEvent(item.EVENTID)}>Reject</button>
                </div>
            </div>)
            : (<></>)})};
            <Footer />     
        </div>
  );
}

export default AcceptEventOrg;