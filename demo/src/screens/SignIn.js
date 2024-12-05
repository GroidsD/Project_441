// import React, { useState } from 'react';
// import { Button, Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
// import styles from '../style';

// const SignIn = ({ navigation }) => {
//   const [email, setEmail] = useState('user1');
//   const [password, setPassword] = useState('password1');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://10.0.2.2:3000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // body: JSON.stringify({ username: email, password }),
//         body: JSON.stringify({ username: email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Nếu đăng nhập thành công, điều hướng đến trang Home
//         navigation.navigate('Home');
//       } else {
//         // Nếu có lỗi, hiển thị thông báo lỗi
//         Alert.alert('Login Failed', data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'An error occurred. Please try again.');
//     }
//   };

//   return (
//     <View>
//       <View style={{ marginBottom: 20 }}>
//         <Image style={styles.imgLogin2} source={require('../images/logo1.jpg')} />
//         <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>THỨC COFFEE</Text>
//       </View>
//       <View style={{ marginLeft: 10, marginRight: 10 }}>
//         <Text style={{ color: 'black', fontSize: 20, marginBottom: 20 }}>Sign In</Text>
//         <View>
//           <TextInput
//             placeholder='Enter Your Email'
//             style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, marginBottom: 10 }}
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             placeholder='Enter Your Password'
//             style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10 }}
//             secureTextEntry // Để ẩn mật khẩu
//             value={password}
//             onChangeText={setPassword}
//           />
//         </View>
//         <TouchableOpacity style={[styles.btnLogin, { width: 300 }]} onPress={handleLogin}>
//           <Text style={styles.btnText}>LOGIN</Text>
//         </TouchableOpacity>
//         <View style={{ flexDirection: 'row', marginTop: 10 }}>
//           <Text style={{ marginRight: 10 }}>
//             Forgot Password?
//           </Text>
//           <Text style={{ color: '#04764e', textDecorationLine: 'underline', fontSize: 12 }}>
//             Reset Password
//           </Text>
//         </View>
//         <View style={{ marginTop: 80 }}>
//           <Text style={{ textAlign: 'center', fontSize: 12 }}>
//             Don't have any account?
//           </Text>
//           <TouchableOpacity style={[styles.btnLogin, { width: 300, marginTop: 5, backgroundColor: '#F6DBB3' }]} onPress={() => navigation.navigate('SignUp')}>
//             <Text style={[styles.btnText, { color: 'black', fontWeight: '500' }]}>CREATE AN ACCOUNT</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default SignIn;

import React, { useState } from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import styles from '../style';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('user1'); // You can remove the default values for production
  const [password, setPassword] = useState('password1');

  const handleLogin = async () => {
    try {
        const response = await fetch('http://10.0.2.2:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email, password }),
        });

        const data = await response.json();
        console.log('API Response:', data); // Log the API response

        if (response.ok) {
            if (data.token) {
                await AsyncStorage.setItem('jwtToken', data.token); // Store the token
                navigation.navigate('Home');
            } else {
                console.log('Token not received from server.'); // Log the error
                Alert.alert('Login Failed', 'Token not received from server.');
            }
        } else {
            Alert.alert('Login Failed', data.message);
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
        <Text style={{ color: 'black', fontSize: 20, marginBottom: 20 }}>Sign In</Text>
        <View>
          <TextInput
            placeholder='Enter Your Email'
            style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10, marginBottom: 10 }}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder='Enter Your Password'
            style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 10 }}
            secureTextEntry // To hide the password
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={[styles.btnLogin, { width: 300 }]} onPress={handleLogin}>
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={{ marginRight: 10 }}>
            Forgot Password?
          </Text>
          <Text style={{ color: '#04764e', textDecorationLine: 'underline', fontSize: 12 }}>
            Reset Password
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>
            Don't have any account?
          </Text>
          <TouchableOpacity style={[styles.btnLogin, { width: 300, marginTop: 5, backgroundColor: '#F6DBB3' }]} onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.btnText, { color: 'black', fontWeight: '500' }]}>CREATE AN ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;