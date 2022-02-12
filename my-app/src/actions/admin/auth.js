import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "../alert";

const axios = require("axios");
const  {USER_REGISTER_REQUEST, ADMIN_REGISTRATION, ADMIN_REGISTRATION_FAIL, ADMIN_VERIFICATION_FAIL, ADMIN_VERIFICATION, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN, ADMIN_LOGIN_FAIL, ADMIN_LOADED, ADMIN_LOADING, ADMIN_LOADING_FAIL, ADMIN_LOGOUT} = require("../../constants/admin/auth")
const Cookies = require('js-cookie')

export const AdminSignup = (details) => async (dispatch) => {
 dispatch({ type: USER_REGISTER_REQUEST});
 //now only sending request to backend take the response data and save accordingly and use everywhere
 try {
     await axios.post("/api/admin/cr_acc", details).then((res) => {
        dispatch({
           type: ADMIN_REGISTRATION,
           payload: res.data
        });
        dispatch(setAlert(`Hi!,${res.data.data.admin_name} an Email has been sent with a verification link!`,'success'))
        return res.data
     })
    //  dispatch({type: USER_REGISTERED, payload: res.data})
 } catch (error) {
    console.log(error.message)
    dispatch({
       type: ADMIN_REGISTRATION_FAIL
    })
    dispatch(setAlert(error.response.data.message, "error"));
    return error

 }
}

export const AdminVerify = (id) => async (dispatch) => {
   dispatch({ type: USER_REGISTER_REQUEST});
   //now only sending request to backend take the response data and save accordingly and use everywhere
   try {
       await axios.get(`/api/admin/verify/${id}`).then((res) => {
          dispatch({
             type: ADMIN_VERIFICATION,
             payload: res.data
          });
          dispatch(setAlert(`Hi!,${res.data.data.admin_name} You can login`,'success'))
          return res.data
       })
      //  dispatch({type: USER_REGISTERED, payload: res.data})
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: ADMIN_VERIFICATION_FAIL
      })
      dispatch(setAlert(error.response.data.message, "error"));
      return error
  
   }
}

export const AdminSignin = (details) => async (dispatch) => {
   dispatch({ type: ADMIN_LOGIN_REQUEST});
   //now only sending request to backend take the response data and save accordingly and use everywhere
   try {
       await axios.post(`/api/admin/login`, details).then((res) => {
          dispatch({
             type: ADMIN_LOGIN,
             payload: res.data
          });
          dispatch(setAlert(`Hi ${res.data.data.profile_data.admin_name}, Welcome to Library`,'success'))
          console.log(details.remember_me)
          if(details.remember_me == "remember") Cookies.set("cs_at", res.data.data.token)
          return res.data
       })
      //  dispatch({type: USER_REGISTERED, payload: res.data})
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: ADMIN_LOGIN_FAIL
      })
      dispatch(setAlert(error.response.data.message, "error"));
      return error
  
   }
}

export const AdminLoad = () => async (dispatch) => {
   if(Cookies.get('cs_at')){
      dispatch({ type: ADMIN_LOADING});
      setAuthToken(Cookies.get('cs_at'))
   //now only sending request to backend take the response data and save accordingly and use everywhere
   try {
       await axios.get(`/api/admin/admin_profile` ).then((res) => {
          dispatch({
             type: ADMIN_LOADED,
             payload: res.data
          });
         //  dispatch(setAlert(`Hi ${res.data.data.admin_name}, Welcome to Library`,'success'))
          return res.data
       })
      //  dispatch({type: USER_REGISTERED, payload: res.data})
   } catch (error) {
      console.log(error.message)
      dispatch({
         type: ADMIN_LOADING_FAIL
      })
      dispatch(setAlert("Please Login/Signup", "info"));
      return error
  
   }
   }
}

//ADMIN logout
export const AdminLogout = () => async (dispatch) => {
   dispatch({type: ADMIN_LOGOUT})
}