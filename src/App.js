import logo from './logo.svg';
import './App.css';


import SignUpCustomer from './pages/SignUpCustomer/SignUpCustomer';
import SignUpOrganizer from './pages/SignUpOrganizer/SignUpOrganizer';
import LoginCustomer from "./pages/LoginCustomer/LoginCustomer";
import LoginOrganizer from './pages/LoginOrganizer/LoginOrganizer';
import Landing from "./pages/Landing/Landing";
import Navbar from "./components/Navbar/Navbar";
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
import React from 'react';
const StyledApp = styled.div``;




function App() {
  var x;
  if(localStorage.getItem('loginstate')){
    x=localStorage.getItem('loginstate');
  }else{
    x=1;
  }
  const [loginstate,setloginstate]=React.useState(x);


  return (
    
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <StyledApp>
      <div className="App">
          <ReactNotifications />
          {/* <loginContext.Provider  value={{loginstate,setloginstate}} /> */}

          <Router>
            <Navbar />
            {/* {isOrganizer?<OrgRoutes/>:<CustRoutes/>} */}
            {x==1?<LogoutRoutes/>:<Dummy/>}
            {x==2?<OrgRoutes/>:<Dummy/>}
            {x==3?<CustRoutes/>:<Dummy/>}
            {/* {isLogin?<LoginRoutes/>:<LogoutRoutes/>} */}
            {/* <AllRoutes /> */}
          </Router>
        {/* <loginContext.Provider/> */}
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


// const AllRoutes = () => {
//   return (
//     <Routes>
 
      
//     </Routes>
//   );
// };


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

// const LoginRoutes = () =>{
//   return (
//     <Routes>
//       {isOrganizer?<OrgRoutes/>:<CustRoutes/>}
//       <Route path="/*" element={<PageNotFound />} />
//     </Routes>
//   )
// }


export default App;
