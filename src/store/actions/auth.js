import {
  SAVE_USERINFO,
  SAVE_TECHS,
  SAVE_COUNTRY_DATA,
  SAVE_SEARCHED_DATA,
  SAVE_USER_NAME,
  SAVE_FCM_TOKEN,
  TO_RERENDER,
  SAVE_APP_MODE,
  SAVE_SUBSCRIBED_DATA,
  SAVE_SERVICESUSED_DATA
} from './actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import {URI} from '../../components/variables/variables';
import {uiStartLoading,uiStopLoading,ShowErrorAlert,ShowSuccessAlert,LogoutLoader} from './index';
import { Navigation } from 'react-native-navigation';
import changeScreen from '../../components/changeScreen/changeScreen';
import appNavigation from '../../components/navigation/navigation';
import { Root, Popup, } from 'popup-ui'
export const loginUser = (authdata) =>{
    return dispatch => {
      dispatch(uiStartLoading());
    fetch(URI + 'api/customer/login', {
      method:'POST',
      headers: {
      Accept:'application/json',
      'Content-Type':'application/json',
      },
      body:JSON.stringify({
        "password":authdata.password,
        "email":authdata.email,
      }),
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      "POST Response",
      "Response Body -> "+JSON.stringify(responseData)

        console.log(responseData);
        // return;
        if (responseData.success) {
          
          // alert(`Loged in Successful!`);
          dispatch(uiStopLoading());

          let userData = {
            ...responseData.data
          };
          let appState = {
            isLoggedIn: true,
            user: userData,
            payment_added:responseData.data.payment_added?true:false,
            isVarified:responseData.data.verified?true:false
          };

          AsyncStorage.setItem("appState", JSON.stringify(appState));

          dispatch(saveUserInfo(appState))
        
          changeScreen('doconcall.MainScreen');

           

            setTimeout(()=>{
              Popup.show({
                type: 'Success',
                // title: 'You have Successfully Logged In',
                button: false,
                textBody: 'You have Successfully Logged In',
                buttontext: 'Ok',

                callback: () => Popup.hide()
            })
              
            },1000)
            // dispatch(ShowSuccessAlert('Successfully Logged In'));
      
          
            
          
        } else if(!responseData.success) {
          dispatch(uiStopLoading());
          Popup.show({
            type: 'Danger',
            title: 'Alert',
            button: false,
            textBody: responseData.data,
            buttontext: 'Ok',
              
            callback: () => Popup.hide()
        })
          // dispatch(ShowErrorAlert(responseData.data));
        }
    
      }).catch((err)=>{
        console.log(err);
        console.log('errpr');
      })
      .done();

    }
}
export const LoginAsCustomer = () =>{
  return (dispatch,getState) => {
    // dispatch(uiStartLoading());
  fetch(URI + 'api/ActAsACustomerLogin', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "email":getState().user.user.email,
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
    // if(responseData.data.verified)
    // {
    //   alert('Hellow');
    // }
      if (responseData.success) {
        
        // alert(`Loged in Successful!`);
        dispatch(uiStopLoading());

        let userData = {
          name: responseData.data.name,
          id: responseData.data.id,
          email: responseData.data.email,
          auth_token: responseData.data.auth_token,
          timestamp: new Date().toString(),
          technician:0,
          status:responseData.data.status,
          conformed:responseData.data.conformed,
          rating:responseData.data.ratings,
          supervisor:responseData.data.supervisor,
          currency:responseData.data.currency,
          country:responseData.data.country,
          userAmount:responseData.data.userAmount,
          profile:responseData.data.profile,
          loggedIn:responseData.data.loggedIn,
          Phone:responseData.data.Phone,
          country_Code:responseData.data.country_Code
   
          
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          isVarified:responseData.data.verified?true:false,
          special:false
        };
        //console.log(appState);
        // save app state with user date in local storage
        // AsyncStorage["appState"] = JSON.stringify(appState);
        AsyncStorage.setItem("appState", JSON.stringify(appState));
        // try {
        //   AsyncStorage.getItem("appState");
         
        // } catch (error) {
        //   // Error saving data
        //   console.log(error);
        // }


        dispatch(saveUserInfo(appState))
        dispatch(AddFcmToUser());
      //   this.setState({
      //     isLoggedIn: appState.isLoggedIn,
      //     user: appState.user
      //   });
        //console.log(AsyncStorage.getItem("appState"));
        if(responseData.data.supervisor){
          // changeScreen('uncle-fixer.superviser');
          // return;
        }else if(responseData.data.verified)
        {
          // changeScreen('uncle-fixer.CustomerProfile');
          dispatch(ShowSuccessAlert('You have Successfully Logged In As a Customer'));
        }else{
          // changeScreen('uncle-fixer.verifiNumber')
        }
        
          
        
      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      console.log('errpr');
    })
    .done();

  }
}
export const saveUserInfo = (appState) => {
    return {
      type: SAVE_USERINFO,
      user: appState,
    };
  };

export const RunHook = (mode) =>{

  return{
    type:SAVE_APP_MODE,
    mode:mode
  }
}
  export const registerCustomer = (authdata,componentId) => {
 
    return (dispatch,getState) =>{
      // console.log(componentId);
      // return;
      dispatch(uiStartLoading());
        fetch(URI + 'api/Register/Customer', {
            method:'POST',
            headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
            },
            body:JSON.stringify({
              "password":authdata.password,
              "email":authdata.email,
              "name":authdata.name,
              'CNIC':authdata.CNIC,
              'breadwinner':authdata.breadwinner,
              'phone':authdata.myNumber,
              'house_no':authdata.house_no,
              
            }),
            })
            .then((response) => response.json())
            .then((responseData) => {

            "POST Response",
            "Response Body -> "+JSON.stringify(responseData)

            console.log(responseData);

            // return;
              if (responseData.success) {
                dispatch(uiStopLoading());
                dispatch(uiStopLoading());

                let userData = {
                  ...responseData.data
                };
                let appState = {
                  isLoggedIn: true,
                  user: userData,
                  payment_added:responseData.data.payment_added?true:false,
                  isVarified:false
                };
      
                AsyncStorage.setItem("appState", JSON.stringify(appState));
      
                dispatch(saveUserInfo(appState))
              
              
                appNavigation('doconcall.LoginScreen');
                  
                setTimeout(()=>{
                  console.log('asdasdas');
                  Popup.show({
                    type: 'Success',
                    // title: 'Successfully Registered this user',
                    button: false,
                    textBody: 'A verification email has been sent to your registered email address',
                    buttontext: 'Ok',
                      
                    callback: () => Popup.hide()
                })
                  
                },1000)
               
                // dispatch(ShowSuccessAlert('Successfully Registered this user'));
                // Navigation.setRoot({
                //   root: {
                //     stack: {
                //       id: 'AppStack',	
                //       children: [
                //         {
                //           component: {
                //             name: 'uncle-fixer.verifiNumber'
                //           }
                //         }
                //       ],
                //       options: {
                //         topBar: {
                //           visible: false
                //         }
                //       }
                //     }
                //   }
                // });
                
                
              } else if(!responseData.success) {
                dispatch(uiStopLoading());
                Popup.show({
                  type: 'Danger',
                  title: 'Alert',
                  button: false,
                  textBody: `Registration Failed! `+ responseData.data,
                  buttontext: 'Ok',
                    
                  callback: () => Popup.hide()
              })
                // dispatch(ShowErrorAlert(`Registration Failed! `+ responseData.data));

              }
            }).catch((err)=>{
              console.log('sdas')
            })
            .done();
    }
  }
export const logoutUser = () =>{
  return (dispatch,getState) =>{
    // dispatch(LogoutLoader(true))
    let id= getState().user.user.id;
    dispatch(DisableStatus(id));
    //dispatch(authRemoveToken());
    dispatch(authClearStorage()).then(() =>{
      // pusherUnsubscribe();
      // pusher.unsubscribe('my-channel');
      // dispatch(LogoutLoader(false))

      appNavigation('doconcall.LoginScreen')
    })
    
}

}
export const authClearStorage = () => {
  return dispatch => {
    return AsyncStorage.removeItem("appState");
  };
};



export const registerTechnician = (userData) => {
  return (dispatch,getState) =>{
    dispatch(uiStartLoading());
      console.log(getState().tech.tech.name);
      fetch(URI + 'api/app/technician/register', {
          method:'POST',
          headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({
            "IdImage":userData.idImage,
            "verifiedImage":userData.verifiedImage,
            'name':getState().user.tech.name,
            'email':getState().user.tech.email,
            'password':getState().user.tech.password,
            'hearAboutUs':getState().user.tech.hearAboutUs,
            'franchiseCode':getState().user.tech.franchiseCode,
            'country':userData.country,
            'city':userData.city,
            'category':userData.category,
            'technician':1,
            'number':userData.myNumber,
            'apns_id':getState().user.fcmToken,
            'fcm':getState().user.fcmToken,
            'UploadSlfie':userData.UploadSlfie,
            'DrivingLicence':userData.DrivingLicence,
            'CarRegisterationImage':userData.CarRegisterationImage,
            'LiceneExpiration':userData.LiceneExpiration,
            'DrivingRegisterationExpiration':userData.DrivingRegisterationExpiration
          }),
          })
          .then((response) => response.json())
          .then((responseData) => {

          "POST Response",
          "Response Body -> "+JSON.stringify(responseData)
            console.log(responseData);
            if (responseData.success) {
              dispatch(uiStopLoading());
              // alert(`Registration Successful!`);
    
              let userData = {
                name: responseData.data.name,
                id: responseData.data.id,
                email: responseData.data.email,
                auth_token: responseData.data.auth_token,
                timestamp: new Date().toString(),
                technician:responseData.data.technician,
                category:responseData.data.category,
                status:responseData.data.status,
                conformed:responseData.data.conformed,
                images:responseData.data.UserImages,
                rating:responseData.data.ratings,
                currency:responseData.data.currency,
                country:responseData.data.country,
                userAmount:responseData.data.userAmount,
                paypallEmail:responseData.data.paypallEmail,
                minimumWithdraw:responseData.data.minimumWithdraw,
                profile:responseData.data.profile,
                loggedIn:1,
                eMoney:responseData.data.eMoney,
                Phone:responseData.data.Phone,
                promotion:responseData.data.promotion,
                driver:responseData.data.driver
              };
              let appState = {
                isLoggedIn: true,
                user: userData,
                isVarified:false,
                special:false
              };
              // save app state with user date in local storage
              // AsyncStorage["appState"] = JSON.stringify(appState);
              AsyncStorage.setItem("appState", JSON.stringify(appState));
              dispatch(saveUserInfo(appState))
              dispatch(AddFcmToUser());
              Navigation.setRoot({
                root: {
                  stack: {
                    id: 'AppStack',	
                    children: [
                      {
                        component: {
                          name: 'uncle-fixer.verifiNumber'
                        }
                      }
                    ],
                    options: {
                      topBar: {
                        visible: false
                      }
                    }
                  }
                }
              });
                 
              
            } else {
              dispatch(uiStopLoading());
              dispatch(ShowErrorAlert('Registeration Failed'));
            }
          }).catch((err) => {
            dispatch(uiStopLoading());
            console.log(err)})
          .done();
  }
}

export const TechloginUser = (authdata) =>{
  return dispatch => {
    dispatch(uiStartLoading());
  fetch(URI + 'api/technician/login', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "password":authdata.password,
      "email":authdata.email,
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
    console.log(responseData);
      if (responseData.success) {
        dispatch(uiStopLoading());
        // alert(`Loged in Successful!`);

        let userData = {
          name: responseData.data.name,
          id: responseData.data.id,
          email: responseData.data.email,
          auth_token: responseData.data.auth_token,
          timestamp: new Date().toString(),
          technician:responseData.data.technician,
          category:responseData.data.category,
          status:responseData.data.status,
          conformed:responseData.data.conformed,
          images:responseData.data.UserImages,
          rating:responseData.data.ratings,
          currency:responseData.data.currency,
          country:responseData.data.country,
          userAmount:responseData.data.userAmount,
          paypallEmail:responseData.data.paypallEmail,
          minimumWithdraw:responseData.data.minimumWithdraw,
          profile:responseData.data.profile,
          loggedIn:responseData.data.loggedIn,
          eMoney:responseData.data.eMoney,
          Phone:responseData.data.Phone,
          PaymentGateway:responseData.data.PaymentGateway,
          promotion:responseData.data.promotion,
          driver:responseData.data.driver
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          isVarified:responseData.data.verified?true:false,
          special:false
        };
        // save app state with user date in local storage
        // AsyncStorage["appState"] = JSON.stringify(appState);
        AsyncStorage.setItem("appState", JSON.stringify(appState));
        dispatch(saveUserInfo(appState));
        dispatch(AddFcmToUser());
        if(responseData.data.supervisor){
          // changeScreen('uncle-fixer.superviser');
        }
        if(responseData.data.verified)
        {
          // TechChange('uncle-fixer.TechProfile')
          dispatch(ShowSuccessAlert('Successfully Logged In'));
        }else{
          // changeScreen('uncle-fixer.verifiNumber')
        }
        
     
      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        if(responseData.token){
          Alert.alert(
            'Alert',
            'This user is already Loged in from another device would you like to logout from that device',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Logout', onPress: () => {
                dispatch(uiStartLoading())
                // dispatch(LogOutUserNotification(responseData.token))
              }},
            ],
            {cancelable: false},
          );
            return;
        }

        dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      dispatch(uiStopLoading());
      console.log(err)})
    .done();

  }
}

export const ClearStatus = () =>{

  return (dispatch,getState) => {
    let token = getState().user.user.auth_token;
    dispatch(uiStartLoading());
  fetch(URI + 'api/tech/status/change?token='+token, {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "id":getState().user.user.id,
      "status":getState().user.user.status
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)

      if (responseData.success) {
        dispatch(uiStopLoading());
        // alert(`Successfully Changed Yor Status`);
        
        let userData = {
          name: getState().user.user.name,
          id: getState().user.user.id,
          email: getState().user.user.email,
          auth_token: getState().user.user.auth_token,
          timestamp: new Date().toString(),
          technician:getState().user.user.technician,
          category:getState().user.user.category,
          rating:getState().user.user.rating,
          status:responseData.data,
          conformed:getState().user.user.conformed,
          currency:getState().user.user.currency,
          country:getState().user.user.country,
          userAmount:getState().user.user.userAmount,
          paypallEmail:getState().user.user.paypallEmail,
          minimumWithdraw:getState().user.user.minimumWithdraw,
          profile:getState().user.user.profile,
          loggedIn:getState().user.user.loggedIn,
          eMoney:getState().user.user.eMoney,
          Phone:getState().user.user.Phone,
          promotion:getState().user.user.promotion,
          driver:getState().user.user.driver
          
          
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          isVarified:true,
          special:false
        };
        AsyncStorage.setItem("appState", JSON.stringify(appState));
        dispatch(saveUserInfo(appState))
        dispatch(ShowSuccessAlert('Successfully Changed Your Status'));
          // console.log(data);
          // console.log(AsyncStorage.getItem('appState'))
      } else {
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      console.log('sdas')
    })
    .done();

  }
}
export const DisableStatus = (id) =>{

  return (dispatch,getState) => {


  fetch(URI + 'api/tech/status/disable', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "id":id,
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)

      if (responseData.success) {
        dispatch(authClearStorage()).then(() =>{
          // pusherUnsubscribe();
          pusher.unsubscribe('my-channel');
          dispatch(LogoutLoader(false))
          appNavigation('uncle-fixer.logout_screen')
        })
        dispatch(uiStopLoading());
      } else {
        // dispatch(uiStopLoading());
        dispatch(LogoutLoader(false))
        // alert(responseData.data);
        // dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      console.log('sdas')
      dispatch(LogoutLoader(false))
    })
    .done();

  }
}
export const changeStatus = () =>{

  return (dispatch,getState) => {
    let token = getState().user.user.auth_token;
    dispatch(uiStartLoading());
  fetch(URI + 'api/tech/status/change?token='+token, {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "id":getState().user.user.id,
      "status":getState().user.user.status
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)

      if (responseData.success) {
        dispatch(uiStopLoading());
        // alert(`Successfully Changed Yor Status`);
        
        let userData = {
          name: getState().user.user.name,
          id: getState().user.user.id,
          email: getState().user.user.email,
          auth_token: getState().user.user.auth_token,
          timestamp: new Date().toString(),
          technician:getState().user.user.technician,
          category:getState().user.user.category,
          rating:getState().user.user.rating,
          status:responseData.data,
          conformed:getState().user.user.conformed,
          currency:getState().user.user.currency,
          country:getState().user.user.country,
          userAmount:getState().user.user.userAmount,
          paypallEmail:getState().user.user.paypallEmail,
          minimumWithdraw:getState().user.user.minimumWithdraw,
          profile:getState().user.user.profile,
          loggedIn:getState().user.user.loggedIn,
          eMoney:getState().user.user.eMoney,
          Phone:getState().user.user.Phone,
          promotion:getState().user.user.promotion,
          driver:getState().user.user.driver
          

        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          isVarified:true,
          special:false
        };
        AsyncStorage.setItem("appState", JSON.stringify(appState));
        dispatch(saveUserInfo(appState))
        dispatch(ShowSuccessAlert('Your Status Is Successfully Changed'));
          // console.log(data);
          // console.log(AsyncStorage.getItem('appState'))
      } else {
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      console.log('sdas')
    })
    .done();

  }
}
export const saveTechDataAfterCheck = (authdata) => {
  return{
    type:SAVE_TECHS,
    tech:authdata
  }
}

export const getCountrysData = () =>{
  return dispatch =>{
    fetch(URI +'api/get/Countries')
    .then((response)=>response.json())
    .then((responseData) =>{
      countries = [];
      countries.push(responseData.data);

      dispatch(saveCountryData(countries));
    }).catch((err)=>{
      console.log('sdas')
    })
  }
}
export const SearchCountry = (text) => {
  return dispatch => {
    fetch(URI +'api/Search/Country?name='+text)
    .then((response)=>response.json())
    .then((responseData) =>{
      countries = [];
      countries.push(responseData.data);

      dispatch(SaveSearchedData(countries));
    }).catch((err)=>{
      console.log('sdas')
    })
  }
}
export const SaveSearchedData = (countries) => {
  return{
    type:SAVE_SEARCHED_DATA,
    countries:countries
  }
}
export const saveCountryData = (countries) =>{
  return{
    type:SAVE_COUNTRY_DATA,
    countries:countries
  }
} 


export const savetechsData = (authdata) => {
  return (dispatch,getState) => {
    let token = getState().user.user.auth_token;
    dispatch(uiStartLoading());
  fetch(URI + 'api/checkEmail', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "email":authdata.email
      
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
      if (responseData.success) {
        dispatch(uiStopLoading());
      //  changeScreen('uncle-fixer.TechRegSecond');
      Navigation.push(authdata.componentId, {
        component: {
          name: 'uncle-fixer.TechRegSecond',
          passProps: {
            text: 'Pushed screen'
          },
          options: {
            topBar: {
              visible:true,
              title:{
                text:'Register Fixer',
                alignment:'center'
              }
            },
            animations: {
                push: {
                   waitForRender: true
                }
             }
          }
        }
      });

      dispatch(saveTechDataAfterCheck(authdata))
      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      console.log('sdas')
    })
    .done();

  }
}

export const RefundRequest = (mailinfo,component) =>{
    return (dispatch,getState) =>{
      dispatch(uiStartLoading());
      fetch(URI + 'api/Send/Refund/Request', {
        method:'POST',
        headers: {
        Accept:'application/json',
        'Content-Type':'application/json',
        },
        body:JSON.stringify({
          "id":getState().user.user.id,
          'task_id':getState().pendingTasks.taskId,
          'condition':mailinfo.condition,
          'message':mailinfo.message,
          'partial':mailinfo.partial
          
        }),
        })
        .then((response) => response.json())
        .then((responseData) => {
          dispatch(uiStopLoading());
          dispatch(ShowSuccessAlert('Refund Request Sent Successfully'));
          // changeScreen('uncle-fixer.CustomerProfile');
          Navigation.pop(component)
          dispatch(GetCustomerCompletedTasks());

        "POST Response",
        "Response Body -> "+JSON.stringify(responseData)


          
      
        }).catch((err)=>{
          dispatch(uiStopLoading());
          console.log('sdas')
        })
        .done();
    }
}

export const VerifyAccount = (code)=>{

  return (dispatch,getState) => {
    dispatch(uiStartLoading());
  fetch(URI + 'api/Verify/Account', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "id":getState().user.user.id,
      "code":code,
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)

      if (responseData.success) {
        console.log(getState().user.user);
          let userData = {
            ...getState().user.user,
          };
          let appState = {
            isLoggedIn: true,
            user: userData,
            isVarified:true,
            special:false
          };
          AsyncStorage.setItem("appState", JSON.stringify(appState));
          dispatch(saveUserInfo(appState))
          
          changeScreen('doconcall.MainScreen');
          dispatch(uiStopLoading());
          return;
        dispatch(uiStopLoading());
        
        
      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        dispatch(ShowErrorAlert(responseData.data));
        alert(responseData.data);
      }
  
    }).catch((err)=>{
      console.log(err)
    })
    .done();

  }
}

export const SendNewVerificationNumber = ()=>{

  return (dispatch,getState) => {
    dispatch(uiStartLoading());
  fetch(URI + 'api/Send/New/Verification/number', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "id":getState().user.user.id,
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
    //console.log(responseData.data);
    console.log(responseData);
      if (responseData.success) {
        dispatch(uiStopLoading());
        
        // alert(responseData.data);
        // dispatch(ShowSuccessAlert(responseData.data));
        alert(responseData.data)
      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        alert(responseData.data);
        // dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      console.log(err)
    })
    .done();

  }
}

export const Namechange = (name) =>{
  return (dispatch,getState) => {
    // dispatch(uiStartLoading());
  fetch(URI + 'api/tech/name/change', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "id":getState().user.user.id,
      "name":name
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
    //console.log(responseData.data);
      if (responseData.success) {
        // dispatch(uiStopLoading());
        // dispatch(SaveName(responseData.name)); 
        let userData = {
          name: name,
          id: getState().user.user.id,
          email: getState().user.user.email,
          auth_token: getState().user.user.auth_token,
          timestamp: new Date().toString(),
          technician:getState().user.user.technician,
          category:getState().user.user.category,
          rating:getState().user.user.rating,
          status:getState().user.user.status,
          conformed:getState().user.user.conformed,
          currency:getState().user.user.currency,
          country:getState().user.user.country,
          userAmount:getState().user.user.userAmount,
          paypallEmail:getState().user.user.paypallEmail,
          profile:getState().user.user.profile,
          minimumWithdraw:getState().user.user.minimumWithdraw,
          loggedIn:getState().user.user.loggedIn,
          eMoney:getState().user.user.eMoney,
          Phone:getState().user.user.Phone,
          promotion:getState().user.user.promotion
          
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          isVarified:true,
          special:false
        };
        AsyncStorage.setItem("appState", JSON.stringify(appState));
        dispatch(saveUserInfo(appState))       
        // alert();
        dispatch(ShowSuccessAlert(responseData.data));

      } else if(!responseData.success) {
        // dispatch(uiStopLoading());
        dispatch(ShowErrorAlert(responseData.data));
        // alert(responseData.data);
      }
  
    }).catch((err)=>{
      console.log(err)
    })
    .done();

  }
}
export const SaveName = (name) => {

    return{
      type:SAVE_USER_NAME,
      name:name

    }
} 

export const ChangePassword = (password,newPassword) =>{
  return (dispatch,getState) => {
    // dispatch(uiStartLoading());
  fetch(URI + 'api/tech/password/change', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "id":getState().user.user.id,
      "password":password,
      "newPassword":newPassword
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
    //console.log(responseData.data);
      if (responseData.success) {
        // dispatch(uiStopLoading());
        // dispatch(SaveName(responseData.name)); 
        let userData = {
          name: getState().user.user.name,
          id: getState().user.user.id,
          email: getState().user.user.email,
          auth_token: getState().user.user.auth_token,
          timestamp: new Date().toString(),
          technician:getState().user.user.technician,
          category:getState().user.user.category,
          rating:getState().user.user.rating,
          status:getState().user.user.status,
          conformed:getState().user.user.conformed,
          currency:getState().user.user.currency,
          country:getState().user.user.country,
          userAmount:getState().user.user.userAmount,
          paypallEmail:getState().user.user.paypallEmail,
          minimumWithdraw:getState().user.user.minimumWithdraw,
          profile:getState().user.user.profile,
          loggedIn:getState().user.user.loggedIn,
          eMoney:getState().user.user.eMoney,
          Phone:getState().user.user.Phone,
          promotion:getState().user.user.promotion,
          driver:getState().user.user.driver,
          
          
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          isVarified:true,
          special:false
        };
        AsyncStorage.setItem("appState", JSON.stringify(appState));
        dispatch(saveUserInfo(appState))     
        dispatch(logoutUser());
        // alert(responseData.data);
        dispatch(ShowSuccessAlert(responseData.data));

      } else if(!responseData.success) {
        // dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      console.log(err)
    })
    .done();

  }
}
export const SetFcmToken = (token) =>{
  return{
    type:SAVE_FCM_TOKEN,
    token:token
  }
}
export const AddFcmToUser = (password,newPassword) =>{
  return (dispatch,getState) => {
    // dispatch(uiStartLoading());
  fetch(URI + 'api/Update/Fcm/Token', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "id":getState().user.user.id,
      "fcm":getState().user.fcmToken,

    }),
    })
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)

      if (responseData.success) {


      } else if(!responseData.success) {

        // dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      console.log(err)
    })
    .done();

  }
}
export const RefreshTech = () =>{
  return (dispatch,getState) => {
    // dispatch(uiStartLoading());
  fetch(URI + 'api/User/Tech/Refresh?email=' + getState().user.user.email)
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)

      if (responseData.success) {
        // dispatch(uiStopLoading());
        // alert(`Loged in Successful!`);

        let userData = {
          name: responseData.data.name,
          id: responseData.data.id,
          email: responseData.data.email,
          auth_token: responseData.data.auth_token,
          timestamp: new Date().toString(),
          technician:responseData.data.technician,
          category:responseData.data.category,
          status:responseData.data.status,
          conformed:responseData.data.conformed,
          images:responseData.data.UserImages,
          rating:responseData.data.ratings,
          supervisor:responseData.data.supervisor,
          currency:responseData.data.currency,
          country:responseData.data.country,
          userAmount:responseData.data.userAmount,
          paypallEmail:responseData.data.paypallEmail,
          minimumWithdraw:responseData.data.minimumWithdraw,
          profile:responseData.data.profile,
          loggedIn:responseData.data.loggedIn,
          eMoney:responseData.data.eMoney,
          Phone:responseData.data.Phone,
          PaymentGateway:responseData.data.PaymentGateway,
          promotion:responseData.data.promotion,
          driver:responseData.data.driver
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          isVarified:responseData.data.verified?true:false,
          special:false
        };
        // save app state with user date in local storage
        // AsyncStorage["appState"] = JSON.stringify(appState);
        AsyncStorage.setItem("appState", JSON.stringify(appState));
        dispatch(saveUserInfo(appState));
        dispatch(AddFcmToUser());
        // if(responseData.data.verified)
        // {
        //   changeScreen('uncle-fixer.TechProfile')
        //   dispatch(ShowSuccessAlert('Succesfully Loged In'));
        // }else{
        //   changeScreen('uncle-fixer.verifiNumber')
        // }
        
     
      } else if(!responseData.success) {
        dispatch(logoutUser());
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    })
    .catch((err)=>console.log(err))
    .done();

  }
}

export const RefreshCustomer = () =>{
  return (dispatch,getState) => {
    // dispatch(uiStartLoading());
  fetch(URI + 'api/User/Cust/Refresh?email='+getState().user.user.email)
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
      console.log(responseData);
      if (responseData.success) {
        

        let userData = {
          name: responseData.data.name,
          id: responseData.data.id,
          email: responseData.data.email,
          auth_token: responseData.data.auth_token,
          timestamp: new Date().toString(),
          technician:responseData.data.technician,
          status:responseData.data.status,
          conformed:responseData.data.conformed,
          rating:responseData.data.ratings,
          supervisor:responseData.data.supervisor,
          currency:responseData.data.currency,
          country:responseData.data.country,
          userAmount:responseData.data.userAmount,
          profile:responseData.data.profile,
          loggedIn:responseData.data.loggedIn,
          Phone:responseData.data.Phone,
          country_Code:responseData.data.country_Code

          
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          isVarified:responseData.data.verified?true:false,
          special:false
        };

        AsyncStorage.setItem("appState", JSON.stringify(appState));

        dispatch(saveUserInfo(appState))
        dispatch(AddFcmToUser());

      } else if(!responseData.success) {
        dispatch(logoutUser());
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    })
    .catch((err) =>console.log(err))
    .done();

  }
}


export const LogOutUserNotification = (token)  =>{
  return (dispatch,getState) =>{
      let body;
        body = {
          to: token,
          notification: {
            title: 'Logout',
              channel: 'default',
              body: 'This user has logout',
              icon:'u_9',
              sound: "default",
              priority: "high",
              show_in_foreground: false,
          },
          data: {
            custom_notification: {
              title: 'Logout',
              channel: 'default',
              body: 'This user has logout',
              icon:'u_9',
              sound: "default",
              priority: "high",
              show_in_foreground: false,
            },
            logout:'logout'
          },
          priority: 10
        };

  
      firebaseClient.send(JSON.stringify(body), "notification");
      alert('Successfully logged out from other device.Now you may proceed to login')
      dispatch(uiStopLoading());
  }
}
export const CheckIfCustomerIsVerifiedOrNot = (email) =>{
  return (dispatch,getState) => {
    // dispatch(uiStartLoading());
  fetch(URI + 'api/User/Cust/Refresh?email='+email)
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
      console.log(responseData);
      if (responseData.success) {

        if(responseData.data.verified){
          let userData = {
            ...responseData.data
            
          };
          let appState = {
            isLoggedIn: true,
            user: userData,
            isVarified:responseData.data.verified?true:false,

          };
  
          AsyncStorage.setItem("appState", JSON.stringify(appState));
  
          dispatch(saveUserInfo(appState))
          dispatch(AddFcmToUser());
          changeScreen('uncle-fixer.CustomerProfile');
        }

        
      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    })
    .catch((err) =>console.log(err))
    .done();

  }
}

export const CheckIfTechnicianIsVerifiedOrNot = (email) =>{
  return (dispatch,getState) => {
    // dispatch(uiStartLoading());
  fetch(URI + 'api/User/Tech/Refresh?email='+email)
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
      console.log(responseData);
      if (responseData.success) {
        if(responseData.data.verified){
          let userData = {
            name: responseData.data.name,
            id: responseData.data.id,
            email: responseData.data.email,
            auth_token: responseData.data.auth_token,
            timestamp: new Date().toString(),
            technician:responseData.data.technician,
            status:responseData.data.status,
            conformed:responseData.data.conformed,
            rating:responseData.data.ratings,
            supervisor:responseData.data.supervisor,
            currency:responseData.data.currency,
            country:responseData.data.country,
            userAmount:responseData.data.userAmount,
            profile:responseData.data.profile,
            loggedIn:responseData.data.loggedIn,
            eMoney:responseData.data.eMoney,
            Phone:responseData.data.Phone,
            promotion:getState().user.user.promotion,
            driver:responseData.data.driver
  
            
          };
          let appState = {
            isLoggedIn: true,
            user: userData,
            isVarified:responseData.data.verified?true:false,
            special:false
          };
  
          AsyncStorage.setItem("appState", JSON.stringify(appState));
  
          dispatch(saveUserInfo(appState))
          dispatch(AddFcmToUser());
          TechChange('uncle-fixer.TechProfile');
        }

        

      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    })  
    .catch((err) =>console.log(err))
    .done();

  }
}
 
export const ForRerender = () =>{
  return{
    type:TO_RERENDER,
    check:Math.random()
  }
}

export const ForegetPasswordLink = (email) =>{
  return dispatch =>{
    dispatch(uiStartLoading());
    fetch(URI + 'password/email',{
      method:"POST",
      headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({
              "email":email
          }),
          }).then((response)=>response.json())
          .then((responseData)=>{
            console.log(responseData);
            dispatch(uiStopLoading())
            Popup.show({
              type: 'Success',
              // title: 'Successfully Registered this user',
              button: false,
              textBody: 'We Have Emailed You A Password Verification Link',
              buttontext: 'Ok',
                
              callback: () => Popup.hide()
          })
              // dispatch(ShowSuccessAlert('We Have Emailed You A Password Verification Link'));
          })
          .catch((err)=>{
            console.log(err);
            dispatch(uiStopLoading())
            Popup.show({
              type: 'Success',
              // title: 'Successfully Registered this user',
              button: false,
              textBody: 'We Have Emailed You A Password Verification Link',
              buttontext: 'Ok',
                
              callback: () => Popup.hide()
          })
          })
  }
}
export const SavePaypallEmail = (email) =>{
  return (dispatch,getState) =>{
    dispatch(uiStartLoading());
    fetch(URI + 'api/save/paypall/email',{
      method:"POST",
      headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({
              "email":email,
              "id":getState().user.user.id
          }),
          }).then((response)=>response.json())
          .then((responseData)=>{
            console.log(responseData);
            dispatch(uiStopLoading())

              dispatch(ShowSuccessAlert(responseData.data));
              dispatch(RefreshTech());
          })
          .catch((err)=>{
            dispatch(uiStopLoading())
            // dispatch(ShowSuccessAlert('Something Went Wrong'));
          })
  }
}


export const SaveFixerImage = (idImage,taskId) => {
  return (dispatch,getState) =>{
    dispatch(uiStartLoading());
      fetch(URI + 'api/save/fixer/Image', {
          method:'POST',
          headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({
            "IdImage":idImage,
            "id":taskId
          }),
          })
          .then((response) => response.json())
          .then((responseData) => {

          "POST Response",
          "Response Body -> "+JSON.stringify(responseData)
            console.log(responseData);
            if (responseData.success) {
              dispatch(uiStopLoading());
              alert('Successfully Uploaded Image')
            } else {
              dispatch(uiStopLoading());
              dispatch(ShowErrorAlert('Registeration Failed'));
            }
          }).catch((err) => {
            dispatch(uiStopLoading());
            console.log(err)})
          .done();
  }
}

export const SaveProfileCustomer = (idImage) => {
  return (dispatch,getState) =>{
    dispatch(uiStartLoading());
      fetch(URI + 'api/save/user/profile', {
          method:'POST',
          headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({
            "IdImage":idImage,
            "id":getState().user.user.id
          }),
          })
          .then((response) => response.json())
          .then((responseData) => {

          "POST Response",
          "Response Body -> "+JSON.stringify(responseData)
            console.log(responseData);
            if (responseData.success) {
              dispatch(uiStopLoading());

              let userData = {
                name: getState().user.user.name,
                profile:responseData.profile,
                id: getState().user.user.id,
                email: getState().user.user.email,
                auth_token: getState().user.user.auth_token,
                timestamp: new Date().toString(),
                technician:getState().user.user.technician,
                category:getState().user.user.category,
                rating:getState().user.user.rating,
                status:getState().user.user.status,
                conformed:getState().user.user.conformed,
                currency:getState().user.user.currency,
                country:getState().user.user.country,
                userAmount:getState().user.user.userAmount,
                loggedIn:getState().user.user.loggedIn,
                Phone:getState().user.user.Phone,
                country_Code:getState().user.user.country_Code
              };
              let appState = {
                isLoggedIn: true,
                user: userData,
                isVarified:true,
                special:false
              };
              AsyncStorage.setItem("appState", JSON.stringify(appState));
              dispatch(saveUserInfo(appState))     
                 
              
            } else {
              dispatch(uiStopLoading());
              dispatch(ShowErrorAlert('Registeration Failed'));
            }
          }).catch((err) => {
            dispatch(uiStopLoading());
            console.log(err)})
          .done();
  }
}



export const UpdateUserProfile = (authdata) =>{
  return dispatch => {
    dispatch(uiStartLoading());
  fetch(URI + 'api/update/User/Info', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "id":authdata.id,
      "name":authdata.name,
      "phone":authdata.phone,
      "address":authdata.address
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)

      console.log(responseData);
      // return;
      if (responseData.success) {
        
        // alert(`Loged in Successful!`);
        dispatch(uiStopLoading());

        let userData = {
          ...responseData.data
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
          payment_added:responseData.data.payment_added?true:false,
        };

        AsyncStorage.setItem("appState", JSON.stringify(appState));

        
        dispatch(saveUserInfo(appState))    
        Popup.show({
          type: 'Success',
          // title: 'Successfully Updated Your Profile Info',
          button: false,
          textBody: 'Successfully Updated Your Profile Info',
          buttontext: 'Ok',

          callback: () => Popup.hide()
      })
        
      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        if(responseData.token){
          Alert.alert(
            'Alert',
            'This user is already Loged in from another device would you like to logout from that device',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Logout', onPress: () => {
                dispatch(uiStartLoading())
                dispatch(LogOutUserNotification(responseData.token))
              }},
            ],
            {cancelable: false},
          );
            return;
        }
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    }).catch((err)=>{
      dispatch(uiStopLoading())
      console.log(err);
      console.log('errpr');
    })
    .done();

  }
  
}


export const SaveProfile = (idImage) => {
  return (dispatch,getState) =>{
    dispatch(uiStartLoading());
      fetch(URI + 'api/save/user/profile', {
          method:'POST',
          headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({
            "IdImage":idImage,
            "id":getState().user.user.id
          }),
          })
          .then((response) => response.json())
          .then((responseData) => {

          "POST Response",
          "Response Body -> "+JSON.stringify(responseData)
            console.log(responseData);
            if (responseData.success) {
              dispatch(uiStopLoading());

              let userData = {
                ...responseData.data
              };
              let appState = {
                isLoggedIn: true,
                user: userData,
                payment_added:responseData.data.payment_added?true:false,
              };
              AsyncStorage.setItem("appState", JSON.stringify(appState));
              dispatch(saveUserInfo(appState))     
              Popup.show({
                type: 'Success',
                // title: 'Success',
                button: false,
                textBody: 'Successfully updated your profile picture',
                buttontext: 'Ok',
                
                callback: () => Popup.hide()
            })
              
            } else {
              dispatch(uiStopLoading());
              dispatch(ShowErrorAlert('Registeration Failed'));
            }
          }).catch((err) => {
            dispatch(uiStopLoading());
            console.log(err)})
          .done();
  }
}

export const SubscribeToPacakge = (data) => {
  return (dispatch,getState) =>{
    dispatch(uiStartLoading());
      fetch(URI + 'api/Create/Subscription', {
          method:'POST',
          headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({ 
            ...data
          }),
          })
          .then((response) => response.json())
          .then((responseData) => {

          "POST Response",
          "Response Body -> "+JSON.stringify(responseData)
            console.log(responseData);
            if (responseData.success) {
              dispatch(uiStopLoading());
              Navigation.popToRoot(data.componentId)
              alert('Your request for pacakage subscriptions is submited please wait while admin approves your request');
            //   Popup.show({ 
            //     type: 'Success',
            //     // title: 'Success',
            //     button: false,
            //     textBody: 'You have successfully subscribed to this monthly package',
            //     buttontext: 'Ok',
                
            //     callback: () => Popup.hide()
            // })
              
            } else {
              dispatch(uiStopLoading());
              alert(responseData.data);
              
              // dispatch(ShowErrorAlert('Registeration Failed'));
            //   Popup.show({
            //     type: 'Danger',
            //     title: 'Alert',
            //     button: false,
            //     textBody: responseData.data,
            //     buttontext: 'Ok',
                
            //     callback: () => Popup.hide()
            // })
            }
          }).catch((err) => {
            dispatch(uiStopLoading());
            console.log(err)})
          .done();
  }
}


export const GetSubscribedPacakages = () =>{
  return (dispatch,getState) => {
    dispatch(uiStartLoading());
  fetch(URI + 'api/Subscribed/pacakages/get?user_id='+getState().user.user.id)
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
      console.log(responseData);
      dispatch(uiStopLoading());
      if (responseData.success) {
        dispatch(uiStopLoading());
        dispatch(SaveSubscribedData(responseData.data))
      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    })  
    .catch((err) =>{
      dispatch(uiStopLoading());
      console.log(err)
    })
    .done();

  }
}

export const GetServicesUsed = () =>{
  return (dispatch,getState) => {
    dispatch(uiStartLoading());
  fetch(URI + 'api/Check/services/used?user_id='+getState().user.user.id)
    .then((response) => response.json())
    .then((responseData) => {

    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
      console.log(responseData);
      dispatch(uiStopLoading());
      if (responseData.success) {
        dispatch(uiStopLoading());
        dispatch(SaveServicesUsed(responseData.data))
      } else if(!responseData.success) {
        dispatch(uiStopLoading());
        // alert(responseData.data);
        dispatch(ShowErrorAlert(responseData.data));
      }
  
    })  
    .catch((err) =>{
      dispatch(uiStopLoading());
      console.log(err)
    })
    .done();

  }
}

export const SaveSubscribedData = (data) =>{
  return{
    type:SAVE_SUBSCRIBED_DATA,
    data:data
  }
}

export const SaveServicesUsed = (data) =>{
  return{
    type:SAVE_SERVICESUSED_DATA,
    data:data
  }
}