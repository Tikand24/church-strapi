# Iglesia Front - Astro + Strapi Frontend

Frontend application for a church website built with Astro and integrated with Strapi CMS.

## 🚀 Quick Start

### Development

```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321`

### Production Build

```sh
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🐳 Docker Deployment

The application uses a multi-stage Docker build that automatically builds the Astro app and serves it with Nginx.

### Prerequisites

**IMPORTANT**: Before building the Docker image, you need:

1. **Strapi backend running** and accessible from the Docker build environment
2. **Environment variables configured** with your Strapi URL and token

### Setup Environment Variables

1. Copy the example file:
```sh
cp .env.example .env
```

2. Edit `.env` with your Strapi configuration:
```env
STRAPI_URL=http://your-strapi-host:1337
STRAPI_TOKEN=your_api_token_here
```

**Note**: 
- For local development: Use `http://host.docker.internal:1337` to access Strapi running on localhost
- For production: Use your production Strapi URL (e.g., `https://api.yourchurch.com`)

### Docker Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm run docker:build`    | Build Docker image (no cache)                    |
| `npm run docker:up`       | Start container in detached mode                 |
| `npm run docker:down`     | Stop and remove container                        |
| `npm run docker:restart`  | Full restart (down → build → up)                 |
| `npm run docker:logs`     | View container logs (follow mode)                |

### Deploying Changes

After making code changes, deploy them to Docker:

```sh
# Option 1: Use the restart script (recommended)
npm run docker:restart

# Option 2: Manual steps
npm run docker:down
npm run docker:build
npm run docker:up
```

**Note**: The build process will connect to Strapi during build time to fetch content and pre-render pages. Make sure Strapi is accessible when building.

The container will be available at `http://localhost:8080`

### Docker Configuration

- **Port**: 8080 → 80 (container)
- **Health Check**: `/health` endpoint every 30s
- **Auto-restart**: Unless stopped manually
- **Build**: Multi-stage (Node.js for build → Nginx for serving)
- **Build Args**: `STRAPI_URL` and `STRAPI_TOKEN` passed from `.env` file

## 🧞 All Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📁 Project Structure

```text
/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and media
│   ├── components/     # Reusable Astro components
│   ├── layouts/        # Page layouts
│   ├── lib/           # Utilities (Strapi client, helpers)
│   ├── pages/         # File-based routing
│   ├── styles/        # Global styles (Tailwind)
│   └── types/         # TypeScript type definitions
├── Dockerfile          # Multi-stage Docker build
├── docker-compose.yml  # Docker Compose configuration
├── nginx.conf         # Nginx server configuration
└── AGENTS.md          # Codebase guide for AI agents
```

## 🔧 Environment Variables

Create a `.env` file in the root:

```env
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_token_here
```

## 📖 Documentation

- [Astro Documentation](https://docs.astro.build)
- [Strapi Documentation](https://docs.strapi.io)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## ⚙️ Technical Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS v4
- **CMS**: Strapi (headless)
- **Server**: Nginx (production)
- **Container**: Docker + Docker Compose
