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
3. Ensure that the `auth-widget.js` file is correctly linked in the HTML file.

### Backend Setup

1. Navigate to the `Server` directory.
2. Install the necessary dependencies by running:
   ```
   npm install
   ```
3. Set up environment variables for Twilio and Slack in a `.env` file (not included in this repository for security reasons).
4. Start the server by running:
   ```
   node server.js
   ```

### Deployment Instructions

1. Create a new GitHub repository named "real-estate-auth-widget".
2. Add the `Client` and `Server` directories with their respective files.
3. Commit the changes.
4. For the frontend, host the `Client/client` directory using GitHub Pages or a CDN.
5. For the backend, deploy the `Server` directory using Railway, setting the necessary environment variables for Twilio and Slack.
6. Embed the authentication widget in your website using the provided script tag from `auth-widget.js`.

## Features

- Two-factor authentication via SMS.
- Integration with Twilio for sending verification codes.
- Notifications via Slack for verification events.
- Easy integration with CRM systems through Zapier.

This setup allows for a secure and modern authentication process, ensuring that only authorized users can access premium content.