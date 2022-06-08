import logo from './logo.svg';
import './App.css';

import CreateEventCustomer from './pages/CreateEventCustomer/CreateEventCustomer';
import SignUpCustomer from './pages/SignUpCustomer/SignUpCustomer';
import SignUpOrganizer from './pages/SignUpOrganizer/SignUpOrganizer';
import LoginCustomer from "./pages/LoginCustomer/LoginCustomer";
import LoginOrganizer from './pages/LoginOrganizer/LoginOrganizer';
import Landing from "./pages/Landing/Landing";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProfileCustomer from './pages/ProfileCustomer/ProfileCustomer';
import ProgressCustomer from './pages/progressCustomer/progressCustomer';
import ProgressOrganizer from './pages/progressOrganizer/progressOrganizer';
import ProfileOrganizer from './pages/ProfileOrganizer/ProfileOrganizer';
import EventsCompleteCustomer from './pages/EventsCompleteCustomer/EventsCompleteCustomer';
import EventsCompleteOrganizer from './pages/EventsCompleteOrganizer/EventsCompleteOrganizer';
import PlsLogin from './pages/PlsLogin/PlsLogin';
import EventsinProgressCustomer from './pages/EventsInProgressCustomer/EventsInProgressCustomer';
import EventsinProgressOrganizer from './pages/EventsInProgressOrganizer/EventsInProgressOrganizer';
import { ReactNotifications } from 'react-notifications-component';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {darkTheme,lightTheme,GlobalStyles} from './themes';
import styled,{ ThemeProvider } from 'styled-components';
import React,{useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
const StyledApp = styled.div``;
var x;

function App() {
  if(localStorage.getItem('loginState')){
    x=localStorage.getItem('loginState');
  }else{
    localStorage.setItem('loginState',1);
    x=1;
    console.log('hiii');
  }
  


  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <StyledApp>
      <div className="App">
      {/* <Navbar /> */}

          <ReactNotifications />
          {/* <loginContext.Provider  value={{loginstate,setloginstate}} /> */}
          <Router>
            {/* {localStorage.getItem('loginState')==1?<Navbar />:<Dummy/>} */}
            {/* <Navbar /> */}
            {/* {isOrganizer?<OrgRoutes/>:<CustRoutes/>} */}
            {localStorage.getItem('loginState')==1?<LogoutRoutes/>:<Dummy/>}
            {localStorage.getItem('loginState')==2?<OrgRoutes/>:<Dummy/>}
            {localStorage.getItem('loginState')==3?<CustRoutes/>:<Dummy/>}
            {/* {isLogin?<LoginRoutes/>:<LogoutRoutes/>} */}
            {/* <AllRoutes /> */}
          </Router>
      </div>
      </StyledApp>
    </ThemeProvider>
  );
}

const Dummy = () =>{
  return(
    <Routes>

    </Routes>
  )
}

const CustRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/profile' element={<ProfileCustomer />}/>
      <Route path='/createEventCustomer' element={<CreateEventCustomer />} />
      <Route path='/createEventCustomer' element={<CreateEventCustomer />} />
      <Route path='/progress/:eventid' element={<ProgressCustomer />} />
      <Route path='/eventsinprogress' element={<EventsinProgressCustomer />} />
      <Route path='eventsComplete' element={<EventsCompleteCustomer />} />

      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

const OrgRoutes = () =>{
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/profile' element={<ProfileOrganizer/>}/>
      <Route path='/progress/:eventid' element={<ProgressOrganizer />} />
      <Route path='/eventsinprogress' element={<EventsinProgressOrganizer />} />
      <Route path='/eventsComplete' element={<EventsCompleteOrganizer />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

const LogoutRoutes = () =>{
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/SignUpCustomer' element={<SignUpCustomer/>}/>
      <Route path='/SignUpOrganizer' element={<SignUpOrganizer/>}/>
      <Route path="/loginCustomer" element={<LoginCustomer />} />
      <Route path="/loginOrganizer" element={<LoginOrganizer/>} />
      <Route path="/profile" element={<PlsLogin />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App;