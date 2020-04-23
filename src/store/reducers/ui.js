import { 
  UI_START_LOADING, 
  UI_STOP_LOADING,
  TECH_FOUNDED,
  TECH_UNFOUNDED,
  HIDE_ALERT_BOX,
  SHOW_SUCCESS_ALERT,
  SHOW_ERROR_ALERT,
  HIDE_TITLE,
  SHOW_TITLE,
  REQUEST_DECLIENED,
  REQUEST_ACCEPTED,
  SHOW_TIME_CUSTOMER,
  HIDE_TIME_CUSTOMER,
  TASK_GOT_REJECTED,
  REMOVE_FUNCTION,
  SHOW_TRANSACTION_SLIP,
  SAVEINTERVAL_ID,
  SAVE_INTERNET_CONNECTION_INFO,
  SAVE_REQUEST_SENDED_STATUS,
  LOGOUT_LOADER
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  techFound:false,
  showError:false,
  showSuccess:false,
  responseData:'',
  ShowTimeModal:false,
  title:true,
  requestAccepted:false,
  TaskRejected:false,
  TaskStarted:false,
  functionId:0,
  transactionSlpi:false,
  intervalId:0,
  InternetInfo:true,
  RequestSended:false,
  logoutLoader:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case TECH_FOUNDED:
      return{
        ...state,
        techFound:true
      }  
    case TECH_UNFOUNDED:
      return{
        ...state,
        techFound:false
      }
    case SHOW_ERROR_ALERT:
      return{
        ...state,
        showError:true,
        responseData:action.response
      }
    case SHOW_SUCCESS_ALERT:
      return{
        ...state,
        showSuccess:true,
        responseData:action.response
      }
    case HIDE_ALERT_BOX:
      return{
        ...state,
        showError:false,
        showSuccess:false,
        responseData:''
      }
    case SHOW_TITLE:
      return{
        ...state,
        title:true
      }
    case HIDE_TITLE:
      return{
        ...state,
        title:false
      }
    case REQUEST_ACCEPTED:
      return{
        ...state,
        requestAccepted:true
      }
    case REQUEST_DECLIENED:{
      return{
        ...state,
        requestAccepted:false
      }
    }
    case HIDE_TIME_CUSTOMER:{
      return{
        ...state,
        ShowTimeModal:false
      }
    }
    case SHOW_TIME_CUSTOMER:{
      return{
        ...state,
        ShowTimeModal:true
      }
    }
    case TASK_GOT_REJECTED:{
      return{
        ...state,
        TaskRejected:true
      }
    }
    case REMOVE_FUNCTION:{
      return{
        ...state,
        functionId:action.id
      }
    }
    case SHOW_TRANSACTION_SLIP:{
      return{
        ...state,
        transactionSlpi:true
      }
    }
    case SAVEINTERVAL_ID:{
      return{
        ...state,
        intervalId:action.data
      }
    }  
    case SAVE_INTERNET_CONNECTION_INFO:{
      return{
        ...state,
        InternetInfo:action.data
      }
    }
    case SAVE_REQUEST_SENDED_STATUS :{
      return{
        ...state,
        RequestSended:action.data
      }
    } 
    case LOGOUT_LOADER:{
      return{
        ...state,
        logoutLoader:action.data
      }
    }               
    default:
      return state;
  }
};

export default reducer;