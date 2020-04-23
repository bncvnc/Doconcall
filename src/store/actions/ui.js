import { 
    UI_START_LOADING, 
    UI_STOP_LOADING,
    TECH_FOUNDED,
    TECH_UNFOUNDED,
    SHOW_ERROR_ALERT,
    HIDE_ALERT_BOX,
    SHOW_SUCCESS_ALERT,
    SHOW_TITLE,
    HIDE_TITLE,
    REQUEST_ACCEPTED,
    REQUEST_DECLIENED,
    SHOW_TIME_CUSTOMER,
    HIDE_TIME_CUSTOMER,
    TASK_GOT_REJECTED,
    REMOVE_FUNCTION,
    SHOW_TRANSACTION_SLIP,
    SAVEINTERVAL_ID,
    SAVE_INTERNET_CONNECTION_INFO,
    SAVE_REQUEST_SENDED_STATUS,
    LOGOUT_LOADER
 } from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};
export const TechFound = ( ) => {

    return{
        type:TECH_FOUNDED,
    }
}
export const TechNotFounded = ( ) => {
    return{
        type:TECH_UNFOUNDED
    }
}
export const ShowErrorAlert = (response) => {
    return{
        type:SHOW_ERROR_ALERT,
        response:response
    }
}
export const ShowSuccessAlert = (response) => {
    return{
        type:SHOW_SUCCESS_ALERT,
        response:response

    }
}
export const hideAlerts = () =>{
    return{
        type:HIDE_ALERT_BOX

    }
}
export const ShowTitle = () =>{
    return{
        type:SHOW_TITLE
    }
}
export const HideTitle = () =>{
    return{
        type:HIDE_TITLE
    }
}
export const techAcceptedRequest = () =>{
    return{
        type:REQUEST_ACCEPTED
    }
}
export const techDecliendedRequest = () =>{
    return{
        type:REQUEST_DECLIENED
    }
}
export const ShowTimeForCustomer = () =>{
    return{
        type:SHOW_TIME_CUSTOMER
    }
}
export const HideTimeForCustomer = () =>{
    return{
        type:HIDE_TIME_CUSTOMER
    }
}
export const TaskRejected = () =>{
    return{
        type:TASK_GOT_REJECTED
    }
}
export const RemoveFunction = (id) =>{
    return{
        type:REMOVE_FUNCTION,
        id:id 
    }
}
export const ShowTransactionSlip = () =>{
    return{
        type:SHOW_TRANSACTION_SLIP,
    }
}
export const SaveintervalId = (data) =>{
    return{
        type:SAVEINTERVAL_ID,
        data:data
    }
    
}
export const SaveInternetConnectionInfo = (data) =>{
    return{
        type:SAVE_INTERNET_CONNECTION_INFO,
        data:data
    }
}
export const RequestSended = (data) =>{
    return{
        type:SAVE_REQUEST_SENDED_STATUS,
        data:data
    }
}
export const LogoutLoader = (data) =>{
    return{
        type:LOGOUT_LOADER,
        data:data
    }
}