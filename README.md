# 🚀 Express TypeScript WebSocket API

> A modern RESTful API built with Express.js, TypeScript, and WebSocket for real-time communication

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Karusa12/express-typescript-api)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-green.svg)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

## 🎯 About

This API provides a robust architecture for building modern web applications with:
- RESTful API for user management
- Real-time WebSocket communication
- Modular architecture with TypeScript
- Centralized error handling
- Docker containerization for easy deployment

## ✨ Features

- 🔥 **REST API** - Endpoints for user management
- 🌐 **WebSocket** - Real-time bidirectional communication
- 📝 **TypeScript** - Static typing for more robust code
- 🏗️ **Modular Architecture** - Separate Controllers, Services, Routes
- ⚡ **Custom Middleware** - Error handling and WebSocket management
- 🛡️ **Error Handling** - Centralized middleware for errors
- 🐳 **Docker Support** - Containerized deployment with multi-stage builds

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript 5.8.3
- **WebSocket**: ws 8.18.2
- **Build Tool**: TypeScript Compiler
- **Containerization**: Docker & Docker Compose

## 📦 Installation

### Prerequisites

- Node.js (v18.0 or higher) **OR** Docker & Docker Compose
- npm or yarn (if running without Docker)

### 🐳 Quick Start with Docker (Recommended)

1. Clone the repository
```bash
git clone https://github.com/Karusa12/express-typescript-api.git
cd express-typescript-api
```

2. Run with Docker Compose
```bash
# Build and start the application
docker-compose up --build

# Run in background
docker-compose up -d --build
```

3. The API will be available at `http://localhost:3000`

### 🔧 Manual Setup (Without Docker)

1. Clone the repository
```bash
git clone https://github.com/Karusa12/express-typescript-api.git
cd express-typescript-api
```

2. Install dependencies
```bash
npm install
```

3. Build the TypeScript project
```bash
npm run build
```

4. Start the application
```bash
npm start
```

## 🐳 Docker Commands

### Using Docker Compose (Recommended)
```bash
# Build and start
docker-compose up --build

# Start in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop the application
docker-compose down

# Rebuild without cache
docker-compose build --no-cache
```

### Using Docker directly
```bash
# Build the image
docker build -t express-typescript-api .

# Run the container
docker run -p 3000:3000 express-typescript-api

# Run in background
docker run -d -p 3000:3000 --name my-api express-typescript-api

# View logs
docker logs my-api

# Stop and remove
docker stop my-api && docker rm my-api
```

### Docker Health Check
The container includes a health check that monitors the API status:
- **Interval**: 30 seconds
- **Timeout**: 3 seconds
- **Retries**: 3 times
- **Start period**: 5 seconds

Check container health:
```bash
docker-compose ps
# or
docker ps
```

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
express-typescript-api/
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
├── Dockerfile                       # Docker configuration
├── docker-compose.yml               # Docker Compose configuration
├── .dockerignore                    # Docker ignore file
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Documentation
```

## 🔧 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `docker-compose up --build` - Build and run with Docker
- `docker-compose down` - Stop Docker containers

## 🏗️ Architecture

This project follows a clean architecture pattern:

- **Controllers** ([`userController.ts`](src/controllers/userController.ts)) - Handle HTTP requests and responses
- **Services** ([`userService.ts`](src/services/userService.ts)) - Business logic and data operations
- **Routes** ([`user.ts`](src/routes/user.ts), [`websocket.ts`](src/routes/websocket.ts)) - Route definitions
- **Middlewares** ([`errorHandler.ts`](src/middlewares/errorHandler.ts), [`websocketHandler.ts`](src/middlewares/websocketHandler.ts)) - Request processing

## 🐳 Docker Configuration

The project uses a **multi-stage Docker build** for optimization:

### Build Stage
- Installs all dependencies (including devDependencies)
- Compiles TypeScript to JavaScript
- Optimizes for build performance

### Production Stage
- Uses only production dependencies
- Copies compiled code from build stage
- Runs as non-root user for security
- Includes health checks for monitoring

### Security Features
- Non-root user execution
- Minimal Alpine Linux base image
- Production-only dependencies in final image
- Health check monitoring

## 🌐 WebSocket Features

The WebSocket implementation includes:
- Real-time message broadcasting
- Client connection management
- Automatic message relay between clients
- Connection status logging

## 🚀 Deployment

### Production Deployment with Docker

1. **Build optimized image**:
```bash
docker-compose -f docker-compose.yml up --build -d
```

2. **Monitor application**:
```bash
# Check logs
docker-compose logs -f

# Check health status
docker-compose ps
```

3. **Scale if needed**:
```bash
docker-compose up --scale api=3
```

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

- [x] Docker containerization
- [ ] JWT Authentication
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Rate limiting
- [ ] Data validation with Joi/Zod
- [ ] Environment configuration
- [ ] Logging system
- [ ] Health check endpoints
- [ ] Kubernetes deployment
- [ ] CI/CD pipeline

## 🐛 Known Issues

- WebSocket connections are not persisted across server restarts
- No authentication layer implemented yet
- Mock data is used instead of a real database

## 🔧 Troubleshooting

### Docker Issues

**Container won't start:**
```bash
# Check logs
docker-compose logs api

# Rebuild without cache
docker-compose build --no-cache
docker-compose up
```

**Port already in use:**
```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use different external port
```

**Permission issues:**
```bash
# Clean Docker system
docker system prune -f
```

## 📞 Support

If you have any questions or issues, feel free to open an issue on GitHub.

---

⭐ Don't forget to give this project a star if it helped you!