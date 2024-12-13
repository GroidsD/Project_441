
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [quantities, setQuantities] = useState({}); // State for quantities
    const [hasCheckedOut, setHasCheckedOut] = useState(false);

    useEffect(() => {
        if (!hasCheckedOut) {
            fetchOrders();
        }
    }, [hasCheckedOut]); // This ensures orders are fetched again if hasCheckedOut changes
    
    const fetchOrders = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/api/orders'); // Change to your API URL
            const data = await response.json();
            
            // Only set orders if we are not in checkout state
            if (!hasCheckedOut) {
                setOrders(data);
                // Initialize quantities for each order
                const initialQuantities = {};
                data.forEach(order => {
                    initialQuantities[order.id] = 1; // Set default quantity to 1
                });
                setQuantities(initialQuantities);
            } else {
                setOrders([]); // Clear orders if the user has checked out
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch orders');
            console.error(error);
        }
    };
    
    const handleCheckout = async () => {
        try {
            console.log(orders);
            
            const orderData = orders.map(order => ({
                id: order.id,
                productId:order.productId,
                productName: order.productName,
                productPrice: order.productPrice,
                quantity: quantities[order.id] || 1, // Only include quantity once
            }));

            console.log(orderData);
            
    
            const response = await fetch('http://10.0.2.2:3000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
    
            if (response.ok) {
                const result = await response.json();
                Alert.alert('Success', result.message);
    
                // Clear orders and quantities after successful checkout
                setOrders([]); // Reset the orders array locally
                setQuantities({}); // Reset the quantities state locally
                setHasCheckedOut(true); // Set the flag to prevent fetching orders again
            } else {
                Alert.alert('Error', 'Failed to place the order');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during checkout');
            console.error(error);
        }
    };
    

    // Handle increment of item quantity
    const incrementQuantity = (id) => {
        setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
    };

    // Handle decrement of item quantity
    const decrementQuantity = (id) => {
        setQuantities(prev => ({ ...prev, [id]: Math.max(prev[id] - 1, 1) }));
    };

    // Handle deletion of an order
    const deleteOrder = (id) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id)); // Remove order from state
        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[id]; // Remove quantity for the deleted order
            return newQuantities;
        });
    };

    // Calculate total price of all items in the cart
    const calculateTotalPrice = () => {
        return orders.reduce((total, item) => {
            const quantity = quantities[item.id] || 0; // Get the quantity for the current item
            return total + (item.productPrice * quantity); // Add to the total
        }, 0).toFixed(2); // Format to 2 decimal places
    };


    // Render each order item
    const renderOrder = ({ item }) => {
        const quantity = quantities[item.id]; // Get the quantity for the current item
        const totalPrice = (item.productPrice * quantity).toFixed(2); // Calculate total price for current item

        return (
            <View style={styles.orderItem}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                
                <View style={styles.orderDetails}>
                    <Text style={styles.productName}>{item.productName}</Text>
                    <View style={styles.quantityContainer}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.button}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.quantityInput}
                                value={quantity.toString()} // Get quantity from state
                                keyboardType='number-pad'
                                editable={false} // Make input read-only
                            />
                            <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.button}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => deleteOrder(item.id)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>Price: ${item.productPrice.toFixed(2)}</Text>
                        <Text style={styles.price}>{quantity}X</Text>
                        <Text style={[styles.price, { color: '#04764e', fontWeight: 'bold' }]}>${totalPrice}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                renderItem={renderOrder}
                keyExtractor={item => item.id.toString()}
            />
            <View>
                <Text style={[styles.price, { color: '#04764e', fontWeight: 'bold', marginTop: 20 }]}>
                    Total Price: ${calculateTotalPrice()}
                </Text>
                <TouchableOpacity style={{ backgroundColor: '#04764e', width: 100, padding: 10, borderRadius: 5, marginTop: 5 }} onPress={handleCheckout}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    orderItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderDetails: {
        marginLeft: 10,
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        width:""
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#04764e',
        borderRadius: 5,
        padding: 5,
        width: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 50,
        height: 20,
        textAlign: 'center',
        marginHorizontal: 5,
    },
    priceContainer: {
        flexDirection: 'row',
        marginTop: 5,
        maxWidth: '100%',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 16,
        marginTop: 2,
        marginRight: 9,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        marginTop: 0,
        borderRadius: 5,
        width:30,
        height:30,
        marginLeft:"60%"
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Orders;
