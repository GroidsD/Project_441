import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from '../style';

const Started = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imgLogin} source={require('../images/logo1.jpg')} />
      <Text style={styles.textLogin}>Let's meet out summer</Text>
      <Text style={styles.textLogin}>coffee drinks</Text>
      <Text style={styles.textLoginSmall}>Wake up your dreams with a cup of coffee</Text>
      <TouchableOpacity
        style={styles.btnLogin}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.btnText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Started;