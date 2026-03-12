# eComm_class_live

A powerful and scalable backend for an e-commerce platform built with Node.js, Express, and MongoDB. This project provides a robust foundation for handling user authentication, category management, and product catalogs with built-in validation and security.

## 🚀 Features

-   **User Authentication**: Secure signup and signin using `bcryptjs` for password hashing and `jsonwebtoken` (JWT) for session management.
-   **Admin Initialization**: Automatically creates a default admin user on the first run.
-   **Category Management**: Complete CRUD operations for product categories.
-   **Product Catalog**: Comprehensive product management including:
    -   Full CRUD operations.
    -   Filtering products by category.
    -   Searching products by name (regex-based).
-   **Middleware Security**:
    -   Token verification for protected routes.
    -   Role-based access control (Admin only operations).
    -   Request body validation for all entities.

## 🛠️ Technology Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (via Mongoose)
-   **Security**: JWT, BcryptJS

## 📋 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/ecomm/api/v1/auth/signup` | Register a new user | Public |
| `POST` | `/ecomm/api/v1/auth/signin` | Login and receive JWT | Public |

### Categories
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/ecomm/api/v1/categories` | Create a new category | Admin |
| `GET` | `/ecomm/api/v1/categories` | Get all categories | Public |
| `GET` | `/ecomm/api/v1/categories/:id` | Get category by ID | Public |
| `PUT` | `/ecomm/api/v1/categories/:id` | Update a category | Admin |

### Products
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/ecomm/api/v1/products` | Create a new product | Admin |
| `GET` | `/ecomm/api/v1/products` | Get products (Search/Filter) | Public |
| `GET` | `/ecomm/api/v1/products/:id` | Get product by ID | Public |
| `PUT` | `/ecomm/api/v1/products/:id` | Update a product | Admin |
| `DELETE` | `/ecomm/api/v1/products/:id` | Delete a product | Admin |

> [!NOTE]
> For searching products by name, use: `GET /ecomm/api/v1/products?name=iPhone`
> For filtering by category, use: `GET /ecomm/api/v1/products?categoryId=<id>`

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd eComm_class_live-main
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Database Setup**:
    Ensure you have MongoDB running locally. The default connection URL is configured in `configs/db.config.js`:
    ```javascript
    DB_URL: "mongodb://localhost/ecomm_db"
    ```

4.  **Run the application**:
    ```bash
    node server.js
    ```
    The server will start on port `8888` by default.

## 🧪 Testing

You can use the provided `verify_api.js` script to verify the API functionality:
```bash
node verify_api.js
```
*Note: Ensure the server and MongoDB are running before executing the script.*
