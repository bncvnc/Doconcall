import {
    SAVE_USERINFO,
    LOGOUT_USER,
    SAVE_TECHS,
    TASK_DATA,
    SAVE_FCM_TOKEN,
    SAVE_USER_NAME,
    TO_RERENDER,
    SAVE_APP_MODE,
    SAVE_SUBSCRIBED_DATA,
    SAVE_SERVICESUSED_DATA
} from '../actions/actionTypes';
const initialState = {
    isLoggedIn: false,
    isVerified:false,
    user: {},
    tech:{},
    taskData:{},
    fcmToken:'',
    torerender:'',
    mode:'',
    SubscribedChallenges:[],
    ServicesUsed:[]
}   
const reducer = (state = initialState,action) =>{
    switch (action.type) {
        case SAVE_USERINFO:
            return{
                ...state,
                isLoggedIn:action.user.isLoggedIn,
                user:action.user.user,
                isVerified:action.user.isVarified
                
            }
        case LOGOUT_USER:
            return{
                ...state,
                isLoggedIn:false,
                user:{}
            }
        case SAVE_TECHS:
            return{
                ...state,
                tech:action.tech
            }
        case TASK_DATA :
            return{
                ...state,
                taskData:action.Data
            } 
        case SAVE_USER_NAME:
            return{
                ...state,
                isLoggedIn:action.user.isLoggedIn,
                user:action.user.user
            }    
        case SAVE_FCM_TOKEN:
            return{
                ...state,
                fcmToken:action.token
            }
        case TO_RERENDER:
            return{
                ...state,
                torerender:action.check

            }   
        case SAVE_APP_MODE:
            return{
                ...state,
                mode:action.mode
            }   
        case SAVE_SUBSCRIBED_DATA:
            return{
                ...state,
                SubscribedChallenges:action.data
            }     
        case SAVE_SERVICESUSED_DATA:
            return{
                ...state,
                ServicesUsed:action.data
            }    
        default:
            return state;
            
    }
}
export default reducer;