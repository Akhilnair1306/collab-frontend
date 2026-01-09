# Project Name - collab-frontend

A modern, responsive web application built with Next.js 14 and shadcn/ui, delivering exceptional user experience and performance.

## 🎯 Overview

This frontend application provides an intuitive and performant user interface for collab- an application built for collaborative note sharing. Built with the latest Next.js features including App Router, Server Components, and Server Actions.

## 🛠 Tech Stack

- **Framework**: Next.js 14.x (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.x or higher)
- npm or yarn or pnpm
- Git

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/Akhilnair1306/collab-frontend.git
cd collab-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Copy the environment variables file:

```bash
cp.env.local
```


## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL = http://localhost:5000/api
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:3000` with hot-reloading enabled.

### Production Build

```bash
npm run build
npm start
```
