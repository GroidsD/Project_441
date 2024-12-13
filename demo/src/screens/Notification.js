 import React, { useEffect, useState } from 'react';
 import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';

const Notification = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://10.0.2.2:3000/api/checkout', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched data:', data);
                const groupedOrders = groupOrdersById(data); 
                setOrders(groupedOrders);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                Alert.alert('Error', 'Failed to fetch order history');
            } finally {
                setLoading(false);
            }
        };

        const groupOrdersById = (orders) => {
            return orders.reduce((acc, order) => {
                order.orders.forEach((product) => {
                    const existingOrder = acc.find(o => o.id === order.orderId);
                    if (existingOrder) {
                        existingOrder.quantity += product.quantity;
                        existingOrder.totalPrice += parseFloat(product.totalPrice);
                        existingOrder.products.push({
                            productName: product.productName,
                            quantity: product.quantity,
                            totalPrice: product.totalPrice,
                        });
                    } else {
                        acc.push({
                            id: order.orderId,  // Use `orderId` here, ensure it's present
                            date: order.date,
                            totalPrice: parseFloat(product.totalPrice),
                            quantity: product.quantity,
                            products: [{
                                productName: product.productName,
                                quantity: product.quantity,
                                totalPrice: product.totalPrice,
                            }],
                        });
                    }
                });
                return acc;
            }, []);
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading orders...</Text>
            </View>
        );
    }

    if (orders.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No orders found.</Text>
            </View>
        );
    }
    console.log(orders,"logod");
    

    return (
        
        
        <View style={styles.container}>
            <Text style={styles.title}>History Order</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => (item.orderId ? item.orderId.toString() : '')} // Safe check for orderId
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Text style={styles.orderText}>Order ID: {item.id}</Text>
                        <Text style={styles.orderText}>Total Quantity: {item.quantity}</Text>
                        <Text style={styles.orderText}>Total Price: ${item.totalPrice.toFixed(2)}</Text>
                        <Text style={styles.orderText}>Date: {new Date(item.date.time).toLocaleDateString()}</Text>
                        <Text style={styles.orderText}>Products:</Text>
                        {item.products.map((product, index) => (
                            <Text key={index} style={styles.productText}>
                                - {product.productName} (Quantity: {product.quantity}, Total Price: ${product.totalPrice})
                            </Text>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    emptyText: {
        fontSize: 18,
        color: 'grey',
    },
    orderItem: {
        padding: 15,
        borderWidth:1,
        marginBottom:5,
        borderRadius:5

    },
    orderText: {
        fontSize: 16,
        marginVertical: 2,
    },
});

export default Notification;