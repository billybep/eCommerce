**CMS & Ecommers ROUTES**
- POST    `/login`

- GET     `/products`

- POST    `/products`
- PUT     `/products/:id`
- DELETE  `/products/:id`

- GET     `/customers`
- POST    `/customers`
- PUT     `/customers/:id`
- DELETE  `/customers/:id`

<hr><br />

**Login User**
--------------
  Returns json data of user has logged in

* **URL** <br/>
  `/login`

* **Method:** <br/>
  `POST`
  
* **URL Params** <br/>
  None

  **Required:**
  * **Headers** <br/>
    None

  * **Data Body**
  ```
    {
      "email": "client@mail.com",
      "password": "client123"
    }
  ```

* **Success Response:**
  * **Code:** 200 Ok <br />
    **Content:** 
    ```
    {
      "id": 5,
      "username": "client",
      "email": "client@mail.com",
      "role": "user",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJjbGllbnQiLCJlbWFpbCI6ImNsaWVudEBtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjE4MzI0NTA3fQ.8VN963q8PLDNu37cyhq9xmkI5ZBLtXZh12nEMlojln8"
    }
    ```
 
* **Error Response:**
  * **Code:** 400 Bad Request <br />
    **Content:** `{ "message": "wrong email/password" }`
    <br/>OR :
  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<hr><br />

**Read Products**
--------------
  Returns json data of All products

* **URL** <br/>
  `/products`

* **Method:** <br/>
  `GET`
  
* **URL Params** <br/>
  None

  **Required:**
  * **Headers** <br/>
    None

  * **Data Body** <br/>
  none

* **Success Response:**
  * **Code:** 200 Ok <br />
    **Content:** 
    ```
    {
      "products": 
      [
        {
            "id": 1,
            "name": "dummy",
            "description": "dummy description",
            "image_url": "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "price": 20000000,
            "stock": 5,
            "createdAt": "2021-04-13T14:20:37.786Z",
            "updatedAt": "2021-04-13T14:20:37.786Z"
        },
        {
            "id": 2,
            "name": "dummy",
            "description": "dummy description",
            "image_url": "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
            "price": 20000000,
            "stock": 5,
            "createdAt": "2021-04-13T14:22:10.700Z",
            "updatedAt": "2021-04-13T14:22:10.700Z"
        }
      ]
    }
    ```

* **Error Response:**
  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<hr><br />

**Create Product**
--------------
  Returns json data of new created product

* **URL** <br/>
  `/products`

* **Method:** <br/>
  `POST`
  
* **URL Params** <br/>
  None

  **Required:**
  * **Headers** <br/>
    access_token

  * **Data Body**
  ```
    {
      "name": "MacBook Pro 16",
      "description": "The best for the brightest",
      "image_url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "price": 21000000,
      "stock": 7
    }
  ```

* **Success Response:**
  * **Code:** 201 Ok <br />
    **Content:** 
    ```
    {
      "newProduct": {
        "id": 11,
        "name": "MacBook Pro 16",
        "description": "The best for the brightest",
        "image_url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        "price": 21000000,
        "stock": 7,
        "updatedAt": "2021-04-13T14:52:21.802Z",
        "createdAt": "2021-04-13T14:52:21.802Z"
      }
    }
    ```

* **Error Response:**
  * **Code:** 400 Bad Request <br />
    **Content:** `{ "message": "Validation notEmpty on name failed" }` <br />
    **Content:** `{ "message": "Validation notEmpty on description failed" }` <br />
    **Content:** `{ "message": "Validation notEmpty on image_url failed" }` <br />
    **Content:** `{ "message": "Validation notEmpty on price failed" }` <br />
    **Content:** `{ "message": "Validation notEmpty on stock failed" }` <br />
    <br/>OR :
  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<hr><br />

**Update Product**
--------------
  Returns json data of updated product

* **URL** <br/>
  `/products`

* **Method:** <br/>
  `PUT`
  
* **URL Params** <br/>
  `/products/:id`

  **Required:**

  * **Product id** <br/>
    `id = [integer]`

  * **Headers** <br/>
    access_token

  * **Data Body**
  ```
    {
      "name": "Lenovo",
      "description": "Ideapad",
      "image_url": "https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "price": 9000000,
      "stock": 5,
    }
  ```

* **Success Response:**
  * **Code:** 200 Ok <br />
    **Content:** 
    ```
    {
      "updated": [
        1,
        [
          {
            "id": 2,
            "name": "Lenovo",
            "description": "Ideapad",
            "image_url": "https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "price": 9000000,
            "stock": 5,
            "createdAt": "2021-04-13T14:22:10.700Z",
            "updatedAt": "2021-04-14T04:42:34.902Z"
          }
        ]
      ]
    }
    ```

* **Error Response:**
  * **Code:** 400 Bad Request <br />
    **Content:** `{ "message": "Validation notEmpty on name failed" }` <br />
    **Content:** `{ "message": "Validation notEmpty on description failed" }` <br />
    **Content:** `{ "message": "Validation notEmpty on image_url failed" }` <br />
    **Content:** `{ "message": "Validation notEmpty on price failed" }` <br />
    **Content:** `{ "message": "Validation notEmpty on stock failed" }` <br />
    <br/>OR :
  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Unauthorize user!" }` <br />
  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<hr><br /> 


**Delete Product**
--------------
  Returns json message deleted items

* **URL** <br/>
  `/products`

* **Method:** <br/>
  `DELETE`
  
* **URL Params** <br/>
  `/products/:id`

  **Required:**

  * **Product id** <br/>
    `id = [integer]`

  * **Headers** <br/>
    access_token

  * **Data Body** <br/>
  None

* **Success Response:**
  * **Code:** 200 Ok <br />
    **Content:** 
    ```
    {
      "message": "Product has been delete!"
    }
    ```

* **Error Response:**
  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Unauthorize user!" }`
    <br/>OR :
  * **Code:** 404 Not Found <br />
    **Content:** `{ "message": "Data not found!" }`
    <br/>OR :
  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<hr><br />


**Customer**
-------------

**Read Cart Items**
--------------
  Returns json data of All items in cart

* **URL** <br/>
  `/customers`

* **Method:** <br/>
  `GET`
  
* **URL Params** <br/>
  None

  **Required:**
  * **Headers** <br/>
    access_token

  * **Data Body** <br/>
  none

* **Success Response:**
  * **Code:** 200 Ok <br />
    **Content:** 
    ```
    {
      "cartItems": [
        {
            "id": 9,
            "username": "client",
            "email": "client@mail.com",
            "password": "$2b$07$rIdmlVEMIKbe877eWBjBT.BC1wnP7q6xmrapqc5JsiKNSHfnHRNUW",
            "role": "customer",
            "createdAt": "2021-04-14T06:44:02.807Z",
            "updatedAt": "2021-04-14T06:44:02.807Z",
            "Products": [
                {
                    "id": 10,
                    "name": "MacBook Pro 16",
                    "description": "The best for the brightest",
                    "image_url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                    "price": 21000000,
                    "stock": 7,
                    "createdAt": "2021-04-13T14:51:34.576Z",
                    "updatedAt": "2021-04-13T14:51:34.576Z",
                    "Cart": {
                        "ProductId": 10,
                        "UserId": 9,
                        "quantity": 6,
                        "status": null,
                        "createdAt": "2021-04-14T06:45:23.136Z",
                        "updatedAt": "2021-04-14T13:38:25.943Z"
                    }
                },
                {
                    "id": 14,
                    "name": "MacBook Air",
                    "description": "Power. It’s in the Air.",
                    "image_url": "https://images.unsplash.com/45/QDSMoAMTYaZoXpcwBjsL__DSC0104-1.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80",
                    "price": 19000000,
                    "stock": 11,
                    "createdAt": "2021-04-13T14:51:34.576Z",
                    "updatedAt": "2021-04-13T14:51:34.576Z",
                    "Cart": {
                        "ProductId": 14,
                        "UserId": 9,
                        "quantity": 6,
                        "status": null,
                        "createdAt": "2021-04-14T06:44:57.637Z",
                        "updatedAt": "2021-04-14T13:37:07.435Z"
                    }
                }
            ]
        }
      ]
    }
    ```

* **Error Response:**
  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<hr><br />

**Create/Add Cart**
--------------
  Returns json data of cart added

* **URL** <br/>
  `/customers`

* **Method:** <br/>
  `POST`
  
* **URL Params** <br/>
  None

  **Required:**
  * **Headers** <br/>
    access_token

  * **Data Body**
  ```
    {
      "ProductId" : 3,
      "quantity"  : 1
    }
  ```

* **Success Response:**
  * **Code:** 200 Ok <br />
    **Content:** 
    ```
    {
    "cartItem": 
      {
        "UserId": 10,
        "ProductId": 3,
        "quantity": 1,
        "updatedAt": "2021-04-14T14:22:43.366Z",
        "createdAt": "2021-04-14T14:22:43.366Z",
        "status": null
      }
    }
    ```

* **Error Response:**
  * **Code:** 400 Bad Request <br />
    **Content:** `{ "message": "InvalidToken" }` <br />
    <br/>OR :
  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<hr><br />

**Update Cart**
--------------
  Returns json data of updated Cart

* **URL** <br/>
  `/customers`

* **Method:** <br/>
  `PUT`
  
* **URL Params** <br/>
  `/customers/:id`

  **Required:**

  * **Product id** <br/>
    `id = [integer]`

  * **Headers** <br/>
    access_token

  * **Data Body**
  ```
    {
      "quantity" : 6
    }
  ```

* **Success Response:**
  * **Code:** 200 Ok <br />
    **Content:** 
    ```
    {
      "updated": [
        1,
        [
          {
            "ProductId": 14,
            "UserId": 9,
            "quantity": 6,
            "status": null,
            "createdAt": "2021-04-14T06:44:57.637Z",
            "updatedAt": "2021-04-14T14:28:52.486Z"
          }
        ]
      ]
    }
    ```

* **Error Response:**
  * **Code:** 401 Bad Request <br />
    **Content:** `{ "message": "Unauthorize!" }` <br />
    <br/>OR :
  * **Code:** 404 Unauthorized <br />
    **Content:** `{ "message": "Customer dont have cart item" }` <br />
  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<hr><br /> 

**Delete Cart**
--------------
  Returns json message deleted cart items

* **URL** <br/>
  `/customers`

* **Method:** <br/>
  `DELETE`
  
* **URL Params** <br/>
  `/customers/:id`

  **Required:**

  * **Product id** <br/>
    `id = [integer]`

  * **Headers** <br/>
    access_token

  * **Data Body** <br/>
  None

* **Success Response:**
  * **Code:** 200 Ok <br />
    **Content:** 
    ```
    {
      "message": "Product has been delete!"
    }
    ```

* **Error Response:**
  * **Code:** 401 Unauthorized <br />
    **Content:** `{ "message": "Unauthorize!" }`
    <br/>OR :
  * **Code:** 500 SERVER ERROR <br />
    **Content:** `{ error : "Internal Server Error" }`
<hr><br />