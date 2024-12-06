
# Microservices Architecture

This project consists of three microservices: **OrderService**, **ProductService**, and **UserService**. Each service is responsible for managing a specific domain in the application.

---

## 1. OrderService

### Overview
The **OrderService** handles operations related to user orders, such as creating, retrieving, and updating order statuses.

### Technologies Used
- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: SQLite

### Directory Structure
```
OrderService/
├── app.js         # Main server file
├── database.js    # SQLite database operations
├── package.json   # Node.js dependencies and scripts
```

### Endpoints

#### 1. POST `/orders`
- **Description**: Create a new order.
- **Request Body**:
  ```json
  {
    "userId": 1,
    "productId": 101,
    "quantity": 2,
    "status": "Pending"
  }
  ```
- **Response**:
  - **Status 201** (Created):
    ```json
    {
      "message": "Order created successfully",
      "orderId": 1
    }
    ```
  - **Status 500** (Internal Server Error):
    ```json
    {
      "error": "Failed to create order"
    }
    ```

#### 2. GET `/orders/:userId`
- **Description**: Retrieve all orders for a user.
- **Response**:
  - **Status 200** (OK):
    ```json
    [
      {
        "OrderID": 1,
        "UserID": 1,
        "ProductID": 101,
        "Quantity": 2,
        "Status": "Pending"
      }
    ]
    ```
  - **Status 500** (Internal Server Error):
    ```json
    {
      "error": "Failed to retrieve orders"
    }
    ```

#### 3. PUT `/orders/:orderId/pay`
- **Description**: Update the order status to "Paid".
- **Response**:
  - **Status 200** (OK):
    ```json
    {
      "message": "Order status updated to Paid"
    }
    ```
  - **Status 404** (Not Found):
    ```json
    {
      "error": "Order not found"
    }
    ```

---

## 2. ProductService

### Overview
The **ProductService** manages products, including retrieving all products, adding new ones, and fetching details of specific products.

### Technologies Used
- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB

### Directory Structure
```
ProductService/
├── index.js         # Main server file
├── router.js        # Defines routes for product-related operations
├── controller.js    # Implements logic for product operations
├── model.js         # MongoDB schema for products
├── package.json     # Node.js dependencies and scripts
```

### Endpoints

#### 1. GET `/api/all-products`
- **Description**: Retrieve all products.
- **Response**:
  - **Status 200** (OK):
    ```json
    {
      "products": [
        {
          "_id": "64b4e3ff",
          "productName": "Product A",
          "description": "Description A",
          "price": "100",
          "quantity": 10
        }
      ]
    }
    ```

#### 2. GET `/api/product/:_id`
- **Description**: Retrieve a product by ID.
- **Response**:
  - **Status 200** (OK):
    ```json
    {
      "products": {
        "_id": "64b4e3ff",
        "productName": "Product A",
        "description": "Description A",
        "price": "100",
        "quantity": 10
      }
    }
    ```
  - **Status 403** (Forbidden):
    ```json
    {
      "message": "Please Give Product id"
    }
    ```

#### 3. POST `/api/products`
- **Description**: Add a new product.
- **Request Body**:
  ```json
  {
    "productName": "Product B",
    "description": "Description B",
    "price": "200",
    "quantity": 5
  }
  ```
- **Response**:
  - **Status 201** (Created):
    ```json
    {
      "message": "Product Created Successfully",
      "products": [ ... ]
    }
    ```
  - **Status 403** (Forbidden):
    ```json
    {
      "message": "Product Already Exists"
    }
    ```

---

## 3. UserService

### Overview
The **UserService** manages user accounts, including registration and login functionality.

### Technologies Used
- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)

### Directory Structure
```
UserService/
├── index.js           # Main server file
├── userRoutes.js      # Defines user-related routes
├── userController.js  # Implements logic for user operations
├── db.js              # Supabase database connection
├── package.json       # Node.js dependencies and scripts
```

### Endpoints

#### 1. POST `/user/register`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**:
  - **Status 201** (Created):
    ```json
    {
      "message": "User registered successfully.",
      "user": [ ... ]
    }
    ```
  - **Status 500** (Internal Server Error):
    ```json
    {
      "error": "Internal server error."
    }
    ```

#### 2. POST `/user/login`
- **Description**: Authenticate a user.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**:
  - **Status 200** (OK):
    ```json
    {
      "message": "Login successful.",
      "user": { "id": 1, "name": "John Doe" }
    }
    ```
  - **Status 400** (Bad Request):
    ```json
    {
      "error": "Invalid credentials."
    }
    ```

---

## Author Details
- **Name**: Muhammad Osama
- **University**: Fast - NUCES Karachi Campus
- **ID**: 23K-7800
