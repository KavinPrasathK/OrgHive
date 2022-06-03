import axios from 'axios';

const api =axios.create({
    baseURL: "http://localhost:3001"
});

export const apiSignUpCustomer = async (SignUpCustomerData) => {
    try {
      const response = await api.post("SignUpCustomer", SignUpCustomerData);
      return response;
    } 
    catch (error) {
      return error.response;
    }
};

export const apiLoginCustomer = async (loginCustomerData) => {
    try{
        const response=await api.post("loginCustomer",loginCustomerData);
        return response;
    }
    catch(error){
        return error.response;
    }
};

export const apiSignUpOrganizer = async (SignUpOrganizerData) => {
  try {
    const response = await api.post("SignUpOrganizer", SignUpOrganizerData);
    return response;
  } 
  catch (error) {
    return error.response;
  }
};
 
export const apiLoginOrganizer = async (loginOrganizerData) => {
  try{
      const response=await api.post("loginOrganizer",loginOrganizerData);
      return response;
  }
  catch(error){
      return error.response;
  }
};

export const apiCreateEventCustomer =async (eventdata)=>{
  try{
    const response=await api.post('createEventCustomer',eventdata);
    return response;
  }
  catch(error){
    return error.response;
  }
}

export const apiGetOrganizerDataCreateEVentCustomer=async (eventname) =>{
  try{
    const response=await api.post('getOrganizerDataCreateEVentCustomer',eventname);
    return response;
  }
  catch(error){
    return error.response;
  }
}