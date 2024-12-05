import React from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'
import styles from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Login = ({navigation}) => {
  return (
    <View>
        <Image style={styles.imgLogin1} source={require('../images/logo1.jpg')} />
        <Text style={[styles.textLogin, {marginBottom: 20}]}>Morning begins with Thức Coffee</Text>
        <View>
        <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('SignIn')}>
          <Image source={require('../images/inbox.png')}/>
          <Text style={styles.btnText}>Login With Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnLogin, { backgroundColor: 'blue' }]} onPress={() => navigation.navigate('SignIn')}>
          <Image source={require('../images/facebook.png')}/>
            <Text style={styles.btnText}>Login With Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnLogin, {backgroundColor:'white', borderWidth: 1, borderColor: 'lightgrey'}]} onPress={() => navigation.navigate('SignIn')}>
          <Image source={require('../images/google-mail.png')}/>
          <Text style={[styles.btnText,{color: '#04764e'}]}>Login With Google</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login
