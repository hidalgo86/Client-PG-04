import axios from "axios";
import { GET_USER_LOGIN } from "./ActionType";

export const register = (data) => {
  return async () => {
    try {
      const newUser = {
        given_name: data.given_name ? data.given_name.toLowerCase() : undefined,
        family_name: data.family_name
          ? data.family_name.toLowerCase()
          : undefined,
        nickname: data.nickname.toLowerCase(),
        email: data.email,
        picture: data.picture,
      };
      await axios.post("https://pf-api-04.up.railway.app/user", newUser);
      // console.log("User register on DB", user);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserLogin = (email) => {
  return async (dispatch) => {
    try {
      const loginUser = await axios.get(
        `https://pf-api-04.up.railway.app/user?email=${email}`
      );
      return dispatch({
        type: GET_USER_LOGIN,
        payload: loginUser.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
