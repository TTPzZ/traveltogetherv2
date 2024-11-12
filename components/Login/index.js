// Login.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { auth, db } from '../../firebase/config';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { adddDocument, generateKeywords } from '../../firebase/services';

const logoImage = require('../../assets/Image/ens2.png');
const fbProvider = new FacebookAuthProvider();

export default function Login() {
  const handleFblogin = async () => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
      if (additionalUserInfo?.isNewUser) {
        adddDocument('users', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: additionalUserInfo.providerId,
          keywords: generateKeywords(user.displayName),
        });
        console.log("New user added to Firestore:", user.displayName);
      } else {
        console.log("Existing user - no need to add to Firestore");
      }
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>
      
      <Text style={styles.title}>Welcome Back</Text>
      
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      {/* Main Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Row for Social Login Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => {}}>
          <Text style={styles.buttonText}>Login With Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={handleFblogin}>
          <Text style={styles.buttonText}>Login With Facebook</Text>
        </TouchableOpacity>
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
    backgroundColor: '#EAF2F8',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#D5DBDB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
