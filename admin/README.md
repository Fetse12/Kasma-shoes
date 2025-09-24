# Kasma Shoes Admin Panel

A modern, responsive admin panel for managing the Kasma Shoes e-commerce platform.

## Features

### 🏠 Dashboard

- Overview of key metrics (total shoes, orders, users, revenue)
- Recent orders display
- Quick action buttons
- Real-time statistics

### 👟 Shoe Management

- View all shoes in a responsive grid layout
- Add new shoes with comprehensive form
- Edit existing shoe details
- Delete shoes with confirmation
- Search and filter functionality
- Image URL management
- Tags and categories support

### 📦 Order Management

- View all customer orders
- Update order status (delivered/pending)
- Search orders by customer name or phone
- Filter by order status
- Detailed order view modal
- Delete orders

### 👥 User Management

- View registered users
- User details and contact information
- Search users by email, username, or phone
- Delete user accounts

### 📊 Analytics

- Sales performance metrics
- Top selling shoes
- Order status distribution
- Revenue growth tracking
- Monthly sales charts
- Quick statistics overview

### ⚙️ Settings

- General site settings
- Notification preferences
- System configuration
- Database management tools
- Maintenance mode toggle

## Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on port 5000

### Installation

1. Navigate to the admin directory:

   ```bash
   cd admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The admin panel integrates with the following backend endpoints:

- `GET /api/shoes` - Fetch all shoes
- `POST /api/shoes` - Create new shoe
- `PUT /api/shoes/:id` - Update shoe
- `DELETE /api/shoes/:id` - Delete shoe
- `GET /api/orders/orders` - Fetch all orders
- `PUT /api/orders/orders/:id` - Update order
- `DELETE /api/orders/orders/:id` - Delete order
- `GET /api/admin/users` - Fetch all users
- `GET /api/admin/stats` - Fetch dashboard statistics
- `GET /api/admin/analytics` - Fetch analytics data

## Authentication

The admin panel uses a simple authentication system. For production use, implement proper JWT authentication with the backend.

## Features Overview

### Responsive Design

- Mobile-first approach
- Collapsible sidebar for mobile devices
- Responsive grid layouts
- Touch-friendly interface

### User Experience

- Intuitive navigation
- Real-time feedback with toast notifications
- Confirmation dialogs for destructive actions
- Loading states and error handling
- Search and filter capabilities

### Data Management

- CRUD operations for all entities
- Bulk operations support
- Data validation
- Error handling and user feedback

## Development

### Project Structure

```
admin/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── store/              # State management
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
└── README.md
```

### Adding New Features

1. Create new page components in `src/pages/`
2. Add API endpoints in `src/services/api.js`
3. Update the store in `src/store/adminStore.js` if needed
4. Add routes in `src/App.jsx`

## Contributing

1. Follow the existing code style
2. Use TypeScript for better type safety (optional)
3. Write meaningful commit messages
4. Test your changes thoroughly

## License

This project is part of the Kasma Shoes e-commerce platform.
