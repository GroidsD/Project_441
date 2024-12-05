import React, { useEffect, useState } from 'react'
import {  Image, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native'
import styles from '../style'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import Menu from './Menu';
const Home = ({navigation}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [visibleProductsCount, setVisibleProductsCount] = useState(4);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('http://10.0.2.2:3000/api/users');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserName(data[0].username); // Set the user's name
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };
    
        const fetchProducts = async () => {
          try {
            const response = await fetch('http://10.0.2.2:3000/api/products');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data); // Store the fetched data in state
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };
    
        fetchUserData();
        fetchProducts();
      }, []);

    const showMenu = () => {
        setIsMenuOpen(true);
    };

    const showCart = () => {
        navigation.navigate('Orders')
    };

    const handleClose = () => {
        setIsMenuOpen(false);
    };

    const loadMoreProducts = () => {
        setVisibleProductsCount(prevCount => prevCount + 4); // Increase the number of visible products by 4
    };

    const categoryCounts = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const handleMenu = (category) => {
        navigation.navigate('ShowProduct', { category });
    };

    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) {
          return 'Good Morning';
        } else if (hours < 18) {
          return 'Good Afternoon';
        } else {
          return 'Good Evening';
        }
      };

  return (
    <ScrollView>
        <View style={{marginLeft: 20,marginRight: 20}}>
        {/* block menu left */}
        {isMenuOpen && <Menu onClose={handleClose} navigation={navigation} />} {/* Sử dụng Menu component */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
            <Text style={{ color: 'black' }}>{getGreeting()}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{userName}</Text>
          </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button onPress={showCart}>
                            <Icon name="shopping-cart" size={20} color="#04764e" />
                        </Button>
                        <Button onPress={showMenu}>
                            <Icon name="menu" size={20} color="black" />
                        </Button>
                    </View>
                </View>
        <TextInput
            placeholder='Search beverages of food'
            style={{backgroundColor: '#e9e9e9',borderRadius: 10,marginTop: 20,marginBottom: 20}}
        />
        {/* block product 1 */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                    {products.slice(0, visibleProductsCount).map((product, index) => (
                        <View key={index} style={styles.containerProduct}>
                            <Image style={styles.imgProduct} source={{ uri: product.image_url }} />
                            <View style={{position: 'absolute', bottom: 0, alignItems: 'center'}}>
                                <Text 
                                    style={{ color: 'white', textAlign: 'center', cursor: 'pointer' }} 
                                    onPress={() => navigation.navigate('ProductDetail', { product })}
                                >
                                    {product.name}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginRight: 10, color: 'white' }}>
                                        ${product.price}
                                    </Text>
                                    <Text style={{ color: 'lightgray', textDecorationLine: 'line-through' }}>
                                        ${product.originalPrice}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                
                {/* Load More Button */}
                {visibleProductsCount < products.length && (
                    <Button onPress={loadMoreProducts} style={{ marginTop: 20, alignSelf: 'center' }}>
                        <Text>Load More</Text>
                    </Button>
                )}

        {/* Categories */}
        <View>
            <Text style={{color: 'black',fontWeight: 'bold',fontSize: 15,marginTop: 15,marginBottom: 10}}>
                Categories
            </Text>
            <View>
                {/* Category row 1 */}
                <View style={{flexDirection: 'row',justifyContent: 'space-between',width: 300,marginLeft:'auto',marginRight:'auto'}}>
                    {/* Category block1 menu1 */}
                    <View style={{backgroundColor: 'white',flexDirection: 'row',borderStyle: 'solid',borderColor: '#efefef',borderWidth: 1,width: '45%',borderRadius: 10,padding: 10,alignItems: 'center'}}>
                        <Image source={require('../images/icon1.png')} />
                        <View>
                        <TouchableOpacity onPress={() => handleMenu('Beverages')}>
                            <Text style={{color: 'black',fontWeight: 'bold'}}>
                                Beverages
                            </Text>
                        </TouchableOpacity>
                            <Text style={{color: '#04764e', fontWeight: '500'}}>
                                {categoryCounts['Beverages'] || 0} Menus
                            </Text>
                        </View>
                    </View>

                    {/* Category block2 menu1 */}
                    <View style={{backgroundColor: 'white',flexDirection: 'row',borderStyle: 'solid',borderColor: '#efefef',borderWidth: 1,width: '45%',borderRadius: 10,padding: 10,alignItems: 'center'}}>
                        <Image source={require('../images/icon2.png')} />
                        <View>
                            <TouchableOpacity onPress={() => handleMenu('Food')}>
                                <Text style={{color: 'black',fontWeight: 'bold'}}>
                                    Food
                                </Text>
                            </TouchableOpacity>
                            <Text style={{color: '#04764e', fontWeight: '500'}}>
                                {categoryCounts['Food'] || 0} Menus
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Category row 2 */}
                <View style={{flexDirection: 'row',justifyContent: 'space-between',width: 300,marginLeft:'auto',marginRight:'auto',marginTop: 15}}>
                    {/* Category block1 menu1 */}
                    <View style={{backgroundColor: 'white',flexDirection: 'row',borderStyle: 'solid',borderColor: '#efefef',borderWidth: 1,width: '45%',borderRadius: 10,padding: 10,alignItems: 'center'}}>
                        <Image source={require('../images/icon3.png')} />
                        <View>
                            <TouchableOpacity onPress={() => handleMenu('Pizza')}>
                                <Text style={{color: 'black',fontWeight: 'bold'}}>
                                    Pizza
                                </Text>
                            </TouchableOpacity>
                            <Text style={{color: '#04764e', fontWeight: '500'}}>
                                {categoryCounts['Pizza'] || 0} Menus
                            </Text>
                        </View>
                    </View>

                    {/* Category block2 menu1 */}
                    <View style={{backgroundColor: 'white',flexDirection: 'row',borderStyle: 'solid',borderColor: '#efefef',borderWidth: 1,width: '45%',borderRadius: 10,padding: 10,alignItems: 'center'}}>
                        <Image source={require('../images/icon4.png')} />
                        <View>
                            <TouchableOpacity onPress={() => handleMenu('Drink')}>
                                <Text style={{color: 'black',fontWeight: 'bold'}}>
                                    Drink
                                </Text>
                            </TouchableOpacity>
                            <Text style={{color: '#04764e', fontWeight: '500'}}>
                                {categoryCounts['Drink'] || 0} Menus
                            </Text>
                        </View>
                    </View>
                </View>
                
            </View>
        </View>
        {/* Featured Beverages */}
        <View>
            <View>
                <Text style={{color: 'black',fontWeight: 'bold',fontSize: 15,marginTop: 15,marginBottom: 10}}>
                    Featured Beverages
                </Text>
                {/* Product 1 */}
                <View style={{flexDirection: 'row',marginBottom: 15}}>
                    <View style={{position: 'relative',alignItems: 'center'}}>
                        <Image 
                            source={require('../images/product1.jpg')}
                            style={{width: 80,height: 80,borderRadius: 10}}
                        />
                        <Text style={{position: 'absolute',top: 65,backgroundColor: '#ff8730',borderRadius: 15,padding: 3,color: 'white',fontWeight: 'bold'}}>
                            3.8 ★
                        </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: 'black',fontWeight: 'bold'}}>
                            Hot Creamy Cappuccino Latte
                        </Text>
                        <Text style={{color: 'black',fontWeight: 'bold'}}>
                            $12.6
                        </Text>
                    </View>
                </View>

                {/* Product 2 */}
                <View style={{flexDirection: 'row',marginBottom: 15}}>
                    <View style={{position: 'relative',alignItems: 'center'}}>
                        <Image 
                            source={require('../images/product2.jpg')}
                            style={{width: 80,height: 80,borderRadius: 10}}
                        />
                        <Text style={{position: 'absolute',top: 65,backgroundColor: '#ff8730',borderRadius: 15,padding: 3,color: 'white',fontWeight: 'bold'}}>
                            4.5 ★
                        </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: 'black',fontWeight: 'bold'}}>
                            Creamy Mocha Ome Coffee
                        </Text>
                        <Text style={{color: 'black',fontWeight: 'bold'}}>
                            $15.9
                        </Text>
                    </View>
                </View>
                {/* Product 3 */}
                <View style={{flexDirection: 'row',marginBottom: 15}}>
                    <View style={{position: 'relative',alignItems: 'center'}}>
                        <Image 
                             source={require('../images/product3.jpg')}
                            style={{width: 80,height: 80,borderRadius: 10}}
                        />
                        <Text style={{position: 'absolute',top: 65,backgroundColor: '#ff8730',borderRadius: 15,padding: 3,color: 'white',fontWeight: 'bold'}}>
                            3.8 ★
                        </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: 'black',fontWeight: 'bold'}}>
                            Tahini Chocolate Coffee Date Shake
                        </Text>
                        <Text style={{color: 'black',fontWeight: 'bold'}}>
                            $23.8
                        </Text>
                    </View>
                </View>
            </View>
           

        </View>
        </View>
    </ScrollView>
  )
}

export default Home
