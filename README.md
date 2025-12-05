# Abakus

An interactive educational web application that helps children learn basic arithmetic through a virtual abacus (counting tool). The application presents random addition problems and provides an engaging, visual way to practice mental math using the traditional abacus method.

[https://abakus.myownlab.de](https://abakus.myownlab.de)

<img width="815" height="413" alt="abakus" src="https://github.com/user-attachments/assets/7129f88c-d80e-4e97-9648-6fd71dd7e825" />


## Purpose

Abakus is designed to make learning addition fun and intuitive for young learners. By manipulating virtual beads on a digital abacus, students can:

- Visualize number representation in hundreds, tens, and ones
- Practice addition with immediate feedback
- Develop mental math skills through interactive problem-solving
- Understand place value concepts in a hands-on way

The application automatically generates new problems when students solve them correctly, providing endless practice opportunities.

## Technology Stack

This project is built with modern web technologies:

- **SvelteKit** - Full-stack framework for building fast web applications
- **Svelte 5** - Reactive UI framework with component-based architecture
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework for styling
- **Vite** - Next-generation frontend build tool
- **Static Adapter** - Pre-rendered static site generation for optimal performance

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm, pnpm, or yarn package manager

### Installation

Clone the repository and install dependencies:

```sh
git clone <repository-url>
cd abakus_root
npm install
```

### Development

Start the development server with hot module replacement:

```sh
npm run dev
```

Or open the app automatically in your browser:

```sh
npm run dev -- --open
```

The development server will start at `http://localhost:5173` by default.

### Building for Production

Create an optimized production build:

```sh
npm run build
```

The static files will be generated in the `build` directory.

### Preview Production Build

Test the production build locally:

```sh
npm run preview
```

Or use the included serve script:

```sh
npm start
```

This will serve the built application on `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Serve production build on port 3000
- `npm run check` - Run type checking with svelte-check
- `npm run check:watch` - Run type checking in watch mode

## Project Structure

```
src/
├── lib/
│   ├── views/abakus/      # Abakus components and logic
│   │   ├── abakus.ts      # TypeScript types and interfaces
│   │   ├── AbakusDashboard.svelte
│   │   ├── AbakusItem.svelte
│   │   ├── AbakusRow.svelte
│   │   ├── AbakusTask.svelte
│   │   ├── AbakusValue.svelte
│   │   └── AbakusResult.svelte
│   └── assets/            # Static assets (images, SVGs)
├── routes/
│   ├── +layout.svelte     # Root layout
│   └── +page.svelte       # Main application page
└── app.html               # HTML template
```

## Features

- Interactive abacus interface with hundreds, tens, and ones rows
- Randomly generated addition problems
- Visual feedback with bead selection
- Automatic problem generation upon correct answers
- Responsive design for various screen sizes
- Hint system to guide users toward the correct solution

## License

This project lives under the MIT License. See the [LICENSE](LICENSE) file for details.
