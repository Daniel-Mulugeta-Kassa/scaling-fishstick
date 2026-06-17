# Ethiopian Supermarket ERP/POS System

An enterprise-grade Point of Sale and Enterprise Resource Planning system designed specifically for Ethiopian supermarkets. Built with modern technology stack: React, TypeScript, Node.js, PostgreSQL, and Progressive Web App (PWA) architecture.

## 🎯 Features

### Core POS Features
- **Multi-channel Sales**: In-store, online, and mobile POS terminals
- **Inventory Management**: Real-time stock tracking and automated reordering
- **Product Catalog**: Support for Ethiopian and international products
- **Customer Management**: Loyalty program integration and customer analytics
- **Payment Processing**: Multiple payment methods (Cash, Card, Mobile Money)
- **Receipt Management**: Digital and thermal printer support

### ERP Capabilities
- **Financial Management**: Accounting, budgeting, and financial reporting
- **Supply Chain**: Supplier management, procurement, and logistics
- **Human Resources**: Employee management and payroll
- **Analytics & Reporting**: Business intelligence and custom reports
- **Multi-branch Operations**: Centralized management across locations

### Technical Features
- **Progressive Web App**: Works offline, installable, responsive design
- **Real-time Sync**: Offline-first with automatic data synchronization
- **Security**: End-to-end encryption, role-based access control
- **Scalability**: Microservices architecture for growth
- **Localization**: Ethiopian languages support (Amharic, Oromo, Tigrinya)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (React + PWA)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  POS Terminal │ Admin Dashboard │ Mobile App         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │  API Gateway    │
                   │  (Node.js)      │
                   └────────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    ┌───▼────┐          ┌───▼────┐         ┌───▼────┐
    │  Auth   │          │ Orders │         │Products│
    │ Service │          │Service │         │Service │
    └────┬────┘          └───┬────┘         └───┬────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                            │
                   ┌────────▼────────┐
                   │  PostgreSQL DB  │
                   │  + Redis Cache  │
                   └─────────────────┘
```

## 📁 Project Structure

```
scaling-fishstick/
├── packages/
│   ├── web/                    # React PWA application
│   │   ├── src/
│   │   │   ├── components/     # Reusable components
│   │   │   ├── pages/          # Page components
│   │   │   ├── modules/        # Feature modules
│   │   │   ├── services/       # API services
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── store/          # Redux state management
│   │   │   ├── types/          # TypeScript types
│   │   │   └── utils/          # Utility functions
│   │   ├── public/             # PWA manifest, icons
│   │   └── package.json
│   │
│   ├── server/                 # Node.js backend
│   │   ├── src/
│   │   │   ├── api/            # Express routes
│   │   │   ├── services/       # Business logic
│   │   │   ├── models/         # Database models (TypeORM)
│   │   │   ├── middleware/     # Express middleware
│   │   │   ├── config/         # Configuration
│   │   │   ├── jobs/           # Background jobs
│   │   │   └── types/          # TypeScript types
│   │   ├── migrations/         # Database migrations
│   │   └── package.json
│   │
│   ├── shared/                 # Shared types and utilities
│   │   ├── types/
│   │   ├── constants/
│   │   └── utils/
│   │
│   └── mobile/                 # React Native (future)
│
├── docker/
│   ├── Dockerfile.web
│   ├── Dockerfile.server
│   └── docker-compose.yml
│
├── scripts/                    # Development and deployment scripts
├── docs/                       # Documentation
├── .github/workflows/          # CI/CD pipelines
└── package.json                # Monorepo root

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose
- Git

### Development Setup

```bash
# Clone repository
git clone https://github.com/Daniel-Mulugeta-Kassa/scaling-fishstick.git
cd scaling-fishstick

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development containers
docker-compose up -d

# Run database migrations
npm run db:migrate

# Start development servers
npm run dev
```

### Accessing the Application
- **Web POS**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Documentation**: http://localhost:4000/api/docs
- **Database Admin (pgAdmin)**: http://localhost:5050

## 📦 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Redux, Tailwind CSS, Vite |
| **Mobile Web** | React, PWA, Service Workers, IndexedDB |
| **Backend** | Node.js, Express, TypeORM, Fastify |
| **Database** | PostgreSQL, Redis, Elasticsearch |
| **DevOps** | Docker, Docker Compose, GitHub Actions |
| **Testing** | Jest, React Testing Library, Cypress |
| **Monitoring** | ELK Stack, Prometheus, Grafana |

## 🔐 Security

- JWT authentication with refresh tokens
- Role-Based Access Control (RBAC)
- End-to-end encryption for sensitive data
- PCI DSS compliance for payment processing
- SQL injection prevention (parameterized queries)
- CSRF protection
- Rate limiting and DDoS protection

## 📊 Database Schema

Key entities:
- **Users**: Staff and admin accounts with roles
- **Products**: Catalog with pricing and inventory
- **Transactions/Orders**: Sales and purchase records
- **Payments**: Payment method tracking
- **Customers**: Loyalty program and demographics
- **Suppliers**: Vendor management
- **Inventory**: Stock tracking and adjustments
- **Branches**: Multi-location support

## 🧪 Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🌍 Localization

Supports multiple Ethiopian languages:
- Amharic (am)
- Oromo (om)
- Tigrinya (ti)
- English (en)

## 📈 Roadmap

- **Phase 1**: Core POS and inventory management
- **Phase 2**: Financial management and reporting
- **Phase 3**: Supply chain and procurement
- **Phase 4**: Advanced analytics and BI
- **Phase 5**: Mobile app and enhanced mobile support

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 👨‍💼 Author

**Daniel Mulugeta Kassa**
- GitHub: [@Daniel-Mulugeta-Kassa](https://github.com/Daniel-Mulugeta-Kassa)

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review previous discussions

---

**Built with ❤️ for Ethiopian businesses**
