  import axios from "axios";
  import Cookies from 'js-cookie';
  import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL } from '../constants/userConstants';
  const signin = (email, password) => async (dispatch) => {
    try{
      dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: { email, password },
      });
      const {data}= await axios.post("/api/users/signin",{email,password});
      dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
      Cookies.set("userInfo",JSON.stringify(data));
    }catch(error){
          dispatch({type:USER_SIGNIN_FAIL,payload:error.message});
    }
  };
  export {signin}
