# 🚀 Express TypeScript WebSocket API

> A modern RESTful API built with Express.js, TypeScript, and WebSocket for real-time communication

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Karusa12/express-typescript-api)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-green.svg)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Rate Limiting](https://img.shields.io/badge/Rate_Limiting-Enabled-orange.svg)](https://www.npmjs.com/package/express-rate-limit)

## 🎯 About

This API provides a robust architecture for building modern web applications with:
- RESTful API for user management
- Real-time WebSocket communication
- Advanced rate limiting for API protection
- Modular architecture with TypeScript
- Centralized error handling
- Docker containerization for easy deployment

## ✨ Features

- 🔥 **REST API** - Endpoints for user management
- 🌐 **WebSocket** - Real-time bidirectional communication
- 🛡️ **Rate Limiting** - Advanced protection against abuse and DDoS
- 📝 **TypeScript** - Static typing for more robust code
- 🏗️ **Modular Architecture** - Separate Controllers, Services, Routes
- ⚡ **Custom Middleware** - Error handling, rate limiting, and WebSocket management
- 🛡️ **Error Handling** - Centralized middleware for errors
- 🐳 **Docker Support** - Containerized deployment with multi-stage builds
- 🔒 **Security** - Non-root user execution and minimal attack surface

## 🛠️ Tech Stack

- **Runtime**: Node.js 18
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript 5.8.3
- **WebSocket**: ws 8.18.2
- **Rate Limiting**: express-rate-limit 7.5.0
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

#### Main
- `GET /` - API status endpoint

#### Users (Rate Limited: 50 requests/15min)
- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID

#### WebSocket (Rate Limited: 10 connections/min)
- `GET /websocket` - WebSocket entry point for HTTP
- WebSocket connection available at `ws://localhost:3000`

### 🛡️ Rate Limiting

The API implements multiple levels of rate limiting:

| Endpoint | Window | Max Requests | Description |
|----------|---------|--------------|-------------|
| **General** | 15 min | 100 | All endpoints (currently disabled) |
| **Users** | 15 min | 50 | User-related operations |
| **WebSocket** | 1 min | 10 | WebSocket connections |
| **Create** | 1 min | 5 | Resource creation operations |

When rate limit is exceeded, you'll receive:
```json
{
  "error": "Rate limit exceeded",
  "message": "You have exceeded the rate limit for this endpoint.",
  "retryAfter": 900
}
```

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

#### Test Rate Limiting
```bash
# Test user endpoint rate limiting (will hit limit after 50 requests)
for i in {1..55}; do curl http://localhost:3000/user && echo " Request $i"; done
```

#### WebSocket Connection (Browser)
```javascript
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Connected to WebSocket');
  ws.send('Hello Server!');
};

ws.onmessage = (event) => {
  console.log('Message received:', event.data);
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};
```

#### WebSocket Connection (Node.js)
```javascript
const WebSocket = require('ws');
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
│   ├── server.ts                    # Main entry point & server setup
│   ├── controllers/
│   │   └── userController.ts        # User request handlers
│   ├── middlewares/
│   │   ├── errorHandler.ts          # Centralized error handling
│   │   ├── rateLimiter.ts           # Rate limiting configurations
│   │   └── websocketHandler.ts      # WebSocket connection handler
│   ├── routes/
│   │   ├── user.ts                  # User API routes
│   │   └── websocket.ts             # WebSocket routes
│   └── services/
│       └── userService.ts           # Business logic & data operations
├── dist/                            # Compiled JavaScript files
├── node_modules/                    # Dependencies
├── Dockerfile                       # Multi-stage Docker configuration
├── docker-compose.yml               # Docker Compose orchestration
├── .dockerignore                    # Docker build exclusions
├── .gitignore                       # Git exclusions
├── package.json                     # Project dependencies & scripts
├── tsconfig.json                    # TypeScript configuration
├── LICENSE                          # MIT License
└── README.md                        # Project documentation
```

## 🔧 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `docker-compose up --build` - Build and run with Docker
- `docker-compose down` - Stop Docker containers

## 🏗️ Architecture

This project follows a clean architecture pattern with clear separation of concerns:

### Controllers ([`userController.ts`](src/controllers/userController.ts))
- Handle HTTP requests and responses
- Input validation and response formatting
- Error handling delegation

### Services ([`userService.ts`](src/services/userService.ts))
- Business logic implementation
- Data operations and transformations
- Mock data management (temporary)

### Routes ([`user.ts`](src/routes/user.ts), [`websocket.ts`](src/routes/websocket.ts))
- API endpoint definitions
- Route-specific middleware application
- Request routing to controllers

### Middlewares
- **[`errorHandler.ts`](src/middlewares/errorHandler.ts)** - Centralized error processing
- **[`rateLimiter.ts`](src/middlewares/rateLimiter.ts)** - Rate limiting configurations
- **[`websocketHandler.ts`](src/middlewares/websocketHandler.ts)** - WebSocket connection management

## 🐳 Docker Configuration

The project uses a **multi-stage Docker build** for optimization:

### Build Stage
- Uses Node.js 18 Alpine Linux
- Installs all dependencies (including devDependencies)
- Compiles TypeScript to JavaScript
- Optimized for build performance

### Production Stage
- Minimal Node.js 18 Alpine Linux base
- Only production dependencies
- Copies compiled code from build stage
- Non-root user execution for security
- Health check monitoring

### Security Features
- 🔒 Non-root user execution (nodejs:1001)
- 🏔️ Minimal Alpine Linux base image
- 📦 Production-only dependencies in final image
- 🏥 Built-in health check monitoring
- 🚫 Comprehensive .dockerignore exclusions

## 🌐 WebSocket Features

The WebSocket implementation provides:
- **Real-time messaging** - Instant bidirectional communication
- **Message broadcasting** - Messages relay between connected clients
- **Connection management** - Automatic client tracking and cleanup
- **Rate limiting** - Protection against connection abuse
- **Connection logging** - Connect/disconnect event tracking

## 🛡️ Rate Limiting Details

### Configuration Types

**General Limiter** (Currently disabled in [`server.ts`](src/server.ts))
```typescript
windowMs: 15 * 60 * 1000,  // 15 minutes
max: 100                   // 100 requests per IP
```

**Strict Limiter** (Applied to user routes)
```typescript
windowMs: 15 * 60 * 1000,  // 15 minutes
max: 50                    // 50 requests per IP
```

**WebSocket Limiter**
```typescript
windowMs: 60 * 1000,       // 1 minute
max: 10                    // 10 connections per IP
```

**Create Limiter** (For future use)
```typescript
windowMs: 60 * 1000,       // 1 minute
max: 5                     // 5 requests per IP
```

### Rate Limit Headers
When rate limiting is active, responses include:
```
RateLimit-Limit: 50
RateLimit-Remaining: 49
RateLimit-Reset: 2025-06-05T15:30:00.000Z
```

## 🚀 Deployment

### Production Deployment with Docker

1. **Build and deploy**:
```bash
docker-compose up --build -d
```

2. **Monitor application**:
```bash
# Check logs
docker-compose logs -f api

# Check health status
docker-compose ps

# Monitor resource usage
docker stats
```

3. **Scale horizontally** (if needed):
```bash
docker-compose up --scale api=3 -d
```

### Environment Variables

The application supports the following environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |

## 🧪 Testing

### Manual API Testing
```bash
# Test main endpoint
curl http://localhost:3000/

# Test user endpoints
curl http://localhost:3000/user
curl http://localhost:3000/user/1

# Test rate limiting
for i in {1..55}; do curl -s http://localhost:3000/user && echo " Request $i"; done
```

### WebSocket Testing
```bash
# Using wscat (install with: npm install -g wscat)
wscat -c ws://localhost:3000
```

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork** the project
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain the existing code structure
- Add appropriate error handling
- Update documentation as needed
- Test your changes locally with Docker

## 📝 License

This project is licensed under the MIT License. See the [`LICENSE`](LICENSE) file for details.

## 👥 Author

- **Karusa** - *Lead Developer* - [GitHub Profile](https://github.com/Karusa12)

## 🔮 Future Enhancements

- [x] ✅ Docker containerization
- [x] ✅ Rate limiting implementation
- [ ] 🔐 JWT Authentication
- [ ] 🗄️ Database integration (MongoDB/PostgreSQL)
- [ ] 🧪 Unit and integration tests
- [ ] 📚 API documentation with Swagger
- [ ] ✅ Data validation with Joi/Zod
- [ ] 🌍 Environment configuration management
- [ ] 📝 Advanced logging system (Winston)
- [ ] 🏥 Health check endpoints
- [ ] ☸️ Kubernetes deployment manifests
- [ ] 🔄 CI/CD pipeline (GitHub Actions)
- [ ] 📊 Monitoring and metrics (Prometheus)
- [ ] 🔍 Request tracing and debugging

## 🐛 Known Issues

- ⚠️ WebSocket connections are not persisted across server restarts
- ⚠️ No authentication layer implemented yet
- ⚠️ Using mock data instead of a real database
- ⚠️ General rate limiter is currently disabled (line 12 in [`server.ts`](src/server.ts))
- ⚠️ No input validation on API endpoints

## 🔧 Troubleshooting

### Common Issues

**Docker container won't start:**
```bash
# Check logs for errors
docker-compose logs api

# Rebuild without cache
docker-compose build --no-cache
docker-compose up
```

**Port 3000 already in use:**
```bash
# Option 1: Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use different external port

# Option 2: Kill process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**Rate limiting too restrictive:**
- Modify limits in [`src/middlewares/rateLimiter.ts`](src/middlewares/rateLimiter.ts)
- Rebuild and restart the application

**WebSocket connection issues:**
- Ensure no firewall blocking WebSocket connections
- Check browser console for connection errors
- Verify WebSocket URL format: `ws://localhost:3000`

**Docker build fails:**
```bash
# Clean Docker system
docker system prune -f
docker builder prune -f

# Clear npm cache
docker-compose exec api npm cache clean --force
```

### Performance Optimization

For production environments:
1. Enable the general rate limiter in [`server.ts`](src/server.ts)
2. Adjust rate limits based on your traffic patterns
3. Consider implementing Redis for shared rate limiting in clustered deployments
4. Add request logging for monitoring
5. Implement proper database instead of mock data

## 📞 Support

If you have any questions or issues:

1. 📋 Check the [Known Issues](#-known-issues) section
2. 🔧 Try the [Troubleshooting](#-troubleshooting) steps
3. 🐛 Open an issue on [GitHub Issues](https://github.com/Karusa12/express-typescript-api/issues)
4. 💬 Start a discussion on [GitHub Discussions](https://github.com/Karusa12/express-typescript-api/discussions)
# 🚀 Express TypeScript WebSocket API

> A modern RESTful API built with Express.js, TypeScript, and WebSocket for real-time communication

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Karusa12/express-typescript-api)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-green.svg)](https://expressjs.com/)
[![WebSocket](https://img.shields.io/badge/WebSocket-8.18.2-lightgreen.svg)](https://www.npmjs.com/package/ws)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Rate Limiting](https://img.shields.io/badge/Rate_Limiting-7.5.0-orange.svg)](https://www.npmjs.com/package/express-rate-limit)

## 📋 Table of Contents

- [🎯 About](#-about)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🐳 Docker Setup](#-docker-setup)
- [🚀 Usage](#-usage)
- [🛡️ Rate Limiting](#️-rate-limiting)
- [📁 Project Structure](#-project-structure)
- [🏗️ Architecture](#️-architecture)
- [🌐 WebSocket Features](#-websocket-features)
- [🚀 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [📝 License](#-license)
- [🤝 Contributing](#-contributing)
- [🔧 Troubleshooting](#-troubleshooting)

## 🎯 About

This Express TypeScript WebSocket API provides a robust, production-ready architecture for building modern web applications. It combines the power of TypeScript's static typing with Express.js's flexibility, enhanced with real-time WebSocket communication and comprehensive rate limiting protection.

**Key Benefits:**
- 🔒 **Production-ready** security with rate limiting and non-root Docker execution
- 📊 **Scalable architecture** with clean separation of concerns
- 🐳 **Container-first** deployment with Docker and Docker Compose
- 🌐 **Real-time** bidirectional communication via WebSockets
- 📝 **Type-safe** development with full TypeScript support
- 🛡️ **Protected** endpoints with multiple levels of rate limiting

## ✨ Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🔥 **REST API** | Complete user management endpoints | ✅ Active |
| 🌐 **WebSocket** | Real-time bidirectional communication | ✅ Active |
| 🛡️ **Rate Limiting** | Multi-tier protection against abuse | ✅ Active |
| 📝 **TypeScript** | Full static typing and IntelliSense | ✅ Active |
| 🏗️ **Clean Architecture** | Controllers, Services, Routes separation | ✅ Active |
| ⚡ **Custom Middleware** | Error handling and connection management | ✅ Active |
| 🐳 **Docker Support** | Multi-stage builds with security | ✅ Active |
| 🔒 **Security** | Non-root execution and minimal surface | ✅ Active |

## 🛠️ Tech Stack

### Core Technologies
- **Runtime**: Node.js 18 Alpine
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript 5.8.3
- **WebSocket**: ws 8.18.2
- **Rate Limiting**: express-rate-limit 7.5.0

### Development & Deployment
- **Build Tool**: TypeScript Compiler (tsc)
- **Package Manager**: npm
- **Containerization**: Docker & Docker Compose
- **Base Image**: node:18-alpine

### Type Definitions
- **Express Types**: @types/express 5.0.1
- **WebSocket Types**: @types/ws 8.18.1
- **Node Types**: Built-in TypeScript configuration

## 📦 Installation

### Prerequisites

Choose one of the following setups:

| Option | Requirements |
|--------|--------------|
| **🐳 Docker** | Docker Engine + Docker Compose |
| **💻 Local** | Node.js 18+ + npm |

### 🐳 Quick Start with Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/Karusa12/express-typescript-api.git
cd express-typescript-api

# 2. Build and start with Docker Compose
docker-compose up --build

# 3. Access the API
curl http://localhost:3000
```

### 💻 Local Development Setup

```bash
# 1. Clone and install
git clone https://github.com/Karusa12/express-typescript-api.git
cd express-typescript-api
npm install

# 2. Build TypeScript
npm run build

# 3. Start the application
npm start
```

## 🐳 Docker Setup

### Docker Compose Commands

```bash
# Development workflow
docker-compose up --build          # Build and start
docker-compose up -d --build       # Background mode
docker-compose logs -f             # Follow logs
docker-compose down                # Stop services

# Production deployment
docker-compose up --build -d       # Deploy in background
docker-compose ps                  # Check status
docker stats                       # Monitor resources
```

### Direct Docker Commands

```bash
# Build custom image
docker build -t express-typescript-api .

# Run container
docker run -p 3000:3000 express-typescript-api

# Background mode with name
docker run -d -p 3000:3000 --name my-api express-typescript-api

# Management
docker logs my-api                 # View logs
docker stop my-api && docker rm my-api  # Clean up
```

### Health Monitoring

The container includes comprehensive health checking:

| Setting | Value | Purpose |
|---------|-------|---------|
| **Interval** | 30 seconds | Regular health checks |
| **Timeout** | 3 seconds | Response timeout |
| **Retries** | 3 times | Failure tolerance |
| **Start Period** | 5 seconds | Initial grace period |

```bash
# Check container health
docker-compose ps
docker inspect $(docker-compose ps -q api) | grep Health -A 10
```

## 🚀 Usage

### API Endpoints

#### 🏠 Main Endpoint
```http
GET /
```
**Purpose**: API status and health check  
**Rate Limit**: None  
**Response**: Plain text confirmation

#### 👥 User Management (Rate Limited: 50 requests/15min)
```http
GET /user           # Retrieve all users
GET /user/:id       # Retrieve specific user
```

#### 🔌 WebSocket (Rate Limited: 10 connections/min)
```http
GET /websocket      # WebSocket HTTP endpoint
ws://localhost:3000 # WebSocket connection
```

### 🛡️ Rate Limiting Configuration

The API implements a **four-tier rate limiting strategy**:

| Limiter | Window | Max Requests | Applied To | Status |
|---------|--------|--------------|------------|--------|
| **General** | 15 min | 100 | All endpoints | 🟡 Disabled |
| **Strict** | 15 min | 50 | User operations | 🟢 Active |
| **WebSocket** | 1 min | 10 | WS connections | 🟢 Active |
| **Create** | 1 min | 5 | Future endpoints | 🟡 Reserved |

#### Rate Limit Response Format
```json
{
  "error": "Rate limit exceeded",
  "message": "You have exceeded the rate limit for this endpoint.",
  "retryAfter": 900
}
```

#### Rate Limit Headers
```http
RateLimit-Limit: 50
RateLimit-Remaining: 49
RateLimit-Reset: 2025-06-05T15:30:00.000Z
Retry-After: 900
```

### 📝 Usage Examples

#### REST API Examples

**Get all users:**
```bash
curl http://localhost:3000/user
```

**Expected Response:**
```json
[
  { "id": "1", "name": "Alice", "email": "alice@example.com" },
  { "id": "2", "name": "Bob", "email": "bob@example.com" },
  { "id": "3", "name": "Charlie", "email": "" }
]
```

**Get specific user:**
```bash
curl http://localhost:3000/user/1
```

**Expected Response:**
```json
{ "id": "1", "name": "Alice", "email": "alice@example.com" }
```

**Test rate limiting:**
```bash
# This will trigger rate limiting after 50 requests
for i in {1..55}; do 
  curl -s http://localhost:3000/user && echo " Request $i"
done
```

#### WebSocket Examples

**Browser Implementation:**
```javascript
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('🔗 Connected to WebSocket');
  ws.send('Hello from browser!');
};

ws.onmessage = (event) => {
  console.log('📨 Message received:', event.data);
};

ws.onclose = () => {
  console.log('🔌 WebSocket connection closed');
};

ws.onerror = (error) => {
  console.error('❌ WebSocket error:', error);
};
```

**Node.js Implementation:**
```javascript
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
  console.log('🔗 Connected to WebSocket server');
  ws.send('Hello from Node.js client!');
});

ws.on('message', (data) => {
  console.log('📨 Server message:', data.toString());
});

ws.on('close', () => {
  console.log('🔌 Connection closed');
});
```

## 📁 Project Structure

```
express-typescript-api/
├── 📂 src/                          # Source code
│   ├── 🚀 server.ts                 # Main application entry point
│   ├── 📂 controllers/
│   │   └── 👥 userController.ts     # HTTP request handlers
│   ├── 📂 middlewares/
│   │   ├── ❌ errorHandler.ts       # Centralized error processing
│   │   ├── 🛡️ rateLimiter.ts       # Rate limiting configurations
│   │   └── 🔌 websocketHandler.ts   # WebSocket connection management
│   ├── 📂 routes/
│   │   ├── 👤 user.ts              # User API route definitions
│   │   └── 🌐 websocket.ts         # WebSocket route setup
│   └── 📂 services/
│       └── 💼 userService.ts        # Business logic & data operations
├── 📂 dist/                         # Compiled JavaScript (auto-generated)
├── 📂 node_modules/                 # Dependencies (auto-generated)
├── 🐳 Dockerfile                    # Multi-stage container build
├── 🐙 docker-compose.yml            # Container orchestration
├── 🚫 .dockerignore                 # Docker build exclusions
├── 🚫 .gitignore                    # Git exclusions
├── 📦 package.json                  # Project configuration & dependencies
├── ⚙️ tsconfig.json                 # TypeScript compiler configuration
├── 📄 LICENSE                       # MIT License text
└── 📖 README.md                     # Project documentation
```

## 🏗️ Architecture

The project follows **Clean Architecture principles** with clear separation of concerns:

### 🎮 Controllers Layer
**File**: [`src/controllers/userController.ts`](src/controllers/userController.ts)
- **Responsibility**: Handle HTTP requests and responses
- **Functions**: `getAllUsers()`, `getUserById()`
- **Features**: Input validation, response formatting, error delegation

### 💼 Services Layer  
**File**: [`src/services/userService.ts`](src/services/userService.ts)
- **Responsibility**: Business logic implementation
- **Functions**: `findAll()`, `findById()`
- **Features**: Data operations, transformations, mock data management

### 🛣️ Routes Layer
**Files**: [`src/routes/user.ts`](src/routes/user.ts), [`src/routes/websocket.ts`](src/routes/websocket.ts)
- **Responsibility**: API endpoint definitions and middleware application
- **Features**: Route configuration, middleware binding, request routing

### ⚡ Middleware Layer
- **[`errorHandler.ts`](src/middlewares/errorHandler.ts)**: Centralized error processing with logging
- **[`rateLimiter.ts`](src/middlewares/rateLimiter.ts)**: Four-tier rate limiting system
- **[`websocketHandler.ts`](src/middlewares/websocketHandler.ts)**: WebSocket lifecycle management

### 🔄 Data Flow
```
Request → Routes → Middleware → Controllers → Services → Response
                ↓
        Rate Limiting & Error Handling
```

## 🐳 Docker Configuration

### Multi-Stage Build Strategy

#### 🔨 Build Stage (`builder`)
```dockerfile
FROM node:18-alpine AS builder
- Install ALL dependencies (including devDependencies)
- Copy source code
- Compile TypeScript to JavaScript
- Optimize for build performance
```

#### 🚀 Production Stage (`production`)
```dockerfile
FROM node:18-alpine AS production
- Install ONLY production dependencies
- Copy compiled code from builder
- Create non-root user (nodejs:1001)
- Configure health checks
- Minimal attack surface
```

### 🔒 Security Features

| Feature | Implementation | Benefit |
|---------|----------------|---------|
| **Non-root User** | `nodejs:1001` | Prevents privilege escalation |
| **Alpine Base** | Minimal Linux | Reduced attack surface |
| **Production Deps** | `--only=production` | Smaller image size |
| **Health Checks** | HTTP endpoint monitoring | Auto-recovery capability |
| **Resource Limits** | Docker constraints | Prevents resource exhaustion |

### 📊 Image Optimization

- **Build Stage**: ~450MB (with dev dependencies)
- **Production Stage**: ~150MB (production only)
- **Compression**: Multi-layer caching
- **Security**: Distroless-style approach

## 🌐 WebSocket Features

### Core Capabilities

| Feature | Description | Implementation |
|---------|-------------|----------------|
| **Real-time Messaging** | Instant bidirectional communication | Native WebSocket API |
| **Message Broadcasting** | Relay messages between clients | Client loop with filtering |
| **Connection Management** | Auto tracking and cleanup | Event-driven lifecycle |
| **Rate Limiting** | Connection abuse protection | Express-rate-limit integration |
| **Connection Logging** | Connect/disconnect tracking | Console logging with timestamps |

### WebSocket Lifecycle

```typescript
// Connection established
ws.on('connection') → console.log('Client is connected')

// Message handling
ws.on('message') → broadcast to other clients

// Clean disconnection  
ws.on('close') → console.log('Client disconnected')
```

### Message Broadcasting Logic

```typescript
// Current implementation
this.wss.clients.forEach((client) => {
  if (client !== ws && client.readyState === WebSocket.OPEN) {
    client.send(`Message from client: ${message}`);
  }
});
```

## 🚀 Deployment

### 🐳 Production Deployment

#### Quick Deploy
```bash
# Single command deployment
docker-compose up --build -d

# Verify deployment
curl http://localhost:3000
docker-compose ps
```

#### Monitoring & Management
```bash
# Real-time monitoring
docker-compose logs -f api           # Application logs
docker stats                         # Resource usage
docker-compose ps                    # Service status

# Health checks
curl http://localhost:3000           # Basic health
docker inspect <container_id> | grep Health  # Docker health
```

#### Scaling (Horizontal)
```bash
# Scale to multiple instances
docker-compose up --scale api=3 -d

# Load balancing (requires additional configuration)
# Consider nginx reverse proxy for production
```

### 🌍 Environment Configuration

| Variable | Default | Description | Required |
|----------|---------|-------------|----------|
| `PORT` | `3000` | Server listening port | No |
| `NODE_ENV` | `development` | Runtime environment | No |

**Example with custom port:**
```bash
# docker-compose.yml
environment:
  - PORT=8080
  - NODE_ENV=production

# Update port mapping
ports:
  - "8080:8080"
```

### 🔄 Production Checklist

- [x] ✅ Enable general rate limiter in [`server.ts`](src/server.ts)
- [x] ✅ Configure environment variables
- [x] ✅ Set up health monitoring
- [ ] 🔲 Implement proper logging (Winston)
- [ ] 🔲 Add database integration
- [ ] 🔲 Configure reverse proxy (nginx)
- [ ] 🔲 Set up SSL/TLS certificates
- [ ] 🔲 Implement backup strategy

## 🧪 Testing

### Manual API Testing

```bash
# Health check
curl -v http://localhost:3000/

# User endpoints
curl -v http://localhost:3000/user
curl -v http://localhost:3000/user/1
curl -v http://localhost:3000/user/999  # Test 404

# Rate limiting test
time for i in {1..55}; do 
  curl -s -o /dev/null -w "%{http_code} " http://localhost:3000/user
done && echo
```

### WebSocket Testing

#### Using wscat (Install: `npm install -g wscat`)
```bash
# Connect to WebSocket
wscat -c ws://localhost:3000

# Test with multiple clients
wscat -c ws://localhost:3000 &
wscat -c ws://localhost:3000 &
wscat -c ws://localhost:3000
```

#### Performance Testing
```bash
# Load testing with Apache Bench
ab -n 1000 -c 10 http://localhost:3000/user

# WebSocket connection testing
for i in {1..15}; do 
  wscat -c ws://localhost:3000 --close &
done
```

### Health Check Validation

```bash
# Docker health status
docker-compose ps
docker inspect $(docker-compose ps -q api) --format='{{.State.Health.Status}}'

# Custom health endpoint (future enhancement)
curl http://localhost:3000/health
```

## 📝 License

This project is licensed under the **MIT License** - see the [`LICENSE`](LICENSE) file for details.

### MIT License Summary

```
Copyright (c) 2025 Karusa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

**What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed  
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No warranty provided
- ❌ No liability accepted

## 🤝 Contributing

Contributions are welcome! Follow these guidelines for the best experience:

### 🔄 Development Workflow

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Develop** with TypeScript best practices
5. **Test** locally with Docker
6. **Commit** with clear messages: `git commit -m 'Add amazing feature'`
7. **Push** to your fork: `git push origin feature/amazing-feature`  
8. **Create** a Pull Request

### 📋 Development Guidelines

| Area | Requirement | Example |
|------|-------------|---------|
| **Code Style** | TypeScript best practices | Use interfaces, avoid `any` |
| **Architecture** | Follow existing patterns | Controllers → Services → Data |
| **Error Handling** | Use middleware pattern | Delegate to `errorHandler` |
| **Documentation** | Update README & comments | JSDoc for functions |
| **Testing** | Local Docker validation | `docker-compose up --build` |

### 🔍 Code Review Criteria

- ✅ TypeScript compilation without errors
- ✅ Docker build successful  
- ✅ Follows existing architecture patterns
- ✅ Proper error handling
- ✅ Rate limiting considerations
- ✅ Documentation updates

## 👥 Author & Credits

### 👨‍💻 Lead Developer
**Karusa** - *Full Stack Developer & Project Maintainer*
- 🔗 GitHub: [Karusa12](https://github.com/Karusa12)
- 📧 Issues: [GitHub Issues](https://github.com/Karusa12/express-typescript-api/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Karusa12/express-typescript-api/discussions)

### 🙏 Acknowledgments

| Technology | Contribution |
|------------|--------------|
| **Express.js Team** | Robust web framework foundation |
| **TypeScript Team** | Excellent static typing system |
| **Docker Inc.** | Containerization platform |
| **Node.js Foundation** | JavaScript runtime environment |
| **ws Library** | Efficient WebSocket implementation |
| **Open Source Community** | Inspiration and best practices |

## 🔮 Future Enhancements

### ✅ Completed Features
- [x] 🐳 Docker containerization with multi-stage builds
- [x] 🛡️ Rate limiting implementation (4-tier system)
- [x] 📝 Complete TypeScript implementation
- [x] 🌐 WebSocket real-time communication
- [x] 🏗️ Clean architecture with separation of concerns

### 🚧 In Development
- [ ] 🔐 JWT Authentication & Authorization
- [ ] 🗄️ Database integration (MongoDB/PostgreSQL)
- [ ] 📚 OpenAPI/Swagger documentation
- [ ] 🧪 Unit & integration test suite
- [ ] 🌍 Environment configuration management

### 🔮 Planned Features
- [ ] 📝 Advanced logging system (Winston)
- [ ] 🏥 Comprehensive health check endpoints  
- [ ] 📊 Monitoring & metrics (Prometheus)
- [ ] ☸️ Kubernetes deployment manifests
- [ ] 🔄 CI/CD pipeline (GitHub Actions)
- [ ] 🔍 Request tracing & debugging
- [ ] 🔐 Input validation with Joi/Zod
- [ ] 📧 Email notification system
- [ ] 🌐 Multi-language support (i18n)

### 📋 Priority Roadmap

| Priority | Feature | Estimated Effort | Impact |
|----------|---------|------------------|--------|
| **High** | JWT Authentication | 2-3 days | Security |
| **High** | Database Integration | 3-5 days | Data Persistence |
| **Medium** | Unit Testing | 2-4 days | Code Quality |
| **Medium** | API Documentation | 1-2 days | Developer Experience |
| **Low** | Monitoring Setup | 2-3 days | Operations |

## 🐛 Known Issues & Limitations

### ⚠️ Current Limitations

| Issue | Impact | Workaround | Priority |
|-------|--------|------------|----------|
| **WebSocket persistence** | Connections lost on restart | Implement Redis session store | High |
| **No authentication** | Open API access | Add JWT middleware | High |
| **Mock data only** | No data persistence | Database integration needed | High |
| **General rate limiter disabled** | Reduced protection | Enable in production | Medium |
| **No input validation** | Potential data issues | Add validation middleware | Medium |
| **Limited logging** | Debugging difficulty | Implement Winston logger | Low |

### 🔧 Temporary Workarounds

**WebSocket Session Persistence:**
```typescript
// Future implementation with Redis
const session = new RedisStore({
  host: 'localhost',
  port: 6379
});
```

**Manual Rate Limiter Activation:**
```typescript
// In src/server.ts, uncomment line 12:
app.use(generalLimiter);
```

## 🔧 Troubleshooting

### 🚨 Common Issues & Solutions

#### Docker Issues

**Container won't start:**
```bash
# Diagnosis
docker-compose logs api

# Solutions
docker-compose build --no-cache    # Clear build cache
docker system prune -f             # Clean Docker system
docker-compose up --build          # Force rebuild
```

**Port conflict (3000 already in use):**
```bash
# Option 1: Change external port
# In docker-compose.yml:
ports:
  - "3001:3000"  # Use port 3001 externally

# Option 2: Kill existing process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS:
lsof -ti:3000 | xargs kill -9
```

**Build fails with TypeScript errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit                   # Validate TypeScript
docker-compose exec api npm run build  # Build inside container

# Common fixes
rm -rf node_modules dist           # Clean dependencies
npm install                        # Reinstall packages
```

#### Application Issues

**Rate limiting too restrictive:**
```typescript
// Modify src/middlewares/rateLimiter.ts
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,  // Increase from 50 to 100
  // ... rest of config
});
```

**WebSocket connection fails:**
```bash
# Check WebSocket endpoint
curl http://localhost:3000/websocket  # Should return 200

# Test connection
wscat -c ws://localhost:3000          # Should connect

# Browser console check
const ws = new WebSocket('ws://localhost:3000');
ws.onopen = () => console.log('Connected');
```

**API returns 500 errors:**
```bash
# Check application logs
docker-compose logs -f api

# Common causes:
# 1. Missing dependencies
# 2. TypeScript compilation errors  
# 3. Port binding issues
# 4. Missing environment variables
```

#### Performance Issues

**High memory usage:**
```bash
# Monitor container resources
docker stats

# Optimize if needed:
# 1. Enable production mode: NODE_ENV=production
# 2. Reduce rate limit windows
# 3. Implement request logging rotation
```

**Slow response times:**
```bash
# Performance testing
ab -n 100 -c 10 http://localhost:3000/user

# Optimizations:
# 1. Enable general rate limiter
# 2. Add response caching
# 3. Implement database indexing (future)
```

### 🩺 Diagnostic Commands

```bash
# Full system check
docker-compose ps                  # Service status
docker-compose logs --tail=50 api # Recent logs
curl -I http://localhost:3000/     # HTTP headers
docker inspect <container> | grep Health  # Health status

# Network debugging
docker network ls                  # Docker networks
docker-compose exec api netstat -tlnp  # Port binding
ping localhost                     # Basic connectivity

# Resource monitoring
docker stats --no-stream          # Current resource usage
df -h                             # Disk space
free -m                           # Memory usage
```

## 📞 Support & Community

### 🆘 Getting Help

| Problem Type | Best Resource | Response Time |
|--------------|---------------|---------------|
| **🐛 Bugs** | [GitHub Issues](https://github.com/Karusa12/express-typescript-api/issues) | 24-48 hours |
| **❓ Questions** | [GitHub Discussions](https://github.com/Karusa12/express-typescript-api/discussions) | 12-24 hours |
| **💡 Feature Requests** | [GitHub Issues](https://github.com/Karusa12/express-typescript-api/issues) | 48-72 hours |
| **📖 Documentation** | README.md + Code Comments | Immediate |

### 📋 Before Requesting Support

1. ✅ Check the [Known Issues](#-known-issues--limitations) section
2. ✅ Try the [Troubleshooting](#-troubleshooting) steps
3. ✅ Search existing [GitHub Issues](https://github.com/Karusa12/express-typescript-api/issues)
4. ✅ Test with a clean Docker environment
5. ✅ Provide system information (OS, Docker version, etc.)

### 📝 Issue Template

When creating issues, please include:

```markdown
## Environment
- OS: [e.g., Windows 11, Ubuntu 20.04]
- Docker Version: [e.g., 20.10.21]
- Node.js Version: [e.g., 18.17.0]
- Browser: [e.g., Chrome 119] (for WebSocket issues)

## Expected Behavior
[Describe what should happen]

## Actual Behavior  
[Describe what actually happens]

## Steps to Reproduce
1. Clone repository
2. Run `docker-compose up --build`
3. Execute `curl http://localhost:3000/user`
4. See error...

## Logs
```bash
[Paste relevant logs here]
```

## Additional Context
[Any additional information]
```

---

## 🎉 Quick Start Summary

```bash
# 🚀 Get started in 3 commands:
git clone https://github.com/Karusa12/express-typescript-api.git
cd express-typescript-api  
docker-compose up --build

# ✅ Test the API:
curl http://localhost:3000          # API status
curl http://localhost:3000/user     # Get users
wscat -c ws://localhost:3000        # WebSocket test
```

⭐ **Star this repository if it helped you!** ⭐

---

*Built with ❤️ by [Karusa](https://github.com/Karusa12) | Licensed under MIT | Powered by TypeScript & Docker*
## 🌟 Acknowledgments

- Express.js team for the robust web framework
- TypeScript team for excellent tooling
- Docker for containerization platform
- The open-source community for inspiration and contributions

---

*Built with ❤️ by [Karusa](https://github.com/Karusa12)*
*Written by GitHub Copilot* 