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
import Subscription from '../../images/Subscription.png';
import home from '../../images/HOME.png';
import paymenticon from '../../images/paymenticon.png';
import Servicesicon from '../../images/Servicesicon.png';
import plan from '../../images/plan.png';
import aboutus from '../../images/aboutus.png';
import contactus from '../../images/contactus.png';
import Works from '../../images/Works.png';
import adminCall from '../../images/adminCall.png';
import TellFriend from '../../images/TellFriend.png';
import Termss from '../../images/Termss.png';
import Logout from '../../images/Logout.png';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {logoutUser,SaveProfileCustomer} from '../../store/actions/index';
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
                        
                  })


                }

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
                      // this.closeDrawer();
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
                                    enabled: false,
                                    
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
                  // this.closeDrawer();
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

     

     

         return(
            
        
          //Ends Here
          <View style={styles.sideMenuContainer}>
            <View style={{width:wp('25%'),backgroundColor:'#cd2026',}}>
              
           
               <ScrollView   showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator ={false} >
                <View style={{flexDirection:'column'}}>
                  <View style={styles.top_view}>
                    <TouchableOpacity
                    onPress={() =>{
                      this.gotoScreen('doconcall.ProfileScreen','doconcall.ProfileScreen');
                    }} 
                    style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage 
                            style={[styles.top_img,{ borderRadius:this.props.user.profile?wp('15%'):0}]} 
                            source={this.props.user.profile?{uri:'https:/admin.doconcall.pk/images/'+this.props.user.profile}:pro_imagee}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={styles.top_txt} >PROFILE</Text>
                      </View>
                    </TouchableOpacity>
                  </View>  

                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={()=> { 
                  // this.gotoScreen('doconcall.ProfileScreen','doconcall.ProfileScreen');
                  this.closeDrawer();
                   this.pressButton(); }}  style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={home} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={styles.top_txt} >HOME</Text>
                      </View>
                    </TouchableOpacity>
                  </View>   
{/* 
                    <View style={styles.top_view}>
                    <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.PaymentScreen','doconcall.PaymentScreen');
                   this.pressButton(); 
                  }}  style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={paymenticon} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={styles.top_txt} >PAYMENT</Text>
                      </View>
                    </TouchableOpacity>
                  </View>   */}

                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.ServicesUsed','doconcall.ServicesUsed'); 
                this.pressButton();
               }}  style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={Servicesicon} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={styles.top_txt} >SERVICES</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 
                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.PlanScreen','doconcall.PlanScreen'); 
                this.pressButton();
               }}  style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={plan} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={styles.top_txt} >PLAN</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 
                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.SubscriptionScreen','doconcall.SubscriptionScreen'); 
                this.pressButton();
               }}  style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={Subscription} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={[styles.top_txt,{fontSize:wp('3%')}]} >SUBSCRIBED</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 

                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={()=> {
                   this.gotoScreen('doconcall.AboutUsScreen','doconcall.AboutUsScreen');
                    this.pressButton();
                   }}  style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={aboutus} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={styles.top_txt} >ABOUT US</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 

                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.ContactUsScreen','doconcall.ContactUsScreen');
                  this.pressButton(); }}  style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={contactus} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={[styles.top_txt,{textAlign:'center'}]} >CONTACT US</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 

                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={()=> { 
                   Linking.canOpenURL('https://doconcall.pk/').then(supported => {
                    if (supported) {
                      Linking.openURL('https://doconcall.pk/');
                    } else {
                      console.log("Don't know how to open URI: " + this.props.url);
                    }
                  });
                  
                  }}  style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={Works} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={[styles.top_txt,{textAlign:'center'}]} >HOW IT WORKS</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 

                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={()=> { 
                  this.gotoScreen('doconcall.ReferredScreen','doconcall.ReferredScreen'); 
                this.pressButton(); }}  style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={TellFriend} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={[styles.top_txt,{textAlign:'center'}]} >TELL A FRIEND</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 

                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={() =>{
                    let phoneNumber='03332222200';
                      let ForBoth=Platform.OS==='android'?`tel:${phoneNumber}`:`telprompt:${phoneNumber}`;
                      Linking.openURL(ForBoth)
                  }} style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={adminCall} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={[styles.top_txt,{textAlign:'center'}]} >CALL ADMIN</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 

                  <View style={styles.top_view}>
                    <TouchableOpacity onPress={() =>{
                      this.gotoScreen('doconcall.TermsScreen','doconcall.TermsScreen');
                      this.pressButton(); 
                  }} style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={Termss} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={[styles.top_txt,{textAlign:'center'}]} >TERMS & CONDITION</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 

                  <View style={styles.top_view}>
                    <TouchableOpacity 
                    onPress={()=> { this.props.Logout(); this.pressButton(); }} 
                    style={{flex:1,flexDirection:'column',padding:5,marginBottom:wp('1%')}}>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>  
                          <FastImage style={styles.top_img} source={Logout} />
                      </View>
                      <View style={{marginLeft:wp('1%'),marginTop:wp('1%'),alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                          <Text style={[styles.top_txt,{textAlign:'center'}]} >LOGOUT</Text>
                      </View>
                    </TouchableOpacity>
                  </View> 



                </View>        

                
            
          </ScrollView>   
          </View>
        </View>

         );
    }

}
const styles = StyleSheet.create({
  
  sideMenuContainer: 
  {
    flex:1,
    backgroundColor:'#ffffff',
    alignItems: 'center',
    width:wp('25%'),
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'rgba(0,0,0,.5)',
    shadowOpacity: 1,
    elevation: 7,
  },
  top_view:
  {
      flex:1,
      flexDirection:'row',
      alignContent:'center',
      justifyContent:'center',
      padding:5
  },
  top_img:
  {
      width:wp('13%'),
      height:wp('13%'),
      
     
  },
  top_txt:{
      fontFamily:'Roboto',
      fontSize:wp('3.5%'),
      fontWeight:'bold',
      color:'#fff',
      
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
