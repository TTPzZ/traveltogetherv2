import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { auth,db } from '../../firebase/config';
import { FacebookAuthProvider, ProviderId, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";

// import {useHistory} from 'react-router-dom' //thay bằng dòng dưới
import { useNavigate } from 'react-router-dom';
import { adddDocument, generateKeywords } from '../../firebase/services';


// Đường dẫn tới hình ảnh logo
const logoImage = require('../../assets/Image/ens2.png'); // Đi lên hai cấp để vào thư mục assets

// Khởi tạo một instance của FacebookAuthProvider
const fbProvider = new FacebookAuthProvider();

export default function Login() {
  const handleFblogin = async () => {
    try {
      // const data = await signInWithPopup(auth, fbProvider);
      const {additionalUserInfo,user} = await auth.signInWithPopup(fbProvider);
      // const { additionalUserInfo, user } = await signInWithPopup(auth, fbProvider);
      console.log("ở đây",additionalUserInfo);


    // Kiểm tra xem đây có phải là người dùng mới không
    // if (additionalUserInfo?.isNewUser) {
    //   // Nếu là người dùng mới, lưu thông tin vào Firestore
    //   //await setDoc(doc(db, 'users', user.uid), {
    //   adddDocument('users',{
    //     displayName: user.displayName,
    //     email: user.email,
    //     photoURL: user.photoURL,
    //     uid: user.uid,
    //     providerId: additionalUserInfo.providerId,
    //     keywords: generateKeywords(user.displayName)
    //   });
    if (additionalUserInfo?.isNewUser) {
      adddDocument('users', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: additionalUserInfo.providerId,
          keywords: generateKeywords(user.displayName) // Chuẩn hóa bằng cách chuyển sang chữ thường
      });
      console.log("New user added to Firestore:", user.displayName);
    } else {
      console.log("Existing user - no need to add to Firestore");
    }

      // const {additionalUserInfo,user} = await signInWithPopup(auth, fbProvider);
      // const data = await signInWithPopup(auth, fbProvider);
      // console.log({data});
      // if (additionalUserInfo?. isNewUser){
      //   db.collection('users').add({
      //     displayName: user.displayName,
      //     email: user.email,
      //     photoURL:user.photoURL,
      //     uid:user.uid,
      //     providerId:additionalUserInfo.providerId,
      //   })
      // }
      
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    }
  };


  return (
    <View style={styles.container}>
      {/* Logo hình tròn */}
      <View style={styles.logoContainer}>
        <Image 
          source={logoImage} // Sử dụng require để lấy hình ảnh
          style={styles.logo} 
        />
      </View>
      
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Login With Google" onPress={() => {}} color="#DB4437" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login With Facebook" onPress={handleFblogin} color="#4267B2" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 10,
  },
});
