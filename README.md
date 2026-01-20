# QuickPay - Invoicing Dashboard

A modern, responsive invoicing and payment management dashboard built as a code challenge.

## Overview

QuickPay is a dashboard application that allows users to manage payments and invoices. It features a clean, professional UI with full mobile responsiveness and demonstrates modern React development practices.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form Handling:** react-hook-form + Zod
- **UI Components:** Radix UI (Dialog, Sheet, Select, etc.)
- **Icons:** Lucide React
- **Notifications:** Sonner

## Features Implemented

### Core Features
-  Dashboard layout with sidebar and header navigation
-  Payments/Invoices table with mock data
-  New Invoice Drawer form (slide-out from right)
-  Payment Details Modal
-  Statistics cards showing calculated metrics

### Additional Features
-  Fully responsive design (mobile, tablet, desktop)
-  Mobile hamburger menu with slide-in navigation
-  Form validation with Zod schema
-  Toast notifications for user feedback
-  Date and currency formatting utilities

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Key Implementation Details

### State Management
Uses Zustand for global state management, handling:
- Payments and invoices data
- UI state (drawer, modal, mobile menu)
- Selected payment state

### Form Validation
- Zod schemas for type-safe validation
- react-hook-form for form state management
- Per-field error messages

### Responsive Design
- Mobile-first approach
- Card view for tables on mobile
- Touch-friendly buttons (minimum 44px)
- Adaptive spacing and typography


## Development Notes

- Built with TypeScript for type safety
- Uses Tailwind CSS for styling with custom color tokens
- Components follow shadcn/ui patterns
- Fully responsive and tested on mobile devices
