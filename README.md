# Video Player

A modern video player application built with Next.js, React, and HLS.js. Features include video playback controls, resolution selection, chapter markers, and fullscreen support.

## Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager

## Setup

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd video-player
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Build icon sprite**:
   ```bash
   npm run build:icons
   ```
   This generates the SVG sprite from individual icon files in `src/assets/icons/`. Run this command whenever you add or modify icons.

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

The page will automatically reload when you make changes to the source files.

### Production Build

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm run start
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run build:icons` - Generate the SVG sprite from icon files

## Project Structure

- `src/app/` - Next.js app router pages and layouts
- `src/components/` - React components (VideoPlayer, Icon, etc.)
- `src/hooks/` - Custom React hooks
- `src/assets/icons/` - Individual SVG icon files
- `public/icons/` - Generated SVG sprite (auto-generated)
- `src/utils/` - Utility functions and helpers
- `src/types/` - TypeScript type definitions

## Technologies

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **HLS.js** - HTTP Live Streaming video playback

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)
