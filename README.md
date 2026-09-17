# MindDesk

MindDesk is a modern, distraction-free personal productivity web application designed to help you organize your daily work, plan upcoming tasks, manage goals, and capture ideas effortlessly. Built with a focus on speed, aesthetics, and privacy, MindDesk operates entirely within your browser natively.

## Features

- **Dynamic Dashboard**: Get a birds-eye view of your day with integrated progress tracking, daily goals, and recent notes.
- **Task Management**: Streamlined To-Do lists that tie directly into an overarching organizational planner.
- **Zen-Mode Notes Editor**: A fully immersive, distraction-free auto-saving writing environment for capturing ideas and long-form thoughts. Features pinning, live search, and statistics tracking.
- **Goal Tracking**: Create and measure long-term objectives with progress indicators.
- **Cross-Theme Support**: Flawless, highly-polished Dark Mode and Light Mode capabilities. 
- **100% Privacy-First**: Zero databases. Zero external backend calls. All data is securely bound locally into your machine's browser via LocalStorage.

## Tech Stack

- **React**: Component architecture and SPA navigation.
- **Vite**: Blazing-fast development and optimized production builds.
- **Lucide React**: Crisp, modern typography and iconography.
- **Vanilla CSS**: Extensible design token architecture.
- **Browser LocalStorage API**: Complete client-side state execution.

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository to your local machine.

2. Navigate to the project directory:
   ```bash
   cd MindDesk
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Spin up the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the app!

## Deployment

MindDesk is fully configured to be deployed instantly on platforms like **Vercel** or **Netlify**. A `vercel.json` configuration file is already included to support Client-Side Routing specifically for Single Page Applications (SPA).
