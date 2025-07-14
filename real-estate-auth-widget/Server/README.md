# Real Estate Authentication Widget - Server Setup

## Overview
This repository contains the backend for the Real Estate Authentication Widget. It is built using Node.js and Express, and it integrates with Twilio for SMS verification and Slack for notifications.

## Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Twilio account (for SMS verification)
- Slack account (for notifications)

## Setup Instructions

### 1. Clone the Repository
Clone the repository to your local machine using the following command:
```
git clone https://github.com/yourusername/real-estate-auth-widget.git
```

### 2. Navigate to the Server Directory
Change into the server directory:
```
cd real-estate-auth-widget/Server
```

### 3. Install Dependencies
Run the following command to install the required dependencies:
```
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the Server directory and add the following variables:
```
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

### 5. Start the Server
You can start the server using the following command:
```
node server.js
```
The server will run on `http://localhost:3000` by default.

## API Endpoints
- **POST /send-code**: Sends a verification code to the user's phone number.
- **POST /verify-code**: Verifies the code entered by the user.

## Deployment Instructions
1. Create a new GitHub repository named "real-estate-auth-widget".
2. Add the Client and Server directories with their respective files.
3. Commit the changes.
4. For the frontend, host the client directory using GitHub Pages or a CDN.
5. For the backend, deploy the server directory using Railway, setting the necessary environment variables for Twilio and Slack.
6. Embed the authentication widget in your website using the provided script tag.

## Conclusion
This setup allows for a secure and modern authentication process with 2FA verification, notifications, and integration with CRM systems via Zapier. For any issues or contributions, please feel free to open an issue or pull request in the repository.