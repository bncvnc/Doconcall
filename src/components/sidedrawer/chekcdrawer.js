import React ,{Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Platform,
    Modal,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    ImageBackground,
    Linking,
    Share,
} from 'react-native';
import pro_image from '../../images/bg_dawer.jpg';
import pro_imagee from '../../images/profile.png';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {logoutUser,SaveProfileCustomer} from '../../store/actions/index';
// import tecc from  '../../images/Icons/image.png'
import { Navigation } from "react-native-navigation";
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Icons from 'react-native-vector-icons/Ionicons';


class SideDrawer extends Component {
  
constructor(props)
{
  super(props);
//   this.props.UserData();
   

 
  // Navigation.events().bindComponent(this.props.componentId);
  Navigation.events().registerComponentDidAppearListener( ( { componentId } ) => {
    // only spy on tabs we don't need other screens
    if(componentId === 'doconcall.MainScreen')
    {
      this.setState({
        activeComponentId: componentId
    })
    }
        
        // AsyncStorage.setItem("screen", JSON.stringify(componentId));
        console.log(componentId);
    // alert(componentId);
  })


}


// navigationButtonPressed({ buttonId }) {
//   if (buttonId === "openSideDrawer") {
//   (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
//   Navigation.mergeOptions(this.state.activeComponentId, {
//    sideMenu: {
//      left: {
//        visible: this.isSideDrawerVisible,
//      }
//    }
//  });
// }
// }
closeDrawer (){
  (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
  Navigation.mergeOptions(this.state.activeComponentId, {
   sideMenu: {
     left: {
       visible: false,
     }
   }
 });
}


  state = {
    openAcounts:false,
    closeAcounts:true,
    help:false,
    whyUs:false,
    support:false,
    disabled:false,
    pickImage:[],
  }

  gotoScreen = async (screen,title) =>{
      this.closeDrawer();
    Navigation.push(this.state.activeComponentId, {
        component: {
          name: screen,
          id:screen,
          passProps: {
            text: 'Pushed screen'
          },
          options: {
            topBar: {
                visible: false
            },
            sideMenu: {
                left: {
                    visible: false,
                    enabled: false
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
      
}

gotoLoginScreen = async (screen,title) =>{
  this.closeDrawer();
Navigation.push(this.state.activeComponentId, {
    component: {
      name: screen,
      id:screen,
      passProps: {
        text: 'Pushed screen'
      },
      options: {
        topBar: {
          visible:true,
          title:{
            text:'Fixer Login',
            alignment:'center'
          }
        },
        sideMenu: {
            left: {
                visible: false,
                enabled: false
              }
        },
    }
    }
  });
  
}
// pickImageHandler = () =>{
//   this.closeDrawer();
//   ImagePicker.showImagePicker({
//       title:'Please Pick An Image',
//       maxWidth:800,
//       maxHeight:600
//   }, res => {

//       if(res.didCancel)
//       {
//           console.log('User Canceled')
//       } else if(res.error)
//       {
//           console.log('Error', res.error)
//       }else {
//           this.setState(prevState => {
//               return{
//                 pickImage: prevState.pickImage.concat({
//                   key: Math.random(),
//                   uri:res.uri,
//                   source:res.data,
//                   filesize:res.fileSize
//                 })
//               }
//           })
//           this.props.SaveProfile(this.state.pickImage);

//       }
//   });
// }
 
pressButton() {
  this.setState({
    disabled: true,
  });
  // enable after 5 second
  setTimeout(()=>{
     this.setState({
      disabled: false,
    });
  }, 1000)
}
onShare = async () => {
  try {

    let  text = 'Uncle fixture is one of a kind platform that brings the consumer to any kind of service they need and when they need. From plumbers to mechanics, from carpenters to caterers; any service you need is just a few taps away with Uncle Fixer. Simply register as a user and find the service you are looking for within your vicinity. Secure payment, real time monitoring when fixer is around you, and service warranty ensures that you get what you paid for.Not a consumer? Have a skill that you want to monetize? Register as a fixer and get start getting jobs. Turn your skills into a genuine business with Uncle Fixer. With Uncle Fixer, you get complete control over your earnings, dispute management and making money with additional skills that you think you have. Get high ratings and reviews from your clients and become the STAR FIXER.Uncle Fixer is truly an app that is for the people, by the people. Easy, intuitive, having a fresh and user friendly look, Uncle Fixer has something for everyone. /n'
    if(Platform.OS === 'android')
        text = text.concat('https://play.google.com/store/apps/details?id=com.unclefixer')
    else
        text = text.concat('https://apps.apple.com/us/app/unclefixer/id1490258196')
    const result = await Share.share({
      message:text,
        url:Platform.OS ==='android'?'https://play.google.com/store/apps/details?id=com.unclefixer':'https://apps.apple.com/us/app/unclefixer/id1490258196'
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
    render(){

     
        // let text =this.props.pro_data.name;
        // console.log(text);
     

         return(
            
        
          //Ends Here
          <View style={styles.sideMenuContainer}>
               <ScrollView   showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator ={false} >
            <ImageBackground  style={{width:wp('80%'),height:wp('40%')}} source={pro_image}>
              <View style={styles.top_view}>
                <View style={{flex:1,flexDirection:'column',padding:5,}}>
                  <FastImage 
                  style={styles.top_img} 
                  resizeMode={FastImage.resizeMode.cover}
                  source={this.props.user.profile?{uri:'https:/doconcall.pk/images/'+this.props.user.profile}:pro_imagee}
                   />
                  <View style={{marginLeft:wp('2%'),marginTop:wp('2%')}}>
                      <Text style={styles.top_txt} >{this.props.user.email}</Text>
                      <Text style={styles.top_txtt} >{this.props.user.phone}</Text>
                      <Text style={styles.top_txtt} >{this.props.use}</Text>
                  </View>
                </View>
                <TouchableOpacity  
                style={{flexDirection:'row',alignItems:'flex-end',alignSelf:'center'}}>
                  <Icon onPress={() =>{
                    this.gotoScreen('doconcall.ProfileScreen','doconcall.ProfileScreen');
                  }} style={{fontSize:wp('4.5%'),color:'#fff'}} name="edit" />
                </TouchableOpacity>
              </View>         
          </ImageBackground>
            <View style={styles.containerSec}>
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('4.5%'),color:'#CD2026'}} name="home" />
                </View>
                <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.ProfileScreen','doconcall.ProfileScreen');
                   this.pressButton(); }} 
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >Home</Text>
                    </View>
                </TouchableOpacity>
              </View>
              
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('4.5%'),color:'#CD2026'}} name="shopping-cart" />
                </View>
                <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.PaymentScreen','doconcall.PaymentScreen');
                   this.pressButton(); 
                  }} 
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >Payment Method</Text>
                    </View>
                </TouchableOpacity>
              </View>
               
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('4.5%'),color:'#CD2026'}} name="users" />
                </View>
                <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.ServicesUsed','doconcall.ServicesUsed'); 
                this.pressButton();
               }} 
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >Service Used</Text>
                    </View>
                </TouchableOpacity>
              </View> 
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('4.5%'),color:'#CD2026'}} name="users" />
                </View>
                <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.PlanScreen','doconcall.PlanScreen'); 
                this.pressButton();
               }} 
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >Planes Screen</Text>
                    </View>
                </TouchableOpacity>
              </View> 
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('4.5%'),color:'#CD2026'}} name="info-circle" />
                </View>
                <TouchableOpacity onPress={()=> {
                   this.gotoScreen('doconcall.AboutUsScreen','doconcall.AboutUsScreen');
                    this.pressButton();
                   }} 
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >About Us</Text>
                    </View>
                </TouchableOpacity>
              </View>
              
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('4.5%'),color:'#CD2026'}} name="cogs" />
                </View>
                <TouchableOpacity onPress={()=> { 
                   Linking.canOpenURL('https://doconcall.pk/').then(supported => {
                    if (supported) {
                      Linking.openURL('https://doconcall.pk/');
                    } else {
                      console.log("Don't know how to open URI: " + this.props.url);
                    }
                  });
                  
                  }} 
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >How it works</Text>
                    </View>
                </TouchableOpacity>
              </View>
              
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('4.5%'),color:'#CD2026'}} name="users" />
                </View>
                <TouchableOpacity onPress={()=> { 
                  this.gotoScreen(); 
                this.pressButton(); }} 
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >Tell a friend</Text>
                    </View>
                </TouchableOpacity>
              </View> 
              
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('5.3%'),color:'#CD2026'}} name="id-badge" />
                </View>
                <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.ContactUsScreen','doconcall.ContactUsScreen');
                  this.pressButton(); }} 
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >Contact Us</Text>
                    </View>
                </TouchableOpacity>
              </View> 
              
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('5.2%'),color:'#CD2026'}} name="phone-square" />
                </View>
                <TouchableOpacity onPress={() =>{
                    let phoneNumber='03332222200';
                      let ForBoth=Platform.OS==='android'?`tel:${phoneNumber}`:`telprompt:${phoneNumber}`;
                      Linking.openURL(ForBoth)
                  }}
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >Call Admin</Text>
                    </View>
                </TouchableOpacity>
              </View> 
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('5.2%'),color:'#CD2026'}} name="phone-square" />
                </View>
                <TouchableOpacity onPress={() =>{
                      this.gotoScreen('doconcall.TermsScreen','doconcall.TermsScreen');
                      this.pressButton(); 
                  }}
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                <Text style={styles.container_txt_view} >{'Terms & Conditions'}</Text>
                    </View>
                </TouchableOpacity>
              </View> 
              
              <View style={styles.container_item}>
                <View style={styles.container_itemImg1}>
                  <Icon style={{fontSize:wp('4.5%'),color:'#CD2026'}} name="sign-out" />
                </View>
                <TouchableOpacity onPress={()=> { this.props.Logout(); this.pressButton(); }} 
                    disabled={this.state.disabled} style={[styles.container_itemInner,]}>
                    <View style={styles.container_itemImg}>
                        <Text style={styles.container_txt_view} >Logout</Text>
                    </View>
                </TouchableOpacity>
              </View> 
            </View>
          </ScrollView>      
   </View>

         );
    }

}
const styles = StyleSheet.create({
  
  sideMenuContainer: 
  {
    flex:1,
    backgroundColor:'#ffffff',
    // alignItems: 'center',
    width:wp('80%'),
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'rgba(0,0,0,.5)',
    shadowOpacity: 1,
    elevation: 7,
  },
  top_view:
  {
      flex:1,
      flexDirection:'row',
      height:hp('30%'),
      alignContent:'flex-start',
      alignItems:'flex-start',
      padding:15
  },
  top_img:
  {
      width:wp('18%'),
      height:wp('18%'),
      borderRadius:wp('10%'),
  },
  top_txt:{
      fontFamily:'Roboto',
      fontSize:wp('3.5%'),
      fontWeight:'bold',
      color:'#fff',
      textTransform:'capitalize',
  },
  top_txtt:{
      fontFamily:'Roboto',
      fontSize:wp('3%'),
      fontWeight:'700',
      color:'#fff',      
  },

  containerSec:
  {
    flexDirection:'column',
    
  },
  container_item:
  {
    flexDirection:'row',
    width:wp('80%'),
    marginBottom:wp('2%'),
    marginTop:wp('3%'),
    marginLeft:wp('1%')

  },

  container_itemImg1:
  {
    width:wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:wp('2%'),
  },
  container_itemImg:
  {
   
    justifyContent: 'center',
    alignItems: 'stretch',
    textAlign:'center',
    
  },
  container_txt_view:
  {
      fontFamily:'Roboto',
      fontSize:wp('3%'),
      color:'#000',
      fontWeight:'bold',
      marginLeft:wp('4%'),

  },
})


const mapStatesToProps = (state) => {
  return{
    user:state.user.user
  }
}

const mapsDispatchToProps = (dispatch) =>{
  return{
    Logout: ()=>dispatch(logoutUser()),
    ForRerender:()=>dispatch(ForRerender()),
    SaveProfile:(a)=>dispatch(SaveProfileCustomer(a)),
  }
}

export default connect(mapStatesToProps,mapsDispatchToProps) (SideDrawer);
