import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ProductDetail = ({ route, navigation }) => {
    const { product } = route.params;

    const handleAdd = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/orders', { // Change to your API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    productName: product.name,
                    productPrice: product.price,
                    image_url: product.image_url,
                    quantity: 1 // Default quantity is 1
                }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Product added to cart');
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Failed to add product to cart');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while adding product');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image_url }} style={styles.image} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
            <Text style={styles.originalPrice}>Original Price: ${product.originalPrice}</Text>
            <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>
                <Text style={styles.btnText}>
                    Add To Cart
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    image: {
        width: 200,
        height: 200,
        marginLeft: 'auto', marginRight: 'auto',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    originalPrice: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    btnAdd: {
        backgroundColor: '#04764e',
        width: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default ProductDetail;