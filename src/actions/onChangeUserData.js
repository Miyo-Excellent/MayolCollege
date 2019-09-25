import {CHANGE_USER_DATA} from "../actionTypes";

export default function onChangeUserData({data = {}, dispatch}) {
  dispatch({type: CHANGE_USER_DATA, payload: data});
}
