# Instant Wellness Kits Tax Helper

An interactive dashboard designed for visualizing, calculating, and managing tax data for wellness kit orders. Developed by **ilyakras** as part of the **INT20H** hackathon.

## 🚀 Solution Overview

The application provides a centralized platform for financial analysts to import order data via CSV and analyze tax distributions across different jurisdictions. It handles complex tax calculations (State, County, City) and visualizes them on an interactive map with optimized marker clustering for 11,000+ data points.

### Key Features:
* **Interactive Map:** High-performance clustering using `react-leaflet-cluster`.
* **Detailed Tax Breakdown:** Granular view of tax rates and jurisdictions for every transaction.
* **Geo-Tracking:** Integration with Google Maps for precise location verification.
* **Import Management:** Historical tracking of all processed CSV files with automatic order counts.

---

## 💻 Tech Stack
* **Framework:** React 18 + Vite
* **Language:** TypeScript (for type-safe financial data handling)
* **Styling:** `styled-components`
* **Navigation:** React Router 6 (using Path Parameters for deep linking)
* **API:** Axios with custom interceptors for response handling

---

## 🛠 Setup & Running Instructions

### 1. Prerequisites
* **Node.js**: v18.0.0 or higher
* **Yarn**: v1.22.x (recommended) or NPM

### 2. Installation
```bash
git clone https://github.com/IlyaKrasulia/InstantWellnessKitsTaxHelper-App.git
cd InstantWellnessKitsTaxHelper-App
yarn install
```

### 3. Environment Variables
Create a `.env` file:
```env
VITE_API_URL=https://betterme-tax-helper-3d47c59cf1f5.herokuapp.com/api
```

### 4. Local Development
```bash
yarn dev
```

### 5. Production Build
```bash
yarn build
```

### 6. Deployment url
```bash
https://bettermeadmin1.vercel.app/
```

