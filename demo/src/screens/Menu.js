import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../style'; // Điều chỉnh đường dẫn nếu cần

const Menu = ({onClose, navigation}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: -20,
        zIndex: 99,
        backgroundColor: 'white',
        width: 220,
        height: '100%',
        padding: 15,
      }}>
      <ScrollView>
        <Button
          onPress={onClose}
          style={{position: 'absolute', top: 0, right: 0, fontWeight: 'bold'}}>
          <Text>X</Text>
        </Button>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Image
            style={[
              styles.imgLogin2,
              {marginLeft: 0, marginTop: 0, marginBottom: 0, marginRight: 40},
            ]}
            source={require('../images/logo1.jpg')}
          />
          <Text style={{color: '#04764e', fontWeight: 'bold', marginLeft: -30}}>
            Thức Coffee
          </Text>
        </View>
        <View>
          {/* Menu items */}
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={{flexDirection: 'row', marginBottom: 35}}>
              <Icon name="home" size={18} />
              <Text>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={{flexDirection: 'row', marginBottom: 35}}>
              <Icon name="account-box" size={18} />
              <Text>Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
            <View style={{flexDirection: 'row', marginBottom: 35}}>
              <Icon name="shopping-cart" size={18} />
              <Text>My Order</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Blog')}>
            <View style={{flexDirection: 'row', marginBottom: 35}}>
              <Icon name="assignment" size={18} />
              <Text>Blog</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Notifications')}>
            <View style={{flexDirection: 'row', marginBottom: 35}}>
              <Icon name="notifications" size={18} />
              <Text>Notifications</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Store Location')}>
            <View style={{flexDirection: 'row', marginBottom: 35}}>
              <Icon name="location-on" size={18} />
              <Text>Store Location</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Rewards')}>
            <View style={{flexDirection: 'row', marginBottom: 35}}>
              <Icon name="grade" size={18} />
              <Text>Rewards</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{flexDirection: 'row', marginBottom: 35}}>
              <Icon name="logout" size={18} color={'red'} />
              <Text>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Menu;
