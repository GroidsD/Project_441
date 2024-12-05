import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const ShowProduct = ({ route, navigation }) => {
    const { category } = route.params; // Lấy danh mục từ params
    const [products, setProducts] = useState([]);

    // Fetch data từ API
    useEffect(() => {
        fetch('http://10.0.2.2:3000/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Lọc sản phẩm theo danh mục
                const filteredProducts = data.filter(product => product.category === category);
                setProducts(filteredProducts); // Lưu sản phẩm đã lọc vào state
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [category]);

    return (
        <ScrollView>
            <View style={{ margin: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{category} Products</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {products.map((product, index) => (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => navigation.navigate('ProductDetail', { product })} // Wrap in an arrow function
                            style={{ width: '45%', marginBottom: 20 }}
                        >
                            <Image 
                                style={{ width: '100%', height: 150, borderRadius: 10 }} 
                                source={{ uri: product.image_url }} 
                            />
                            <Text style={{ fontWeight: 'bold' }}>{product.name}</Text>
                            <Text>${product.price}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default ShowProduct;