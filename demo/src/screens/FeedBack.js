

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import the Picker
import { useNavigation } from '@react-navigation/native';


const FeedBack = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]); // State to hold the list of products
  const [selectedProductId, setSelectedProductId] = useState(null); // State for selected product
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [blogPosts, setBlogPosts] = useState([]); // State for blog posts

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setSelectedProductId(data[0]?.id); // Set the default selected product
      } else {
        Alert.alert('Error', 'Failed to fetch product data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching product data');
      console.error(error);
    }
  };

  // Fetch product details based on selected product ID
  const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        Alert.alert('Error', 'Failed to fetch product data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching product data');
      console.error(error);
    }
  };

  // Fetch blog posts
  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        Alert.alert('Error', 'Failed to fetch blog data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching blog data');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
    fetchBlogPosts(); // Fetch blog posts when component mounts
  }, []);

  useEffect(() => {
    if (selectedProductId) {
      fetchProduct(selectedProductId); // Fetch product details when selected product changes
    }
  }, [selectedProductId]);

  // Render stars for rating
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <TouchableOpacity key={i + 1} onPress={() => setRating(i + 1)}>
        <Text style={[styles.star, { color: i < rating ? '#FFD700' : '#ccc' }]}>★</Text>
      </TouchableOpacity>
    ));
  };

  // Handle feedback submission
  const handleSendFeedback = async () => {
    if (rating === 0) {
      Alert.alert('Please select a rating');
      return;
    }
    if (!feedback.trim()) {
      Alert.alert('Please enter some feedback');
      return;
    }

    const feedbackData = {
      productId: selectedProductId,
      rating,
      feedback,
      tags: product.grind_option || [], // Include product tags
    };

    console.log(feedbackData);

    try {
      const response = await fetch('http://10.0.2.2:3000/api/blogs/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const result = await response.json();
      Alert.alert('Thank You', result.message);
      navigation.navigate("Blog");

      // Fetch updated blog data
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'An error occurred while submitting feedback');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Feedback</Text>
      <Picker
        selectedValue={selectedProductId}
        onValueChange={(itemValue) => setSelectedProductId(itemValue)}
      >
        {products.map((product) => (
          <Picker.Item key={product.id} label={product.name} value={product.id} />
        ))}
      </Picker>
      {product && (
        <View>
          <Image  source={{ uri: product.image_url }} style={styles.image} />
          <Text style={{fontSize:15,textAlign:'center'}}>{product.description}</Text>
          <Text style={{fontSize:20,textAlign:'center',color:'#FF8000'}}> Price: ${product.price}</Text>
          <View style={styles.ratingContainer}>{renderStars()}</View>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Enter your feedback"
            value={feedback}
            onChangeText={setFeedback}
          />
          <TouchableOpacity onPress={handleSendFeedback} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 310,
    resizeMode: 'cover',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent:'center',
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#04764e',
    padding: 10,
    alignItems: 'center',
    borderRadius:10
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:22
  },
  blogTitle: {
    fontSize: 20,
    marginVertical: 10,
  },
  blogPost: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  blogPostTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default FeedBack;