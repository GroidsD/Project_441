import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser ] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser  = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          navigation.navigate('Login');
          return;
        }

        const response = await fetch('http://10.0.2.2:3000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched user data:', data); // Log the fetched user data
        setUser (data[0]); // Set the first user in the array
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
      }
    };

    fetchUser ();
  }, [navigation]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.avatar_url }} // Replace with actual user avatar URL
        style={styles.avatar}
      />
      <Text style={styles.welcomeText}>Welcome, {user.username}!</Text>
      <Text style={styles.infoText}>Phone: {user.phone}</Text>
      <Text style={styles.infoText}>Email: {user.gmail}</Text>
      <Text style={styles.infoText}>Address: {user.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background color
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it circular
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd', // Optional: border color
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Profile;