# DermaLog


DermaLog is a mobile application built with React Native and Expo designed to help users track and manage their eczema symptoms. It provides a simple and intuitive interface for logging daily skin conditions, visualizing progress, and identifying trends over time.

## Key Features

*   **User Authentication**: Secure sign-up and login functionality to protect user data.
*   **Symptom Logging**: Easily add new logs for various body parts, including Hands, Face, Arms, Legs, Torso, and Feet.
*   **Detailed Symptom Rating**: Rate the severity of Itchiness, Redness, and Dryness on a scale of 0 to 10.
*   **Log History**: View, update, and delete past logs, which are conveniently grouped by body part.
*   **Insightful Dashboard**: Get a quick overview of your current symptoms and access quick actions like adding a new log or viewing progress.
*   **Progress Visualization**: Track your symptom trends with interactive line charts that display data for the last 7 days.
*   **Account Management**: A dedicated profile screen to view account information and sign out.
*   **Offline Support Indication**: Displays a connection error message with a retry option when the app cannot communicate with the server.

## Tech Stack

*   **Framework**: React Native with Expo
*   **Navigation**: Expo Router
*   **State Management**: React Context API (`LogContext`)
*   **API Client**: Axios with interceptors for JWT authentication
*   **Data Visualization**: `react-native-chart-kit`
*   **Local Storage**: `@react-native-async-storage/async-storage`
*   **Styling**: React Native StyleSheet, Expo Linear Gradient
*   **Linting & Formatting**: ESLint, Prettier

## Project Structure

The repository is organized to maintain a clean and scalable codebase.

```
/
├── api/              # API service modules for backend communication
│   ├── authService.js    # Handles authentication (login, register)
│   └── logService.js     # Manages CRUD operations for logs
├── app/              # Application screens and routing (Expo Router)
│   ├── (auth)/         # Auth-related screens (Login, Register)
│   └── (tabs)/         # Main app screens with tab navigation
├── components/       # Reusable UI components
└── context/          # Global state management with React Context
```

## Getting Started

To run the project locally, follow these steps:

1.  **Prerequisites**:
    *   Node.js and npm
    *   Expo Go app installed on your iOS or Android device.

2.  **Clone the Repository**:
    ```bash
    git clone https://github.com/mujtaba1-1/DermaLog.git
    cd DermaLog
    ```

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

4.  **Run the Development Server**:
    ```bash
    npm run start
    ```

5.  **Launch the App**:
    *   Scan the QR code displayed in the terminal using the Expo Go app on your mobile device.

## API Services

The application communicates with a backend API (`https://derma-log-api.onrender.com`) for all data operations.

*   **`apiCreation.js`**: Initializes the Axios client. It includes interceptors to automatically attach the JWT token to requests and handle 403 Forbidden errors by logging the user out.
*   **`authService.js`**: Provides methods for user `login`, `register`, and `logout`.
*   **`logService.js`**: Contains functions to `createLog`, `getLogs`, `updateLog`, and `deleteLog` for managing symptom entries.
