import {
	Platform,
	Text,
	TextInput
  } from "react-native";
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './src/store/configurStore';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import sidedrawer from "./src/components/sidedrawer/sidedrawer";
import ProfileScreen from './src/screens/ProfilePage/ProfileScreen';
import PaymentScreen from './src/screens/PaymentScreen/PaymentScreen';
import AboutUsScreen from './src/screens/AboutUsScreen/AboutUsScreen';
import ContactUsScreen from './src/screens/ContactUsScreen/ContactUsScreen';
import TermsScreen from "./src/screens/TermsScreen/TermsScreen";
import PlanScreen from "./src/screens/PlanScreen/PlanScreen";
import ServicesUsed from "./src/screens/ServicesUsed/ServicesUsed";
import SuccessPopup from "./src/components/PopUps/SuccessPopup";
import SubscriptionScreen from "./src/screens/SubscriptionScreen/SubscriptionScreen";
import ReferredScreen from "./src/screens/ReferedScreen/ReferredScreen";
import ForgetPassword from "./src/screens/ForgetPassword/ForgetPassword";
import ServiceDetail from "./src/screens/ServicesUsed/ServiceDetail";
import EmoneyRequest from "./src/screens/EmoneyRequest/EmoneyRequest";
import verifiNumber from "./src/screens/verifiNumber/verifiNumber";
import OurPlansPay from "./src/screens/OurPlansPay/OurPlansPay";


const store = configureStore();
//Login Screen
Navigation.registerComponentWithRedux('doconcall.LoginScreen', () => LoginScreen, Provider, store);
//Registeration sscreen
Navigation.registerComponentWithRedux('doconcall.RegisterScreen', () => RegisterScreen, Provider, store);
//Main Screen
Navigation.registerComponentWithRedux('doconcall.MainScreen',()=>MainScreen,Provider,store);
//SideDrawer
Navigation.registerComponentWithRedux('doconcall.sidedrawer',()=>sidedrawer,Provider,store);
//Profile Screen
Navigation.registerComponentWithRedux('doconcall.ProfileScreen',()=>ProfileScreen,Provider,store);
//Payment Screen
Navigation.registerComponentWithRedux('doconcall.PaymentScreen',()=>PaymentScreen,Provider,store);
//AboutUsScreen
Navigation.registerComponentWithRedux('doconcall.AboutUsScreen',()=>AboutUsScreen,Provider,store);
//ContactUsScreen
Navigation.registerComponentWithRedux('doconcall.ContactUsScreen',()=>ContactUsScreen,Provider,store);
//TermsConditions PAge
Navigation.registerComponentWithRedux('doconcall.TermsScreen',()=>TermsScreen,Provider,store);
//PlaceScreen
Navigation.registerComponentWithRedux('doconcall.PlanScreen',()=>PlanScreen,Provider,store);
//Services Used
Navigation.registerComponentWithRedux('doconcall.ServicesUsed',()=>ServicesUsed,Provider,store);

// Subscription Screen
Navigation.registerComponentWithRedux('doconcall.SubscriptionScreen',()=>SubscriptionScreen,Provider,store);
// Refered  Screen
Navigation.registerComponentWithRedux('doconcall.ReferredScreen',()=>ReferredScreen,Provider,store);
//Forget Paswrod
Navigation.registerComponentWithRedux('doconcall.ForgetPassword',()=>ForgetPassword,Provider,store);
//Service Detai View
Navigation.registerComponentWithRedux('doconcall.ServiceDetail',()=>ServiceDetail,Provider,store);
//Emoney Request
Navigation.registerComponentWithRedux('doconcall.EmoneyRequest',()=>EmoneyRequest,Provider,store);
//verifiNumber
Navigation.registerComponentWithRedux('doconcall.verifiNumber',()=>verifiNumber,Provider,store);
//OurPlansPay
// Navigation.registerComponentWithRedux('doconcall.OurPlansPay',()=>OurPlansPay,Provider,store);








Navigation.events().registerAppLaunchedListener(() => {
	if (Text.defaultProps == null) Text.defaultProps = {};
	Text.defaultProps.allowFontScaling = false;
	if (TextInput.defaultProps == null) TextInput.defaultProps = {};
	TextInput.defaultProps.allowFontScaling = false;
	if(Platform.OS==='ios'){
		Navigation.setDefaultOptions({
			layout: {
				orientation: ["portrait"],
			},
			topBar: {
				visible: false,
			},
			animations: {
				setRoot: {
					enabled:true,
					waitForRender: true,
					alpha: {
					  from: 0,
					  to: 1,
					  duration: 500
					}
				  },
				put: {
				  waitForRender: true,
				},
				push: {
				  waitForRender: true,
				  sideMenu: {
					left: {
						visible: false,
						enabled: false
					  }
				}
				},
				showModal: {
					waitForRender: true
				  }
			  },
		});
	}else{
		Navigation.setDefaultOptions({
			layout: {
				orientation: ["portrait"],
				backgroundColor: 'transparent'
			},
			topBar: {
				visible: false,
				
			},
			animations: {
				put: {
				  waitForRender: true,
				},
				
				push: {
				  waitForRender: true,
				  content: {
					x: {
						from: 1000,
						to: 0,
						duration: 300,
						interpolation: 'accelerate',
						
					},
					alpha: {
						from: 0.5,
						to: 1,
						duration: 100,
					}
				},
				  sideMenu: {
					left: {
						visible: false,
						enabled: false
					  }
				}
				},
			  },
		});
	}
	


		Navigation.setRoot({
			root: {
				stack: {
					id: 'AppStack',	
					children: [
						{
							component: {
								name: 'doconcall.LoginScreen'
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

});


