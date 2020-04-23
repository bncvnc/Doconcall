import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/FontAwesome';
import IconsM from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const changeScreen = (screen) =>{
  AsyncStorage.setItem("screen", JSON.stringify(screen));
  Promise.all([
    IconsM.getImageSource(Platform.OS === 'android' ?'timeline':'timeline',30),
    IconsM.getImageSource(Platform.OS === 'android'? "lock-open": "lock-open",30),
    IconsM.getImageSource(Platform.OS ==='android' ? "lock" :"lock",30),
    // Icons.getImageSource(Platform.OS === 'android' ?Icon1:Icon1,30),
    IconsM.getImageSource(Platform.OS === 'android'? "menu": "menu",30),
    Icons.getImageSource(Platform.OS ==='android' ? "arrow-back" :"ios-menu",30)
]).then(sources => {
  Navigation.setRoot({
    root: {
       
      sideMenu: {
        id: "sideMenu",
        options: {
          sideMenu: {
            left: {
              width:wp('25%'),
              shouldStretchDrawer: false,
            }
          }
        },
        left: {
        
          component: {
            id: "Drawer",
            name: "doconcall.sidedrawer",
          },
          
        },
        center: {
    
                stack: {
                  children: [{
                    
                    component:{
                      name:screen,
                      id:screen,
                      options: {
                        topBar: {
                            visible:false,
                          background: {
                            color: '#ffffff'
                          },
                          title:{
                            text:'Main Screen',
                            alignment:'center'
                          },
                          leftButtons: [{
                               
                            id: 'openSideDrawer',
                            icon:sources[3],
                            color:'#000000',
                          }]
        
                        }
                      }
                    }
                  }],
                  options: {
                  
                    bottomTab: {
                        visible:false,


                     
                    }
                  }
                }
            

        }
      },
      options:{
      }
    }
  });

})
  }

  export default changeScreen;