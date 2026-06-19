# Trading Platform

A Full-Stack Trading Platform built using **Spring Boot**, **React.js**, and **MySQL** that enables users to register, manage portfolios, buy/sell stocks, track transactions, and monitor market activity through a modern web interface.

---

## Features

### User Management

* User Registration
* User Authentication
* Secure Login System
* User Profile Management

### Trading Operations

* Buy Stocks
* Sell Stocks
* Trade Validation
* Transaction Recording

### Portfolio Management

* Portfolio Tracking
* Holdings Overview
* Trade History
* Performance Monitoring

### Market Features

* Stock Information Retrieval
* Market Data Display
* Stock Search Functionality

### Security

* Spring Security Integration
* Protected API Endpoints
* Role-Based Access Configuration

---

## Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* REST APIs

### Database

* MySQL

### Build Tools

* Maven
* npm

---

## Project Structure

### Backend

```text
TradingPlatform
├── config
│   └── SecurityConfig.java
├── controller
│   ├── UserController.java
│   ├── TradingController.java
│   └── StockController.java
├── dto
├── exception
├── model
│   ├── User.java
│   └── Trade.java
├── repository
├── service
│   ├── UserService.java
│   ├── TradingService.java
│   └── StockService.java
└── TradingPlatformApplication.java
```

### Frontend

```text
src
├── components
├── pages
│   ├── Dashboard
│   ├── Portfolio
│   ├── Transactions
│   ├── Market
│   ├── Login
│   └── Register
├── services
│   └── api.js
└── styles
```

---

## REST APIs

### User APIs

* Register User
* Login User
* Fetch User Details

### Trading APIs

* Buy Stock
* Sell Stock
* View Trade History

### Portfolio APIs

* Portfolio Overview
* Holdings Summary

### Market APIs

* Stock Information
* Market Data Retrieval

---

## Installation

### Backend

```bash
cd TradingPlatform
mvn spring-boot:run
```

### Frontend

```bash
cd trading-frontend
npm install
npm start
```

---

## Learning Outcomes

* Full Stack Application Development
* Spring Security Implementation
* RESTful API Design
* React Component Architecture
* State Management
* Frontend-Backend Integration
* Database Design using JPA
* Exception Handling
* Secure Web Application Development

---

## Future Enhancements

* JWT Authentication
* Real-Time Stock Market Integration
* Watchlist Feature
* Price Alerts
* Trading Analytics Dashboard
* Docker Deployment
* Cloud Hosting

---

## Author

**Karthikeya Chukka**

GitHub: https://github.com/karthik7898
