# Filipino Restaurant CRUD App

A beautiful, production-ready Filipino restaurant app built with Expo Router, featuring table reservations, restaurant information, and a complete CRUD system.

## Features

- 🍽️ Beautiful restaurant homepage with featured dishes
- 📅 Complete reservation system (Create, Read, Update, Delete)
- 📱 Tab-based navigation with Home, Reservations, and About screens
- 🎨 Production-worthy design with authentic Filipino restaurant branding
- 💾 Persistent data storage using localStorage
- 📱 Responsive design that works across all devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the App

#### Development Server
```bash
npm run dev
```

#### Web Build
```bash
npm run build:web
```

### Project Structure

```
app/
├── _layout.tsx                 # Root layout with tab navigation
├── (tabs)/
│   ├── _layout.tsx            # Tab bar configuration
│   ├── index.tsx              # Home screen
│   ├── about.tsx              # About/Contact screen
│   └── reservations/
│       ├── _layout.tsx        # Reservations stack navigator
│       ├── index.tsx          # Reservations list and form
│       └── edit.tsx           # Edit reservation screen
├── +not-found.tsx             # 404 screen
hooks/
├── useFrameworkReady.ts       # Framework initialization hook
utils/
├── database.ts                # Database utility functions
```

## Key Components

### Database System
- Uses localStorage for web compatibility
- Complete CRUD operations for reservations
- TypeScript interfaces for type safety

### Navigation
- Tab-based primary navigation
- Stack navigation within reservations tab
- Proper screen transitions and state management

### Design Features
- Authentic Filipino restaurant branding (#e67e22 color scheme)
- Beautiful hero sections with Pexels imagery
- Card-based layouts with subtle shadows
- Professional typography and spacing
- Responsive design for all screen sizes

## Customization

### Colors
The app uses a warm orange color scheme. To change the primary color, update the `#e67e22` values throughout the stylesheets.

### Images
Replace the Pexels URLs in the components with your own restaurant images.

### Restaurant Information
Update the restaurant details in:
- `app/(tabs)/index.tsx` - Homepage content
- `app/(tabs)/about.tsx` - Contact information and story

## Deployment

### Web Deployment
```bash
npm run build:web
```

The built files will be in the `dist` folder, ready for deployment to any static hosting service.

### Mobile Deployment
Follow Expo's deployment guide for iOS and Android app stores.

## Technologies Used

- Expo Router 4.0.17
- Expo SDK 52.0.30
- React Native
- TypeScript
- Lucide React Native (icons)

## License

This project is open source and available under the MIT License.