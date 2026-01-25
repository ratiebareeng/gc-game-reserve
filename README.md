# Gaborone Game Reserve API

Backend API for the Gaborone Game Reserve mobile application.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+
- Git

### Installation

1. Clone the repository
```bash
cd gaborone-reserve-backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Create PostgreSQL database
```bash
createdb gaborone_reserve
```

5. Run database migrations
```bash
npm run migration:run
```

6. Seed the database with initial data
```bash
npm run seed
```

### Development

Start the development server with hot reload:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Build

Build the TypeScript code:
```bash
npm run build
```

### Production

Run the compiled code:
```bash
npm start
```

## API Documentation

### Base URL
```
http://localhost:3000/v1
```

### Health Check
```
GET /health
```

### Version
```
GET /version
```

### Authentication Endpoints
- `POST /v1/auth/register` - Register new user
- `POST /v1/auth/login` - Login user
- `GET /v1/auth/me` - Get current user profile

### Booking Endpoints
- `POST /v1/bookings` - Create booking
- `GET /v1/bookings` - List user bookings
- `GET /v1/bookings/:id` - Get booking details
- `DELETE /v1/bookings/:id` - Cancel booking

### Animal Endpoints
- `GET /v1/animals` - List all animals
- `GET /v1/animals/:id` - Get animal details
- `GET /v1/animals/featured` - Get featured animals

### Points of Interest Endpoints
- `GET /v1/poi` - List all POIs
- `GET /v1/poi/:id` - Get POI details
- `GET /v1/poi/nearby` - Get nearby POIs by GPS coordinates

## Database Schema

### Users
- User authentication and profile information
- Roles: visitor, staff, admin

### Activity Types
- Game Viewing: P10/person + P10/car
- Picnic/Braai & Game Viewing: P15/person + P10/car

### Bookings
- Visitor bookings with dates, times, and pricing
- Status tracking (pending, confirmed, cancelled, completed)

### Payments
- Payment processing and tracking
- Integration with DPO PayGate

### Animals
- Wildlife information encyclopedia
- Categories: mammals, birds, reptiles
- Conservation status and interesting facts

### Points of Interest
- GPS locations for navigation
- Types: gates, viewpoints, picnic areas, watering holes

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm start` - Start production server
- `npm run migration:generate` - Generate new migration
- `npm run migration:run` - Run migrations
- `npm run migration:revert` - Revert last migration
- `npm run seed` - Seed database with initial data
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Environment Variables

See `.env.example` for all available configuration options.

### Required Variables
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - JWT secret key for token signing

### Optional Variables
- `PORT` - API server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- Payment gateway credentials
- Email service credentials
- SMS service credentials
- AWS S3 credentials

## Project Structure

```
src/
├── config/              # Configuration files
│   ├── database.ts      # Database connection
│   ├── environment.ts   # Environment variables
│   └── constants.ts     # Application constants
├── database/
│   ├── entities/        # TypeORM entities
│   ├── migrations/      # Database migrations
│   └── seeders/         # Seed data scripts
├── middleware/          # Express middleware
│   └── error.middleware.ts
├── modules/             # Feature modules
│   ├── auth/           # Authentication
│   ├── bookings/       # Booking management
│   ├── payments/       # Payment processing
│   ├── animals/        # Animal encyclopedia
│   └── poi/            # Points of interest
├── services/           # Business services
├── utils/              # Utility functions
├── app.ts              # Express app setup
└── index.ts            # Application entry point
```

## Security

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers

## License

MIT
