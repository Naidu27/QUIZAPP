# QuizNest – Online Quiz Application

## Project Overview

QuizNest is a web-based quiz application that allows users to register, log in, and participate in quizzes.

The application is hosted on Microsoft Azure using a cloud-based architecture.

## Features

* User registration and login
* User authentication using JWT
* Online quizzes
* Quiz questions and answers
* Backend REST APIs
* SQL database integration
* Cloud hosting on Microsoft Azure
* Application monitoring and logging

## Technology Stack

### Frontend

* React.js
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication

### Database

* Azure SQL Database

### Cloud

* Microsoft Azure

## Azure Services Used

* Azure Static Web Apps – Frontend hosting
* Azure App Service – Backend hosting
* Azure SQL Database – Application data
* Azure Application Insights – Application monitoring
* App Service Logs – Troubleshooting and application logs

## Architecture

```text
User
  |
  v
Azure Static Web Apps
(React Frontend)
  |
  | API Requests
  v
Azure App Service
(Node.js + Express)
  |
  | SQL Queries
  v
Azure SQL Database

Application Monitoring
        |
        +--> Application Insights
        |
        +--> App Service Logs
```

## Security

* Database credentials are stored using environment variables.
* JWT secret is stored using environment variables.
* Sensitive `.env` files are excluded from Git using `.gitignore`.
* Secrets are not stored directly in the source code.

## Deployment

The application was deployed to Microsoft Azure.

The frontend is hosted using Azure Static Web Apps, while the Node.js backend runs on Azure App Service. The backend communicates with Azure SQL Database to store and retrieve application data.

Application Insights was configured to monitor application requests, failures, and performance.

## Monitoring

Azure Application Insights is used to monitor:

* Application requests
* Failed requests
* Application performance
* API activity

App Service Logs are enabled to help troubleshoot backend application issues.

## Local Development

### Backend

```bash
cd server
npm install
npm start
```

### Frontend

```bash
cd client
npm install
npm start
```

Configure the required environment variables before running the application locally.

## Learning Outcomes

Through this project, I gained practical experience with:

* Azure App Service
* Azure Static Web Apps
* Azure SQL Database
* Application Insights
* App Service monitoring and logging
* Environment variables and application security
* Cloud application hosting
* Connecting a web application with Azure services
