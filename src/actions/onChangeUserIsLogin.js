import {CHANGE_USER_IS_LOGIN} from "../actionTypes";

export default function onChangeUserIsLogin({value = false, dispatch}) {
  dispatch({type: CHANGE_USER_IS_LOGIN, payload: value});
}
