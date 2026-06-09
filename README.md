# MiniShop

A modern e-commerce web application built with React, TypeScript, React Query, and Tailwind CSS.

MiniShop was developed as a portfolio project to simulate a real-world online shopping platform. The application includes product browsing, filtering, search functionality, cart management, authentication, and an admin dashboard for product management.

---

## Features

### Customer Features

* Browse products
* Search products by keyword
* Filter products by category
* Pagination support
* Responsive user interface
* Shopping cart management
* Add and remove products from cart
* Update product quantities
* Real-time cart calculations

### Authentication

* User login
* Protected routes
* Authentication state management
* Access control for admin pages

### Admin Dashboard

* Create new products
* Edit existing products
* Delete products
* Product validation
* Product management interface

### User Experience

* Responsive design
* Loading states
* Error handling
* Modal components
* Drawer-based cart interface
* Reusable UI components

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router

### Data Fetching

* React Query (TanStack Query)
* Axios

### Styling

* Tailwind CSS

### Form Validation

* Zod

### State Management

* React Context API

### Development Tools

* Git
* GitHub
* ESLint

---

## Project Structure

```text
src/
│
├── app/
│   ├── router.tsx
│   └── ProtectedRoute.tsx
│
├── features/
│   ├── products/
│   ├── cart/
│   ├── auth/
│   └── admin/
│
├── pages/
│   ├── Shop/
│   ├── Login/
│   └── Admin/
│
├── lib/
│   ├── axios.ts
│   └── react-query.ts
│
├── components/
│
├── assets/
│
└── main.tsx
```

---

## Implemented Concepts

This project demonstrates practical experience with:

* Component-based architecture
* Feature-based folder structure
* React Hooks
* TypeScript integration
* REST API consumption
* Authentication flow
* Protected Routes
* React Query caching and mutations
* Form validation
* Responsive design
* State management
* Reusable component patterns
* Git workflow

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Mini-Shop.git
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## Future Improvements

* User registration
* Product details page
* Favorites / Wishlist
* Order history
* Dark mode support
* Unit testing
* Performance optimizations
* Role-based permissions
* Payment integration

## Author

Ariya Vatan

Frontend Developer

GitHub:
https://github.com/AriyaVatan
