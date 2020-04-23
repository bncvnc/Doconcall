

import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/FontAwesome';
import IconsM from 'react-native-vector-icons/MaterialIcons';
const appNavigation =(screen)=>
{
  AsyncStorage.setItem("screen", JSON.stringify(screen));
  Navigation.setRoot({
    root: {
      stack:{
        id:screen,
        children:[
          {
            component:{
              name:screen,
            }
          }
        ],
        options:{
          topBar:{
            visible:false
          }
        },
        animations: {
            push: {
               waitForRender: false
            },
            stack:{
              waitForRender:false
            }
         }
      }
    }
  });
}
export default appNavigation;