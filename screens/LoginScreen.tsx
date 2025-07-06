import React from 'react';
import FormComponent, { FormConfig } from '../components/FormComponent';
import {  SafeAreaView, StyleSheet, View } from 'react-native';
import { StorageService } from '../utils/storage';


interface LoginScreenProps {
  onLogin?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const handleGoogleLogin = () => {
    console.log('Google ile giriş');
  };

  const handleAppleLogin = () => {
    console.log('Apple ile giriş');
  };

  const handleLogin = (data: Record<string, string>) => {
    console.log('Login data:', data);
    StorageService.setIsLoggedIn(true)
  };

  const loginFormConfig: FormConfig = {
    title: 'Giriş Yap',
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Email adresinizi girin',
        required: true,
      },
      {
        name: 'password',
        label: 'Şifre',
        type: 'password',
        placeholder: 'Şifrenizi girin',
        required: true,
        validation: {
          minLength: 6,
          message: 'Şifre en az 6 karakter olmalıdır',
        },
        
      },
      
    ],
    submitButtonText: 'Giriş Yap',
    onSubmit: handleLogin,
    customButtons: [
      {
        text: 'Google ile Giriş Yap',
        onPress: handleGoogleLogin,
        style: 'google',
      },
      {
        text: 'Apple ile Giriş Yap',
        onPress: handleAppleLogin,
        style: 'apple',
      },
    ],
  };


  return(
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.cardContainer}>
        <FormComponent config={loginFormConfig} />
      </View>
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  cardContainer: {
    elevation: 3,
  },
});

export default LoginScreen;


