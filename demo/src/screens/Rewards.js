// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // Import the Picker
// import { useNavigation } from '@react-navigation/native';

// const Rewards = () => {
//   const navigation = useNavigation();
//   const [products, setProducts] = useState([]); // State to hold the list of products
//   const [selectedProductId, setSelectedProductId] = useState(null); // State for selected product
//   const [product, setProduct] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [feedback, setFeedback] = useState('');

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('http://10.0.2.2:3000/api/products');
//       if (response.ok) {
//         const data = await response.json();
//         setProducts(data); // Set the products state
//         setSelectedProductId(data[0]?.id); // Set the default selected product
//       } else {
//         Alert.alert('Error', 'Failed to fetch product data');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'An error occurred while fetching product data');
//       console.error(error);
//     }
//   };

//   const fetchProduct = async (productId) => {
//     try {
//       const response = await fetch(`http://10.0.2.2:3000/api/products/${productId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setProduct(data);
//       } else {
//         Alert.alert('Error', 'Failed to fetch product data');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'An error occurred while fetching product data');
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(); // Fetch products when component mounts
//   }, []);

//   useEffect(() => {
//     if (selectedProductId) {
//       fetchProduct(selectedProductId); // Fetch product details when selected product changes
//     }
//   }, [selectedProductId]);

//   const renderStars = () => {
//     let stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <TouchableOpacity key={i} onPress={() => setRating(i)}>
//           <Text style={[styles.star, { color: i <= rating ? '#FFD700' : '#ccc' }]}>
//             ★
//           </Text>
//         </TouchableOpacity>
//       );
//     }
//     return stars;
//   };

//   const handleSendFeedback = async () => {
//     if (rating === 0) {
//       Alert.alert('Please select a rating');
//       return;
//     }
//     if (!feedback.trim()) {
//       Alert.alert('Please enter some feedback');
//       return;
//     }

//     const newRate = product.rate + rating;
//     const newNumVoted = product.numVoted + 1;
//     const averageRating = newRate / newNumVoted;

//     const updatedProduct = {
//       ...product,
//       numVoted: newNumVoted,
//       rate: newRate,
//       averageRating: averageRating.toFixed(1),
//     };

//     setProduct(updatedProduct);
//     navigation.navigate("Blog");
//     Alert.alert('Thank You', 'Your feedback has been submitted.');
    
//     // Call backend to submit feedback
//     await sendFeedbackToBackend();
//   };

//   const sendFeedbackToBackend = async () => {
//     try {
//       await fetch(`http://10.0.2.2:3000/api/products/${selectedProductId}/rate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           rating,
//           feedback,
//         }),
//       });
//     } catch (error) {
//       console.error('Error submitting feedback:', error);
//     }
//   };

//   if (!product) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000 ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.pickerContainer}>
//   <Picker
//     selectedValue={selectedProductId}
//     onValueChange={(itemValue) => setSelectedProductId(itemValue)}
//     style={styles.picker}
//   >
//     {products.map((prod) => (
//       <Picker.Item key={prod.id} label={prod.name} value={prod.id} />
//     ))}
//   </Picker>
// </View>

//       {product.image_url && (
//         <Image source={{ uri: product.image_url }} style={styles.image} />
//       )}
//       <Text style={styles.name}>{product.name}</Text>

//       <View style={styles.ratingContainer}>
//         {renderStars()} {/* Render the stars */}
//       </View>
//       <Text style={styles.feedbackText}>
//         {rating} Star{rating > 1 ? 's' : ''}
//       </Text>

//       <View>
//         <Text style={styles.rate}>
//           Average Rating: {product.averageRating || '0'} ({product.numVoted} votes)
//         </Text>
//       </View>
//       <View style={styles.feedbackContainer}>
//         <TextInput
//           style={styles.feedbackInput}
//           placeholder="Write feedback here"
//           value={feedback}
//           onChangeText={setFeedback}
//         />
//       </View>
//       {/* "Send" Button */}
//       <TouchableOpacity
//         style={styles.sendButton}
//         onPress={handleSendFeedback}
//         accessibilityLabel="Submit feedback"
//       >
//         <Text style={styles.sendButtonText}>Send</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     maxHeight: 350,
//     resizeMode: 'cover',
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   star: {
//     fontSize: 30,
//     marginHorizontal: 5,
//   },
//   rate: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#777',
//     marginBottom: 20,
//   },
//   feedbackContainer: {
//     width: '100%',
//     marginTop: 20,
//   },
//   feedbackText: {
//     fontSize: 25,
//     color: '#555',
//     fontWeight: 'bold',
//   },
//   feedbackInput: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginTop: 10,
//     fontSize: 16,
//   },
//   sendButton: {
//     marginTop: 20,
//     backgroundColor: '#4CAF50',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   sendButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   pickerContainer: {
//     height: 50,
//     width: '100%',
//     marginBottom: 20,
//     borderColor: 'lightgrey',
//     borderWidth: 2,
//     borderRadius: 1,
//     overflow: 'hidden',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
// });

// export default Rewards;

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

const Rewards = () => {
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
          <Image source={{ uri: product.image_url }} style={styles.image} />
          <Text>{product.description}</Text>
          <Text>Price: ${product.price}</Text>
          <View style={styles.ratingContainer}>{renderStars()}</View>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Enter your feedback"
            value={feedback}
            onChangeText={setFeedback}
          />
          <TouchableOpacity onPress={handleSendFeedback} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* <ScrollView>
      <View>
        <Text style={styles.blogTitle}>Blog Posts</Text>
        {blogPosts.map((blog) => (
          <View key={blog.id} style={styles.blogPost}>
            <Text style={styles.blogPostTitle}>{blog.title}</Text>
            <Text>{blog.script}</Text>
          </View>
        ))}
      </View>
      </ScrollView> */}
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
    height: 200,
    resizeMode: 'cover',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
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
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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


export default Rewards;