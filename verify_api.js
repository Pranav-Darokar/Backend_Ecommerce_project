const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:8888/ecomm/api/v1';
let adminToken = '';
let categoryId = '';
let productId = '';

async function runTests() {
    try {
        console.log("--- Starting Verification Tests ---");

        // 1. Login as Admin
        console.log("\n1. Logging in as Admin...");
        const loginRes = await axios.post(`${BASE_URL}/auth/signin`, {
            userId: "admin",
            password: "Welcome1"
        });
        adminToken = loginRes.data.accessToken;
        console.log("Admin logged in successfully.");

        // 2. Create a Category
        console.log("\n2. Creating a Category...");
        const catRes = await axios.post(`${BASE_URL}/categories`, {
            name: "Electronics",
            description: "Gadgets and devices"
        }, {
            headers: { 'x-access-token': adminToken }
        });
        categoryId = catRes.data._id;
        console.log(`Category created: ${catRes.data.name} (${categoryId})`);

        // 3. Get All Categories
        console.log("\n3. Fetching all categories...");
        const allCatsRes = await axios.get(`${BASE_URL}/categories`);
        console.log(`Found ${allCatsRes.data.length} categories.`);

        // 4. Create a Product
        console.log("\n4. Creating a Product...");
        const prodRes = await axios.post(`${BASE_URL}/products`, {
            name: "Smartphone",
            description: "Latest model with great camera",
            price: 699,
            categoryId: categoryId
        }, {
            headers: { 'x-access-token': adminToken }
        });
        productId = prodRes.data._id;
        console.log(`Product created: ${prodRes.data.name} (${productId})`);

        // 5. Get All Products
        console.log("\n5. Fetching all products...");
        const allProdsRes = await axios.get(`${BASE_URL}/products`);
        console.log(`Found ${allProdsRes.data.length} products.`);

        // 6. Update Product
        console.log("\n6. Updating Product price...");
        const updateProdRes = await axios.put(`${BASE_URL}/products/${productId}`, {
            name: "Smartphone Pro",
            description: "Latest model with great camera",
            price: 799,
            categoryId: categoryId
        }, {
            headers: { 'x-access-token': adminToken }
        });
        console.log(`Product updated. New price: ${updateProdRes.data.price}`);

        // 7. Delete Product
        console.log("\n7. Deleting Product...");
        const delRes = await axios.delete(`${BASE_URL}/products/${productId}`, {
            headers: { 'x-access-token': adminToken }
        });
        console.log(delRes.data.message);

        console.log("\n--- Verification Tests Completed Successfully ---");
    } catch (err) {
        console.error("\n!!! Test Failed !!!");
        if (err.response) {
            console.error(`Status: ${err.response.status}`);
            console.error(`Data: ${JSON.stringify(err.response.data)}`);
            console.error(`Headers: ${JSON.stringify(err.response.headers)}`);
        } else if (err.request) {
            console.error("No response received from server. Is the server running on port 8888?");
            console.error(err.message);
        } else {
            console.error(`Error Message: ${err.message}`);
        }
    }
}

runTests();
