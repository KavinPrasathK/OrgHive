import axios from 'axios';

const api =axios.create({
    baseURL: "http://localhost:3001"
})

export const apiSignUpCustomer = async (SignUpCustomerData) => {
    try {
      const response = await api.post("SignUpCustomer", SignUpCustomerData);
      
    //   console.log(response);
      return response;
    } catch (error) {
      return error.response;
    }
};

export const apiLoginCustomer = async (loginCustomerData) => {
    try{
        // console.log(loginCustomerData);
        const response=await api.post("loginCustomer",loginCustomerData);
        return response;
    }catch(error){
        return error.response;
    }
}
  