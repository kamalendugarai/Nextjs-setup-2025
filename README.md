This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Engines

- **node**: `=21.7.3`
- **npm**: `=10.5.0`

## Scripts

- **gdown**: Installs the `gdown` Python package.
- **instgdown**: Installs `gdown` and prints the current and required Python versions.
- **installgdown**: Runs the `instgdown` script.
- **copyEnvFiles**: Downloads environment files using `gdown`.
- **currentPythonVersion**: Prints the current Python version.
- **generateEnvPrompt**: Prompts the user to copy environment files.
- **insertfileId**: Prompts the user to insert a file ID and runs the `generateEnvPrompt` script.
- **getenv**: Runs the `insertfileId` script.
- **dev**: Starts the development server with Node.js inspector enabled.
- **build**: Builds the Next.js application.
- **start**: Starts the Next.js application.
- **lint**: Runs ESLint with the `--fix` option.
- **knip**: Runs the `knip` tool.
- **format**: Runs Prettier to format code.
- **posttest**: Runs the `format` script after tests.
- **prepare**: Installs Husky Git hooks.
- **lint:css**: Runs Stylelint with the `--fix` option.
- **pretest**: Runs the `lint:css` script.
- **gitformatstaged**: Formats staged files using Prettier.

# Project Structure

This document provides a detailed overview of the folder structure of the project.

## Root Directory

- **tailwind.config.ts**: Configuration file for Tailwind CSS.
- **tsconfig.json**: Configuration file for TypeScript.
- **tests-examples**: Directory containing example test files.
  - **demo-todo-app.spec.ts**: Example test file for a demo todo app.

## src

### app

- **global-error.tsx**: Global error handling component.
- **layout.tsx**: Main layout component.
- **not-found.tsx**: Component for handling 404 Not Found errors.

#### globals

- **components**
  - **animatePartials.tsx**: Component for handling animations.
  - **nextImage.tsx**: Component for handling Next.js images.
- **functions**
  - **baseQuery.ts**: Base query function.
  - **console.ts**: Console utility functions.
- **hooks**
  - **useGetByteSize.ts**: Custom hook for getting byte size.

#### [locale]

- **(authRoutes)**
  - **about**
    - **i18n**
      - **en.ts**: English translations for the About page.
      - **fr.ts**: French translations for the About page.
    - **page.tsx**: About page component.
  - **contact**
    - **i18n**
      - **en.ts**: English translations for the Contact page.
      - **fr.ts**: French translations for the Contact page.
    - **page.tsx**: Contact page component.
  - **layout.tsx**: Layout component for authenticated routes.
- **error.tsx**: Error handling component.
- **favicon.ico**: Favicon for the application.
- **fonts**
  - **GeistMonoVF.woff**: Geist Mono variable font.
  - **GeistVF.woff**: Geist variable font.
- **(genericRoutes)**
  - **layout.tsx**: Layout component for generic routes.
  - **terms-and-conditions**
    - **i18n**
      - **en.ts**: English translations for the Terms and Conditions page.
      - **fr.ts**: French translations for the Terms and Conditions page.
    - **page.tsx**: Terms and Conditions page component.
- **globals.css**: Global CSS file.
- **i18n**
  - **en.ts**: English translations.
  - **fr.ts**: French translations.
- **manifest.ts**: Manifest file.
- **not-found.tsx**: Component for handling 404 Not Found errors.
- **page.tsx**: Main page component.
- **(unAuthRoutes)**
  - **layout.tsx**: Layout component for unauthenticated routes.
  - **login**
    - **actions**
      - **index.ts**: Actions for the login page.
    - **css**
      - **index.css**: CSS for the login page.
    - **i18n**
      - **en.ts**: English translations for the login page.
      - **fr.ts**: French translations for the login page.
    - **loading---.tsx**: Loading component for the login page.
    - **page.tsx**: Login page component.
- **utils**
  - **cn.ts**: Utility for class names.
  - **cursor.tsx**: Cursor utility component.
  - **getByteSize.ts**: Utility for getting byte size.
  - **getSetCookie.ts**: Utility for getting and setting cookies.
  - **storage.ts**: Storage utility functions.

### blocks

- **addNumbers**
  - **add.ts**: Function to add numbers.
- **blocks**
  - **addNumbers**
    - **add.ts**: Function to add numbers.

### components

- **app-sidebar.tsx**: Sidebar component for the app.
- **search-form.tsx**: Search form component.
- **ui**
  - **accordion.tsx**: Accordion UI component.
  - **breadcrumb.tsx**: Breadcrumb UI component.
  - **button.tsx**: Button UI component.
  - **card.tsx**: Card UI component.
  - **dropdown-menu.tsx**: Dropdown menu UI component.
  - **form.tsx**: Form UI component.
  - **input.tsx**: Input UI component.
  - **label.tsx**: Label UI component.
  - **separator.tsx**: Separator UI component.
  - **sheet.tsx**: Sheet UI component.
  - **sidebar.tsx**: Sidebar UI component.
  - **skeleton.tsx**: Skeleton UI component.
  - **toaster.tsx**: Toaster UI component.
  - **toast.tsx**: Toast UI component.
  - **tooltip.tsx**: Tooltip UI component.
- **version-switcher.tsx**: Version switcher component.

### hooks

- **use-mobile.tsx**: Custom hook for mobile detection.
- **use-toast.ts**: Custom hook for toast notifications.

### lib

- **utils.ts**: Utility functions.

### middleware.ts

- Middleware configuration file.

# Project Dependencies

This project uses a variety of npm packages to provide functionality and support for development. Below is a list of all the dependencies along with a brief description of what each package does.

## Dependencies

- **@builder.io/partytown**: A library to offload third-party scripts to a web worker for improved performance.
- **@hookform/resolvers**: Resolvers for `react-hook-form` to integrate with various validation libraries.
- **@plaiceholder/next**: A Next.js plugin for generating low-quality image placeholders.
- **@radix-ui/react-accordion**: A set of accessible and customizable accordion components for React.
- **@radix-ui/react-dialog**: A set of accessible and customizable dialog components for React.
- **@radix-ui/react-dropdown-menu**: A set of accessible and customizable dropdown menu components for React.
- **@radix-ui/react-label**: A set of accessible and customizable label components for React.
- **@radix-ui/react-separator**: A set of accessible and customizable separator components for React.
- **@radix-ui/react-slot**: A utility for creating slot-based components in React.
- **@radix-ui/react-toast**: A set of accessible and customizable toast notification components for React.
- **@radix-ui/react-tooltip**: A set of accessible and customizable tooltip components for React.
- **@react-email/components**: A set of React components for building responsive email templates.
- **@react-pdf/renderer**: A library for creating PDF documents using React components.
- **@tailwindcss/aspect-ratio**: A Tailwind CSS plugin for setting aspect ratios on elements.
- **@tailwindcss/container-queries**: A Tailwind CSS plugin for container queries.
- **@tailwindcss/forms**: A Tailwind CSS plugin for styling form elements.
- **@visx/visx**: A collection of low-level visualization components for React.
- **axios**: A promise-based HTTP client for making requests to APIs.
- **chalk**: A library for styling terminal strings.
- **class-variance-authority**: A utility for managing class name variants in React components.
- **client-only**: A utility for ensuring code is only executed on the client side.
- **clsx**: A utility for constructing className strings conditionally.
- **crypto-js**: A library of cryptographic algorithms implemented in JavaScript.
- **date-fns**: A library for manipulating and formatting dates in JavaScript.
- **domsanitizer**: A library for sanitizing HTML strings to prevent XSS attacks.
- **favicons**: A library for generating favicons and other icons for web applications.
- **flowbite**: A library of UI components built with Tailwind CSS.
- **flowbite-react**: React components for Flowbite.
- **framer-motion**: A library for creating animations in React.
- **fuse.js**: A lightweight fuzzy-search library.
- **i**: A library for inflection of English words.
- **i18next**: An internationalization framework for JavaScript.
- **i18next-resources-to-backend**: A utility for loading i18next resources from a backend.
- **jose**: A library for JSON Web Tokens (JWT) and other JOSE (JSON Object Signing and Encryption) standards.
- **jwt-decode**: A library for decoding JSON Web Tokens (JWT).
- **lodash-es**: A modern JavaScript utility library delivering modularity, performance, and extras.
- **lucide-react**: A collection of simple and customizable SVG icons for React.
- **nanoid**: A tiny, secure, URL-friendly, unique string ID generator.
- **next**: The React framework for production.
- **next-i18n-router**: A router for Next.js that supports internationalization.
- **nuqs**: A library for managing state and side effects in React applications.
- **plaiceholder**: A library for generating low-quality image placeholders.
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: The entry point to the DOM and server renderers for React.
- **react-error-boundary**: A library for handling errors in React components.
- **react-hook-form**: A library for building forms in React with minimal re-renders.
- **react-i18next**: A powerful internationalization framework for React.
- **react-icons**: A library of popular icons for React.
- **react-loader-spinner**: A collection of loading spinners for React.
- **react-pdf**: A library for displaying PDF documents in React.
- **react-use**: A collection of essential React hooks.
- **server-only**: A utility for ensuring code is only executed on the server side.
- **sharp**: A high-performance image processing library.
- **tailwind-merge**: A utility for merging Tailwind CSS classes.
- **tailwind-variants**: A utility for creating variant-based Tailwind CSS classes.
- **tailwindcss-animate**: A Tailwind CSS plugin for animations.
- **zod**: A TypeScript-first schema declaration and validation library.
- **zsa**: A library for creating state machines in JavaScript.
- **zsa-react**: React bindings for the zsa state machine library.

## DevDependencies

- **@playwright/test**: A library for end-to-end testing.
- **@tailwindcss/typography**: A Tailwind CSS plugin for styling prose content.
- **@types/crypto-js**: TypeScript definitions for the `crypto-js` library.
- **@types/node**: TypeScript definitions for Node.js.
- **@types/react**: TypeScript definitions for React.
- **@types/react-dom**: TypeScript definitions for React DOM.
- **chalk-cli**: A CLI for the `chalk` library.
- **cssnano**: A CSS minifier.
- **eslint**: A pluggable linting utility for JavaScript and JSX.
- **eslint-config-next**: ESLint configuration for Next.js.
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier.
- **git-format-staged**: A tool for formatting staged files in a Git repository.
- **husky**: A tool for managing Git hooks.
- **knip**: A tool for analyzing and managing dependencies in JavaScript projects.
- **lint-staged**: A tool for running linters on staged Git files.
- **postcss**: A tool for transforming CSS with JavaScript plugins.
- **prettier**: An opinionated code formatter.
- **stylelint**: A linter for CSS and other stylesheets.
- **stylelint-config-standard**: The standard shareable config for Stylelint.
- **stylelint-config-tailwindcss**: A shareable config for Stylelint that works with Tailwind CSS.
- **tailwindcss**: A utility-first CSS framework.
- **typescript**: A typed superset of JavaScript that compiles to plain JavaScript.
