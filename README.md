
## Register

- **Method:** POST
- **Endpoint:** http://localhost:5000/api/user/register
- **Body:** raw (json)
  ```json
  {
      "name": "Priyansh",
      "email": "priyansh2v@gmail.com",
      "password": "Priyansh",
      "role": "student"
  }
  ```

## Login

- **Method:** POST
- **Endpoint:** http://localhost:5000/api/user/login
- **Body:** raw (json)
  ```json
  {
      "email": "priyansh2v@gmail.com",
      "password": "Priyansh"
  }
  ```

## GetUserFromID

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/user/66088b707f648cad946e24e4
- **Authorization:** Bearer Token
- **Token:** `<token>`

## AddRestaurant

- **Method:** POST
- **Endpoint:** http://localhost:5000/api/restaurant/
- **Authorization:** Bearer Token
- **Token:** `<token>`
- **Body:** raw (json)
  ```json
  {
    "name": "Cafe_Chai_Nashta",
    "description": "Hi",
    "menu": [
      {
        "item": "menu_item_id",
        "price": 2
      },
      {
        "item": "another_menu_item_id",
        "price": 1
      }
    ],
    "owner": "660892956b6e445441bbd940"
  }
  ```

## PlaceTheOrder

- **Method:** POST
- **Endpoint:** http://localhost:5000/api/order/
- **Authorization:** Bearer Token
- **Token:** `<token>`
- **Body:** raw (json)
  ```json
  {
    "user": "6608f4b86b9b66ae0e424fcf",
    "restaurant": "66089624569dca75c2838cfd",
    "items": [
      {
        "item": "66089624569dca75c2838cfe",
        "quantity": 2
      },
      {
        "item": "66089624569dca75c2838cff",
        "quantity": 2
      }
    ],
    "totalAmount": 6,
    "status": "pending"
  }
  ```

## GetAllRestaurants

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/restaurant/

## GetUser'sOrdersDetails

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/order/user/66088b707f648cad946e24e4
- **Authorization:** Bearer Token
- **Token:** `<token>`

## GetOrderDetails

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/order/6608f830e2bdbaff97c32f95
- **Authorization:** Bearer Token
- **Token:** `<token>`

## GetRestaurantDetail

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/restaurant/66089624569dca75c2838cfd

## PostLostAndFound

- **Method:** POST
- **Endpoint:** http://localhost:5000/api/lostAndFound
- **Authorization:** Bearer Token
- **Token:** `<token>`
- **Body:** raw (json)
  ```json
  {
    "user": "66088b707f648cad946e24e4",
    "type": "lost",
    "item": "ear pod",
    "description": "apple ear pod having silver finish",
    "location": "mhr ground"
  }
  ```

## GetAlllostAndFound

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/lostAndFound/

## GetUsersBorrowedBooksDetails

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/book/borrowed/66088b707f648cad946e24e4
- **Authorization:** Bearer Token
- **Token:** `<token>`

## UpdateOrderStatus

- **Method:** PUT
- **Endpoint:** http://localhost:5000/api/order/6608f753e2bdbaff97c32f8f
- **Authorization:** Bearer Token
- **Token:** `<token>`
- **Body:** raw (json)
  ```json
  {
      "status": "accepted"
  }
  ```

## GetRstaurant'sOrder

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/order/restaurant/66089624569dca75c2838cfd
- **Authorization:** Bearer Token
- **Token:** `<token>`

## PostEventByAdmin

- **Method:** POST
- **Endpoint:** http://localhost:5000/api/event
- **Authorization:** Bearer Token
- **Token:** `<token>`
- **Body:** raw (json)
  ```json
  {
    "title": "General Championship",
    "description": "Gc is an championship between different branches of the college",
    "date": "23 May 2023",
    "location": "MHR ground",
    "postedBy": "660911e60ea79ea0c276a5f0"
  }
  ```

## PostCommentToAnEvent

- **Method:** POST
- **Endpoint:** http://localhost:5000/api/event/660917e4d2d01021044a8d5e/
- **Authorization:** Bearer Token
- **Token:** `<token>`
- **Body:** raw (json)
  ```json
  {
    "comment": "What is the dress code",
    "postedBy": "66088b707f648cad946e24e4"
  }
  ```

## GetEventDetails

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/event/660917e4d2d01021044a8d5e/

## GetAllEventDetails

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/event/

## PostBOOKByAdmin

- **Method:** POST
- **Endpoint:** http://localhost:5000/api/book
- **Authorization:** Bearer Token
- **Token:** `<token>`
- **Body:** raw (json)
  ```json
  {
    "title": "Atomic Habits",
    "author": "Drake",
    "availableCount": 10
  }
  ```

## GetBookDetails

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/book/660933b7d0f4a77b284e482d/
- **Authorization:** Bearer Token
- **Token:** `<token>`

## GetAllBookDetails

- **Method:** GET
- **Endpoint:** http://localhost:5000/api/book/

## PostBorrowBookByUserByAdmin

- **Method:** POST
- **Endpoint:** http://localhost:5000/api/book
