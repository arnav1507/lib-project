
import axios from 'axios'
import { GET_LIBRARIES_FAIL, GET_LIBRARIES_REQUEST, GOT_LIBRARIES, SEND_REQUEST_DONE, SEND_REQUEST_FAILED, SEND_REQUEST_STARTED } from '../../constants/student/library';
import { setAlert } from "../alert";

export const loadLibraries = () => async (dispatch) => {
    dispatch({ type: GET_LIBRARIES_REQUEST });
    try {
        await axios.get("/api/student/lib_list").then(res => {
            dispatch({
                type: GOT_LIBRARIES,
                payload: res.data
            })
            dispatch(setAlert(`${res.data?.data?.length} Libraries Found!!`, 'success'))
            return res.data
        })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: GET_LIBRARIES_FAIL
        })
        dispatch(setAlert(error.response.data.message, 'error'))
        return error
    }
}

//send a request to library
export const sendRequest = (id) => async (dispatch) => {
    dispatch({ type: SEND_REQUEST_STARTED });
    try {
        await axios.post(`/api/student/lib_rqst/${id}`).then(res => {
            dispatch({
                type: SEND_REQUEST_DONE,
                payload: res.data
            })
            dispatch(setAlert("Request Sent", "success"));
            return res.data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: SEND_REQUEST_FAILED
        })
        dispatch(setAlert("Something Went Wrong!!", "error"))
    }
}
