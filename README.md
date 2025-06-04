# 🚀 Express TypeScript WebSocket API

> A modern RESTful API built with Express.js, TypeScript, and WebSocket for real-time communication

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Karusa12/express-typescript-api)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-green.svg)](https://expressjs.com/)

## 🎯 About

This API provides a robust architecture for building modern web applications with:
- RESTful API for user management
- Real-time WebSocket communication
- Modular architecture with TypeScript
- Centralized error handling

## ✨ Features

- 🔥 **REST API** - Endpoints for user management
- 🌐 **WebSocket** - Real-time bidirectional communication
- 📝 **TypeScript** - Static typing for more robust code
- 🏗️ **Modular Architecture** - Separate Controllers, Services, Routes
- ⚡ **Custom Middleware** - Error handling and WebSocket management
- 🛡️ **Error Handling** - Centralized middleware for errors

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript 5.8.3
- **WebSocket**: ws 8.18.2
- **Build Tool**: TypeScript Compiler

## 📦 Installation

### Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/Karusa12/express-typescript-api.git
```

2. Navigate to the project directory
```bash
cd express-typescript-api
```

3. Install dependencies
```bash
npm install
```

4. Build the TypeScript project
```bash
npm run build
```

5. Start the application
```bash
npm start
```

The API will be available at `http://localhost:3000`

## 🚀 Usage

### API Endpoints

#### Users
- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID

#### WebSocket
- `GET /websocket` - WebSocket entry point

### Usage Examples

#### Get all users
```bash
curl http://localhost:3000/user
```

Response:
```json
[
  { "id": "1", "name": "Alice", "email": "alice@example.com" },
  { "id": "2", "name": "Bob", "email": "bob@example.com" },
  { "id": "3", "name": "Charlie", "email": "" }
]
```

#### Get specific user
```bash
curl http://localhost:3000/user/1
```

Response:
```json
{ "id": "1", "name": "Alice", "email": "alice@example.com" }
```

#### WebSocket Connection
```javascript
const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
  console.log('Connected to WebSocket');
  ws.send('Hello Server!');
});

ws.on('message', (data) => {
  console.log('Message received:', data.toString());
});
```

## 📁 Project Structure

```
express/
├── src/
│   ├── server.ts                    # Main entry point
│   ├── controllers/
│   │   └── userController.ts        # User controllers
│   ├── middlewares/
│   │   ├── errorHandler.ts          # Error handling
│   │   └── websocketHandler.ts      # WebSocket handler
│   ├── routes/
│   │   ├── user.ts                  # User routes
│   │   └── websocket.ts             # WebSocket routes
│   └── services/
│       └── userService.ts           # User services
├── dist/                            # Compiled files
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Documentation
```

## 🔧 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application

## 🏗️ Architecture

This project follows a clean architecture pattern:

- **Controllers** ([`userController.ts`](src/controllers/userController.ts)) - Handle HTTP requests and responses
- **Services** ([`userService.ts`](src/services/userService.ts)) - Business logic and data operations
- **Routes** ([`user.ts`](src/routes/user.ts), [`websocket.ts`](src/routes/websocket.ts)) - Route definitions
- **Middlewares** ([`errorHandler.ts`](src/middlewares/errorHandler.ts), [`websocketHandler.ts`](src/middlewares/websocketHandler.ts)) - Request processing

## 🌐 WebSocket Features

The WebSocket implementation includes:
- Real-time message broadcasting
- Client connection management
- Automatic message relay between clients
- Connection status logging

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Author

- **Karusa** - *Lead Developer* - [GitHub Profile](https://github.com/Karusa12)

## 🔮 Future Enhancements

- [ ] JWT Authentication
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] Rate limiting
- [ ] Data validation with Joi/Zod
- [ ] Environment configuration
- [ ] Logging system
- [ ] Health check endpoints

## 🐛 Known Issues

- WebSocket connections are not persisted across server restarts
- No authentication layer implemented yet
- Mock data is used instead of a real database

## 📞 Support

If you have any questions or issues, feel free to open an issue on GitHub.

---

⭐ Don't forget to give this project a star if it helped you!