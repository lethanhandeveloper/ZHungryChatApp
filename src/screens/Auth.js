import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewComponent, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AwesomeAlert from 'react-native-awesome-alerts';
import theme from "../../assets/colors";
import {Entypo, Feather} from "react-native-vector-icons";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { login, signup } from "../firebase/auth";
import { auth } from "../../firebase";
import { uploadImage } from '../firebase/storage';

const Auth = ({ navigation }) => {
  const [switchForm, setSwitchForm] = useState(true)
  const [isLoading, setLoading] = useState(false);
  const [alertProps, setAlertProps] = useState({ isShow: false, message: ""  })

  useEffect(() => {
    var user = auth.currentUser;
    if(user){
      navigation.navigate("Home");
    }
  }, [])
      // window.recaptchaVerifier = auth.RecaptchaVerifier('recaptcha-container', {
      //   'size': 'normal',
      //   'callback': (response) => {
      //     // reCAPTCHA solved, allow signInWithPhoneNumber.
      //     // ...
      //   },
      //   'expired-callback': () => {
      //     // Response expired. Ask user to solve reCAPTCHA again.
      //     // ...
      //   }
      // });

      // const appVerifier = window.recaptchaVerifier;
      // auth.signInWithPhoneNumber("+84337464921", appVerifier)
      //     .then((confirmationResult) => {
      //       // SMS sent. Prompt user to type the code from the message, then sign the
      //       // user in with confirmationResult.confirm(code).
      //       window.confirmationResult = confirmationResult;
      //       // ...
      //     }).catch((error) => {
      //       // Error; SMS not sent
      //       // ...
      //     });
  
  const handleLogin = (userInfo) => {
    setLoading(true);

    login(userInfo.email, userInfo.password).then((res) => {
        setLoading(false);
        navigation.navigate("Home");
    }).catch((err) => {
        setLoading(false);
        setAlertProps({ isShow: true, message: err.message })
    })
  }

  const handleSignUp = (userInfo) => {

    setLoading(true);



    uploadImage('avatars', userInfo.avatar).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          // console.log({ avatar : downloadUrl, 
          //   email : userInfo.email,
          //   password: userInfo.password,
          //   firstName: userInfo.firstName, 
          //   lastName : userInfo.lastName, 
          //   gender : userInfo.gender, 
          //   phone : userInfo.phone  });
            // userInfo.avatar.uri = downloadUrl;
            signup(
              { avatar : downloadUrl, 
                email : userInfo.email,
                password: userInfo.password,
                firstName: userInfo.firstName, 
                lastName : userInfo.lastName, 
                gender : userInfo.gender, 
                phone : userInfo.phone  })
              .then((res) => {
              setLoading(false);
              setAlertProps({ isShow: true, message: "Sign up Successfully" })
              setSwitchForm(true);
            }).catch((err) => {
              setAlertProps({ isShow: true, message: err.message })
              setLoading(false);
            })
        })
    }).catch(err => console.log(err.message));
   


  
  }
  

  return (
    <ScrollView style={styles.container}>
       <AwesomeAlert
          show={alertProps.isShow}
          showProgress={false}
          title=""
          message={alertProps.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor={theme.colors.green}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            setAlertProps({ ...alertProps, isShow: false })
          }}
        />
      { isLoading && <ActivityIndicator
          size="large"
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 2,
          }}
        /> }
      <View style={styles.logoWrapper}>
        <Image source={require("../../assets/images/icons/logo.png")} />
        <Text style={styles.bigLogoText}>Z Hungry</Text>
        <Text style={styles.smallLogoText}>Welcome back</Text>
      </View>
      
    
      {/* <LoginForm handleLogin={handleLogin}/> */}
      {switchForm ? <LoginForm handleLogin={handleLogin}/> : <SignUpForm handleSignUp={handleSignUp} /> }
      <Pressable style={styles.toggleFromLabelWrapper} onPress={() => setSwitchForm(!switchForm)}>
              {switchForm ? <Text style={styles.toggleFromLabelText}>Bạn chưa có tài khoản ? Đăng ký ngay</Text>
              : <Text style={styles.toggleFromLabelText}>Bạn đã có tài khoản ? Đăng nhập</Text>}
      </Pressable>
      {/* <Text style={styles.designByText}>Design by lethanhan</Text> */}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 13,
    backgroundColor: theme.colors.white,
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  bigLogoText: {
    fontSize: 24,
    fontFamily: "Rubik-Regular",
    color: "#2D3F65",
  },
  smallLogoText: {
    fontSize: 9,
    fontFamily: "Rubik-Regular",
    color: theme.colors.lightGray,
  },
 
  designByText: {
    color: theme.colors.lightGray,
    fontSize: 9,
    fontFamily: "Rubik-Regular",
  },
  toggleFromLabelWrapper: {
    alignSelf: "center",
    marginTop: 8
  },
  toggleFromLabelText: {
    color: theme.colors.black,
    fontSize: 12,
    fontFamily: "Rubik-Regular",
    alignSelf: "flex-end",
    marginBottom: 30
  }
});

export default Auth;
