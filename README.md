# 🔗 URL Shortener

Live Demo: [https://ky.vercel.app/](https://ky.vercel.app/)

I built this to learn MongoDB & JAMstack 🔥

## Features

- Secure links using passwords
- QR Code generation
- localStorage history for anon users
- user-agent based analytics using MongoDB's time series collection
- Link tags
- Click count


## Preview:

![ky-url-shortner-homepage-preview](https://raw.githubusercontent.com/arslanastral/freeCodeCamp-Projects/main/05_APIs-and-Microservices/03_URL-Shortener-Microservice/preview/homepage.png)
![ky-url-shortner-dashboard-preview](https://raw.githubusercontent.com/arslanastral/freeCodeCamp-Projects/main/05_APIs-and-Microservices/03_URL-Shortener-Microservice/preview/dashboard.png)
![ky-url-shortner-analytics-preview](https://raw.githubusercontent.com/arslanastral/freeCodeCamp-Projects/main/05_APIs-and-Microservices/03_URL-Shortener-Microservice/preview/analytics.png)
![ky-url-shortner-settings-preview](https://raw.githubusercontent.com/arslanastral/freeCodeCamp-Projects/main/05_APIs-and-Microservices/03_URL-Shortener-Microservice/preview/settings.png)


## Local Development:

### Database Setup:

This project uses MongoDB as the database. The easiest way to install it is using docker. Enter the following command on your terminal if you already have docker installed. This will install and run the latest version of mongodb.

$`docker run --name ky -dit -p 27017:27017 --rm mongo`

### Project Setup

- `git clone` this repo and `cd` into `05_APIs-and-Microservices/03_URL-Shortener-Microservice` directory and enter below commands
- `npm install`
- `npm run dev -- --open`

### Environment Variables:

- VITE_MONGODB_URI=mongodb://localhost:27017
- VITE_NODE_ENV=development

