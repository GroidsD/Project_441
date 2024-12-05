import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import styles from '../style';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/api/signup', { // Replace with your actual signup endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }), // Assuming you want to send username as email
      });

      const data = await response.json();

      if (response.ok) {
        // If signup is successful, navigate to Sign In page
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('SignIn');
      } else {
        // If there is an error, show the error message
        Alert.alert('Sign Up Failed', data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Image style={styles.imgLogin2} source={require('../images/logo1.jpg')} />
        <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>THỨC COFFEE</Text>
      </View>
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={{ color: 'black', fontSize: 20, marginBottom: 20 }}>Sign Up</Text>
        <View>
          <TextInput
            placeholder='Enter Your Email'
            style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, marginBottom: 10 }}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder='Enter Your Password'
            style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, marginBottom: 10 }}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder='Confirm Your Password'
            style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, marginBottom: 10 }}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity style={[styles.btnLogin, { width: 300, marginTop: 20 }]} onPress={handleSignUp}>
          <Text style={styles.btnText}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
          <Text style={{ fontSize: 12 }}>
            By tapping Sign up you accept all our
          </Text>
          <Text style={{ color: '#04764e', textDecorationLine: 'underline', fontSize: 12, marginLeft: 4, marginRight: 4 }}>
            terms
          </Text>
          <Text style={{ fontSize: 12 }}>
            and
          </Text>
          <Text style={{ color: '#04764e', textDecorationLine: 'underline', fontSize: 12, marginLeft: 4 }}>
            condition
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUp;