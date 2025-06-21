# Next.js Authentication Handler

Next.js application with an advanced authentication system that implements token rotation and protected routes.

## Features

- JWT token-based authentication system
- Automatic token rotation for enhanced security
- Protected routes with authentication logic
- Built with Next.js 15 and TypeScript

## Should use middleware?

I'm not sure if I should use middleware or not due to compatibility issues with other deployment platforms besides Vercel

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn

## Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install
```

## Configuration

1. Create a `.env` file in the project root:

```env
NEXT_PUBLIC_INTERNAL_API_URI=http://localhost:3000/
NEXT_PUBLIC_API_URI=http://localhost:3001/
```

## Development

```bash
# Start development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```plaintext
├── app/
│   ├── api/         # API Endpoints
│   ├── auth/        # Auth pages
│   └── (dashboard)/ # Dashboard protected pages
├── components/      # Reusable components
├── domain/          # Domain logic
    ├──models/       # Models (Example auth)
    ├──services/     # Services (Example auth)
├── lib/             # Utilities and configurations
├── providers/       # Providers (Example auth)
```

## License

MIT
