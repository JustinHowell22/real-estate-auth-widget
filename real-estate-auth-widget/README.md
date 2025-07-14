# Real Estate Authentication Widget

This project provides a secure authentication widget for real estate applications, featuring two-factor authentication (2FA) via SMS verification. The widget is designed to protect premium content from unauthorized access.

## Project Structure

```
real-estate-auth-widget
├── Client
│   ├── client
│   │   ├── auth-widget.js
│   │   └── index.html
│   └── README.md
├── Server
│   ├── server.js
│   ├── routes
│   │   └── auth.js
│   └── README.md
├── package.json
├── .gitignore
└── README.md
```

## Setup Instructions

### Frontend Setup

1. Navigate to the `Client/client` directory.
2. Open `index.html` in your browser to view the authentication widget.
3. Ensure that you have an internet connection to load Tailwind CSS and any other external resources.

### Backend Setup

1. Navigate to the `Server` directory.
2. Install the necessary dependencies by running:
   ```
   npm install
   ```
3. Set up environment variables for Twilio and Slack in a `.env` file:
   ```
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   SLACK_WEBHOOK_URL=your_slack_webhook_url
   ```
4. Start the server by running:
   ```
   node server.js
   ```

## Deployment Instructions

1. Create a new GitHub repository named "real-estate-auth-widget".
2. Add the Client and Server directories with their respective files.
3. Commit the changes.
4. For the frontend, host the client directory using GitHub Pages or a CDN.
5. For the backend, deploy the server directory using Railway, setting the necessary environment variables for Twilio and Slack.
6. Embed the authentication widget in your website using the provided script tag.

## Usage

To use the authentication widget, include the following script tag in your HTML:
```html
<script src="path/to/auth-widget.js"></script>
```
Then, initialize the widget as needed.

This setup allows for a secure and modern authentication process with 2FA verification, notifications, and integration with CRM systems via Zapier.