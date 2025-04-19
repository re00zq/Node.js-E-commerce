# 🛍️ E-Commerce API – Bilingual (English/Arabic)

This is a full-featured bilingual (English/Arabic) e-commerce backend built using **Express.js/NestJS**, **MongoDB**, and **TypeScript**. It includes JWT-based authentication, role-based access control (Admin/User), modular architecture, and follows **JSend** API response conventions.

## 📦 Features

- ✅ JWT Authentication & Authorization
- ✅ Role-Based Access Control (Admin/User)
- ✅ RESTful APIs following **JSend**
- ✅ Modular & Scalable Project Structure
- ✅ MongoDB (with Mongoose)
- ✅ Cart & Order Management
- ✅ Product & Category CRUD
- ✅ Bilingual Localization (English / Arabic)

## 📁 Tech Stack

- **Backend:** Express.js / NestJS + TypeScript
- **Database:** MongoDB + Mongoose
- **Auth:** JWT
- **Language Support:** i18n (nestjs-i18n)
- **Validation:** class-validator

## 🚀 Getting Started

### 📌 Prerequisites

- Node.js v18+
- MongoDB (local or cloud)
- npm or yarn

### 📥 Installation

```bash
git clone https://github.com/re00zq/Node.js-E-commerce
cd Node.js-E-commerce
npm install
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
#DATABASE CONFIGRATION
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_USERNAME=mongodb
DATABASE_NAME=e-commerce

#JWT access token
JWT_SECRET=thisIsveryStrongSecretForJwt
JWT_EXPIRED_IN="1m"

#JWT refresh token
JWT_REFRESH_SECRET=thisIsVeryStrongRefreshSecretForJwt
JWT_REFRESH_EXPIRED_IN="30D"

#JWT confirmation token
JWT_CONFIRMATION_SECRET="THIS+IS+VERY+STRONG+PASSWORD"
JWT_CONFIRMATION_EXPIRED_IN="1D"

#MAIL
MAIL_HOST=smtp.gmail.com
MAIL_SERVICE=gmail
SMTP_USERNAME=your.email@gmail.com
SMTP_PASSWORD="your-SMTP-password"
SMTP_PORT=587


#SERVER
HOST=localhost
PORT=3000
URL=http://localhost:3000
```

## 🏁 Running the App

```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

## 🌐 Localization

This app supports both Arabic and English using `nestjs-i18n`.

To change language:

- Send a request header:  
  `x-lang: en` or `x-lang: ar`
- Send a request with param:  
  `lang: en` or `lang: ar`

## 📚 API Endpoints Overview

### Auth

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/register` | User registration |
| POST   | `/auth/login`    | Login (JWT token) |
| POST   | `/auth/refresh`  | Refresh Token     |
| POST   | `{ConfirmToken}` | Confirm Email     |
| POST   | `/auth/register` | User registration |
| POST   | `/auth/logout`   | Logout            |

### Products

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| GET    | `/products`                | List all products   |
| Get    | `/products/:id`            | Fing Product        |
| POST   | `/products`                | Create (Admin only) |
| PATCH  | `/products/:id`            | Update (Admin only) |
| DELETE | `/products/:id`            | Delete (Admin only) |
| Get    | `/products/search?q=query` | Search in products  |

### Categories

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/categories` | List all categories |
| POST   | `/categories` | Create (Admin only) |

### Users

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| GET    | `/users` | List users (Admin only) |

### Cart

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/cart`            | Get current user cart |
| POST   | `/cart/add`        | Add product to cart   |
| PATCH  | `/cart/update`     | Update quantity       |
| DELETE | `/cart/remove/:id` | Remove item from cart |
| DELETE | `/cart/clear`      | Clear all cart items  |

## 👮 Role-Based Access Control

- **User:** Can view all products and manage their own cart and orders
- **Admin:** Can manage products, categories, and all orders

## ✅ API Response Format (JSend)

Every response follows the [JSend specification](https://github.com/omniti-labs/jsend):

```json
{
  "status": "success",
  "data": { "product": { "name": "Phone" } }
}
```

## 📐 ER Diagram

The ERD diagram for the collections is included as a `.drawio` file inside the project folder:  
📁 `docs/ecommerce-erd.drawio`
