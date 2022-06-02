import logo from './logo.svg';
import './App.css';

import SignUpCustomer from './pages/SignUpCustomer/SignUpCustomer';
import SignUpOrganizer from './pages/SignUpOrganizer/SignUpOrganizer';
import LoginCustomer from "./pages/LoginCustomer/LoginCustomer";
import LoginOrganizer from './pages/LoginOrganizer/LoginOrganizer';
import Landing from "./pages/Landing/Landing";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProfileCustomer from './pages/ProfileCustomer/ProfileCustomer';
import ProfileOrganizer from './pages/ProfileOrganizer/ProfileOrganizer';
import PlsLogin from './pages/PlsLogin/PlsLogin';
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
      <Route path="/*" element={<PageNotFound />} />

    </Routes>
  )
}

const OrgRoutes = () =>{
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/profile' element={<ProfileOrganizer/>}/>
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