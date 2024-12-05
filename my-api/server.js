const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Product data
const products = [
    {
        "_id": "6424335b59f9f6fdd657d2e1",
        "id": 1,
        "name": "Signature Blend",
        "description": "A rich, full-bodied coffee with notes of dark chocolate and black cherry. Grown on the slopes of a mist-covered mountain in Central America.",
        "price": 12.99,
        "originalPrice": 15.85,
        "region": "Central America",
        "weight": 500,
        "flavor_profile": ["Dark Chocolate", "Black Cherry"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 3,
        "image_url": "http://10.0.2.2:3000/images/pic1.png",
        "category": "Drink",
       	"rate":0,
        "numVoted": 0
    },
    {
        "_id": "6424338559f9f6fdd657d2e2",
        "id": 2,
        "name": "Golden Sunrise",
        "description": "A smooth and bright coffee with a citrusy kick. Sourced from the rolling hills of Africa.",
        "price": 10.99,
        "originalPrice": 13.55,
        "region": "Africa",
        "weight": 500,
        "flavor_profile": ["Citrus"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic2.png",
        "category": "Drink",
        "rate":0,
        "numVoted": 0
    },
    {
        "_id": "6424338959f9f6fdd657d2e3",
        "id": 3,
        "name": "Rainforest",
        "description": "An earthy and complex coffee with notes of toasted nuts and caramel. Sustainably grown in the rainforests of South America.",
        "price": 14.99,
        "originalPrice": 17.50,
        "region": "South America",
        "weight": 500,
        "flavor_profile": ["Toasted Nuts", "Caramel"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic3.png",
        "category": "Drink",
       "rate":0,
        "numVoted": 0
    },
    {
        "_id": "6424338959f9f6fdd657d2e4",
        "id": 4,
        "name": "Chilean Charm",
        "description": "This coffee boasts a smooth and balanced flavor, with notes of chocolate, caramel, and a hint of fruit. It has a medium body and a subtle acidity that will leave you feeling refreshed and energized.",
        "price": 12.99,
        "originalPrice": 15.00,
        "region": "South America",
        "weight": 500,
        "flavor_profile": ["Chocolate", "Caramel", "Fruit"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic4.png",
        "category": "Drink",
       "rate":0,
        "numVoted": 0

    },
    {
        "_id": "6424338959f9f6fdd657d2e5",
        "id": 5,
        "name": "Ethiopian Delight",
        "description": "A light and floral coffee with bright acidity and notes of jasmine and bergamot. Sourced from the highlands of Ethiopia.",
        "price": 11.99,
        "originalPrice": 14.00,
        "region": "Ethiopia",
        "weight": 500,
        "flavor_profile": ["Jasmine", "Bergamot"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 1,
        "image_url": "http://10.0.2.2:3000/images/pic5.png",
        "category": "Drink",
       "rate":0,
        "numVoted": 0
    },
    {
        "_id": "6424338959f9f6fdd657d2e6",
        "id": 6,
        "name": "Sumatra Mandheling",
        "description": "A full-bodied coffee with rich, earthy flavors and a smooth finish. Grown in the volcanic soil of Sumatra.",
        "price": 13.49,
        "originalPrice": 16.99,
        "region": "Indonesia",
        "weight": 500,
        "flavor_profile": ["Earthy", "Rich"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 3,
        "image_url": "http://10.0.2.2:3000/images/pic6.png",
        "category": "Drink",
        "rate":0,
        "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68f",
        "id": 7,
        "name": "French Roast",
        "description": "A dark roast coffee with a bold flavor and smoky undertones. Perfect for those who enjoy a rich cup of coffee.",
        "price": 13.99,
        "originalPrice": 16.50,
        "region": "France",
        "weight": 500,
        "flavor_profile": ["Smoky", "Bold"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 4,
        "image_url": "http://10.0.2.2:3000/images/pic7.png",
        "category": "Drink",
        "rate":0,
        "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68g",
        "id": 8,
        "name": "Vanilla Hazelnut",
        "description": "A flavored coffee that combines the sweet aroma of vanilla with the nutty flavor of hazelnuts. A delightful treat for coffee lovers.",
        "price": 12.49,
        "originalPrice": 14.99,
        "region": "USA",
        "weight": 500,
        "flavor_profile": ["Vanilla", "Hazelnut"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic8.png",
        "category": "Drink",
      "rate":0,
        "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68h",
        "id": 9,
        "name": "Cinnamon Spice",
        "description": "A delightful blend of coffee with a hint of cinnamon and spices. Perfect for a cozy morning or afternoon pick-me-up.",
        "price": 11.49,
        "originalPrice": 13.00,
        "region": "USA",
        "weight": 500,
        "flavor_profile": ["Cinnamon", "Spices"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic9.png",
        "category": "Drink",
       "rate":0,
        "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68i",
        "id": 10,
        "name": "Mocha Java",
        "description": "A classic blend of coffee from Yemen and Java, known for its rich flavor and chocolatey notes.",
        "price": 14.49,
        "originalPrice": 17.00,
        "region": "Yemen & Indonesia",
        "weight": 500,
        "flavor_profile": ["Chocolate", "Rich"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 3,
        "image_url": "http://10.0.2.2:3000/images/pic10.png",
        "category": "Drink",
       "rate":0,
        "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68j",
        "id": 11,
        "name": "Cold Brew Blend",
        "description": "A smooth and mellow coffee blend designed specifically for cold brewing. Perfect for hot summer days.",
        "price": 13.99,
        "originalPrice": 15.99,
        "region": "USA",
        "weight": 500,
        "flavor_profile": ["Smooth", "Mellow"],
        "grind_option": ["Coarse Grind"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic11.png",
         "category": "Drink",
         "rate":0,
         "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68k",
        "id": 12,
        "name": "Decaf Delight",
        "description": "A smooth and flavorful decaffeinated coffee that retains all the richness without the caffeine.",
        "price": 11.99,
        "originalPrice": 13.00,
        "region": "Brazil",
        "weight": 500,
        "flavor_profile": ["Rich", "Smooth"],
        "grind_option": ["Whole Bean", "Cafetiere", "Filter", "Espresso"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic12.png",
        "category": "Drink",
        "rate":0,
        "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68l",
        "id": 13,
        "name": "Pizza",
        "description": "A delicious and flavorful food.",
        "price": 20.99,
        "originalPrice": 15.00,
        "region": "Italia",
        "weight": 600,
        "flavor_profile": ["Delicious", "Flavorful"],
        "grind_option": ["Seafood Pizza", "Oringinal Pizza", "Spicy Pizza", "Cheese Pizza"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic13.png",
        "category": "Pizza",
        "rate":0,
        "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68m",
        "id": 14,
        "name": "Hamburger",
        "description": "A fastfood and popular food.",
        "price": 9.99,
        "originalPrice": 10.00,
        "region": "US",
        "weight": 150,
        "flavor_profile": ["Delicious", "BigSize"],
        "grind_option": ["Chicken Hamburger", "Oringinal Hamburger", "Beef Hamburger", "Cheese Hamburger"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic14.png",
        "category": "Food",
       "rate":0,
        "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68n",
        "id": 15,
        "name": "Cake",
        "description": "A delicious and sweety cake.",
        "price": 5.99,
        "originalPrice": 6.50,
        "region": "VietNam",
        "weight": 50,
        "flavor_profile": ["Delicious", "Sweety"],
        "grind_option": ["Bumpy Cake", "Sand Cake", "Plain Cake", "Chocolate Cake"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic15.png",
         "category": "Food",
         "rate":0,
         "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68o",
        "id": 16,
        "name": "Banh Mi's Vietnam",
        "description": "A delicious and popular food in VietNam.",
        "price": 10.99,
        "originalPrice": 12.50,
        "region": "VietNam",
        "weight": 50,
        "flavor_profile": ["Delicious", "Spicy"],
        "grind_option": ["Original Banh Mi", "Roast Pork Banh Mi", "Beef Banh Mi", "Stick Banh Mi"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic16.png",
         "category": "Food",
         "rate":0,
         "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68o",
        "id": 17,
        "name": "Pho's Vietnam",
        "description": "A Rich and Delicious food in VietNam.",
        "price": 25.99,
        "originalPrice": 28.50,
        "region": "VietNam",
        "weight": 200,
        "flavor_profile": ["Delicious", "Rich"],
        "grind_option": ["Original Pho", "Speacial Pho"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic17.png",
         "category": "Food",
        "rate":0,
         "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68p",
        "id": 18,
        "name": "Spaghetti",
        "description": "A rich and smooth food.",
        "price": 19.99,
        "originalPrice": 22.50,
        "region": "Italia",
        "weight": 200,
        "flavor_profile": ["Rich", "Smooth"],
        "grind_option": ["Original Spagetti", "Speacial Spagetti"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic18.png",
         "category": "Food",
        "rate":0,
         "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68q",
        "id": 19,
        "name": "Fried Chicken",
        "description": "A fastfood and tasty .",
        "price": 4.99,
        "originalPrice": 6.50,
        "region": "VietNam",
        "weight": 100,
        "flavor_profile": ["Fragrant", "Tasty"],
        "grind_option": ["Original Chicken", "Spicy Chicken","Fried Chicken(Fish Sauce)"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic19.png",
         "category": "Food",
         "rate":0,
         "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68r",
        "id": 20,
        "name": "Pan Cake",
        "description": "A rich and delicious food.",
        "price": 19.99,
        "originalPrice": 29.99,
        "region": "UK",
        "weight": 500,
        "flavor_profile": ["Rich", "Delicious"],
        "grind_option": ["Original Pan Cake", "Strawberry Pan Cake","Honey Pan Cake"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic20.png",
         "category": "Food",
        "rate":0,
         "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68s",
        "id": 21,
        "name": "Pepsi",
        "description": "A popular softdrink",
        "price": 5.99,
        "originalPrice": 6,
        "region": "VietNam",
        "weight": 500,
        "flavor_profile": ["Sweety", "Gas"],
        "grind_option": ["Original Pepsi"," No Sugar Pepsi"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic21.png",
         "category": "Beverages",
        "rate":0,
         "numVoted": 0
    },{
        "_id": "642d3d8719341833719cd68t",
        "id": 22,
        "name": "Coca-cola",
        "description": "A popular softdrink",
        "price": 5.99,
        "originalPrice": 6,
        "region": "VietNam",
        "weight": 500,
        "flavor_profile": ["Sweety", "Gas"],
        "grind_option": ["Coffee"," No Sugar Coca-cola"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic22.png",
         "category": "Beverages",
        "rate":0,
         "numVoted": 0
    },{
        "_id": "642d3d8719341833719cd68u",
        "id": 23,
        "name": "Bottled Water",
        "description": "A popular softdrink",
        "price": 2.99,
        "originalPrice": 4,
        "region": "VietNam",
        "weight": 500,
        "flavor_profile": ["Fesher", "Gas"],
        "grind_option": ["Aquafina Water","Biconsi Water"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic23.png",
         "category": "Beverages",
         "rate":0,
         "numVoted": 0
    },
    {
        "_id": "642d3d8719341833719cd68v",
        "id": 24,
        "name": "RedBull",
        "description": "A popular softdrink",
        "price": 2.99,
        "originalPrice": 4,
        "region": "VietNam",
        "weight": 500,
        "flavor_profile": ["Fesher", "Gas"],
        "grind_option": ["Original RedBull","Energy RedBull"],
        "roast_level": 2,
        "image_url": "http://10.0.2.2:3000/images/pic20.png",
         "category": "Beverages",
         "rate":0,
         "numVoted": 0
    },
    
];

// User data
const users = [
    {
        username: 'user1',
        password: 'password1',
	phone: '0123456789',
	gmail: 'user1@gmail.com',
	address: '123 Thu Dau Mot, Binh Duong',
	avatar_url: 'http://10.0.2.2:3000/images/avatar.jpg'
    },
    {
        username: 'user2',
        password: 'password2',
	phone: '0987654321',
	gmail: 'user2@gmail.com',
	address: '789 Ben Cat, Binh Duong'
    }
];

const blogs = [
    {
        id: 21,
        title: 'Pepsi',
        author: 'Duc Nguyen',
        date: 'October 4, 2022',
        image_url: "http://10.0.2.2:3000/images/pic21.png",
        tags: ['Coffee', 'Espresso', 'Cold brew'],
        script: 'The coffee is so good! Need to try it.',
        numRatings: 1, // Khởi tạo số lượng đánh giá
        averageRating: 3 // Khởi tạo điểm trung bình
    },
    {
        id: 2,
        title: 'Cake',
        author: 'Thao Tran',
        date: 'September 3, 2022',
        image_url: "http://10.0.2.2:3000/images/pic20.png",
        tags: ['Black Coffee', 'Cappuccino'],
        script: 'Very good for me when I worked 10 hours a day!',
        numRatings: 1, // Khởi tạo số lượng đánh giá
        averageRating: 5 // Khởi tạo điểm trung bình
    },
    {
        id: 3,
        title: 'Pizza',
        author: 'Vu Nguyen',
        date: 'October 1, 2022',
        image_url: "http://10.0.2.2:3000/images/pizza.png",
        tags: ['Food'],
        script: 'Very delicious!',
        numRatings: 1, // Khởi tạo số lượng đánh giá
        averageRating: 4 // Khởi tạo điểm trung bình
    },
];

// Orders data
const orders = [];

// Route to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Route to get a product by ID
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return res.status(404).send('Product not found.');
    }

    res.json(product);
});

// Route to add a product to the cart
app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        return res.status(404).send('Product not found.');
    }

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    res.json({ message: 'Product added to cart!', cart });
});

// Route to get cart items
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Route to remove a product from the cart
app.delete('/api/cart/:productId', (req, res) => {
 const productId = req.params.productId;
    const index = cart.findIndex(item => item.productId === productId);

    if (index === -1) {
        return res.status(404).send('Product not found in cart.');
    }

    cart.splice(index, 1);
    res.json({ message: 'Product removed from cart!', cart });
});

// Route to handle checkout
app.post('/api/checkout', (req, res) => {
    const orderData = req.body;

    // Validate input
    if (!Array.isArray(orderData) || orderData.length === 0) {
        return res.status(400).send('Order data is required.');
    }

    // Process each order
    orderData.forEach(order => {
        const { id, quantity } = order;
        const product = products.find(p => p.id === id);

        if (product) {
            const newOrder = {
                id: orders.length + 1,
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                quantity,
                totalPrice: (product.price * quantity).toFixed(2),
                date: new Date(),
                image_url: product.image_url,
            };
            orders.push(newOrder);
        }
    });

    res.status(201).json({ message: 'Checkout successful!', orders });
});


// Route to get all blogs
app.get('/api/blogs', (req, res) => {
    res.json(blogs);
});

const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// Secret key for signing the JWT
const JWT_SECRET = 'abcxyz123456';
// Route to handle user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).send('Invalid username or password.');
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

    res.json({ message: 'Login successful!', token }); // Return the token
});

// Route to get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Route to handle user signup
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    // Check if the username already exists
    const existingUser  = users.find(u => u.username === username);
    if (existingUser ) {
        return res.status(409).send('Username already exists.');
    }

    // Add the new user to the users array
    users.push({ username, password });
    res.status(201).json({ message: 'User  registered successfully!' });
});

// Route to handle creating an order
app.post('/api/orders', (req, res) => {
    const { productId, productName, productPrice, image_url } = req.body;

    // Validate input
    if (!productId || !productName || !productPrice) {
        return res.status(400).send('Product ID, name, and price are required.');
    }

    // Create a new order object
    const newOrder = {
        id: orders.length + 1, // Simple ID generation
        productId,
        productName,
        productPrice,
        date: new Date(),
	image_url,
    };

    // Add the new order to the orders array
    orders.push(newOrder);
    res.status(201).json({ message: 'Order created successfully!', order: newOrder });
});

// Route to get all orders
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Endpoint to handle product ratings submission
app.post('/api/products/:id/rate', (req, res) => {
    const productId = req.params.id;
    const { rating } = req.body;  // Expecting a rating between 1 and 5

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product's rating and numVoted
    product.numVoted += 1;
    product.rate = ((product.rate * (product.numVoted - 1)) + rating) / product.numVoted;

    res.json({
        message: 'Rating submitted successfully',
        product: product
    });
});
app.get('/api/products', (req, res) => {
    res.json(products);
});

// New endpoint to submit feedback for a product
app.post('/api/blogs/feedback', (req, res) => {
    const { productId, rating, feedback } = req.body;

    // Validate input
    if (!productId || rating < 1 || rating > 5 || !feedback) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    // Check if the product exists
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the blog entry for the product already exists
    const existingBlog = blogs.find(blog => blog.id === productId);

    if (existingBlog) {
        // Update the existing blog entry with new feedback
        existingBlog.script += `\nRating: ${rating}, Feedback: ${feedback}`;

        // Update the average rating and number of ratings
        existingBlog.numRatings = (existingBlog.numRatings || 0) + 1; // Increment the number of ratings
        existingBlog.averageRating = ((existingBlog.averageRating || 0) * (existingBlog.numRatings - 1) + rating) / existingBlog.numRatings; // Calculate new average

        res.status(200).json({ message: 'Feedback added to existing blog entry', blog: existingBlog });
    } else {
        // Create a new blog entry with the product name as the title
        const newBlog = {
            id: productId,
            title: product.name, // Use the product's name as the title
            author: 'Anonymous', // You can modify this to get the actual user
            date: new Date().toLocaleDateString(),
            image_url: product.image_url || '', // Use the product's image URL
            tags: ['Coffee'], // Gán tag mặc định hoặc lấy từ một nguồn khác
            script: `Rating: ${rating}, Feedback: ${feedback}`,
            numRatings: 1, // Set initial number of ratings to 1
            averageRating: rating // Set initial average rating to the first rating
        };
        blogs.push(newBlog);
        res.status(201).json({ message: 'New blog entry created', blog: newBlog });
    }
});