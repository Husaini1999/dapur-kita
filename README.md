# DapurKita - Malaysian Home Cooking Marketplace

A modern web application connecting customers with talented home-based cooks in Malaysia. Experience authentic Malaysian cuisine through a community-driven marketplace that supports local entrepreneurs while ensuring halal compliance and quality.

## 🌟 Overview

DapurKita (Our Kitchen) is a comprehensive food marketplace platform that bridges the gap between home cooks and food enthusiasts in Malaysia. The platform features a dual-sided marketplace with dedicated interfaces for both customers and cooks, emphasizing authentic Malaysian flavors, halal certification, and community support.

## ✨ Key Features

### For Customers

- **Browse & Search**: Discover dishes and cooks with advanced filtering
- **Shopping Cart**: Add multiple items from different cooks
- **Order Management**: Track order history and status
- **Reviews & Ratings**: Rate and review dishes and cooks
- **Profile Management**: Manage personal information and preferences
- **Secure Checkout**: Safe payment processing

### For Cooks

- **Cook Dashboard**: Comprehensive management interface
- **Menu Management**: Add, edit, and manage dish listings
- **Order Processing**: View and manage incoming orders
- **Analytics**: Track performance and sales metrics
- **Review Management**: Monitor customer feedback
- **Profile Settings**: Manage business information and certifications

### Platform Features

- **100% Halal Certified**: All cooks are verified for halal compliance
- **Multi-cuisine Support**: Malay, Chinese Malaysian, Indian Malaysian, and Peranakan cuisines
- **Real-time Search**: Advanced search with filters for cuisine, dietary requirements, and meal times
- **Responsive Design**: Optimized for desktop and mobile devices
- **Community Driven**: Supporting local home-based entrepreneurs

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.2.4** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### UI Components

- Custom component library with shadcn/ui
- Responsive design with mobile-first approach
- Dark/light theme support
- Accessible components with ARIA compliance

### State Management

- React Context API for cart management
- Local state management with React hooks
- Form state management with controlled components

## 📁 Project Structure

```
dapur-kita/
├── app/                          # Next.js App Router pages
│   ├── browse/                   # Browse dishes and cooks
│   ├── cart/                     # Shopping cart
│   ├── categories/               # Category browsing
│   ├── checkout/                 # Checkout process
│   ├── cook/                     # Individual cook pages
│   ├── cook-dashboard/           # Cook management dashboard
│   ├── login/                    # User authentication
│   ├── order-confirmation/       # Order success pages
│   ├── profile/                  # User profile management
│   ├── register/                 # User registration
│   ├── register-cook/            # Cook registration
│   ├── review/                   # Review system
│   ├── search/                   # Search functionality
│   └── globals.css               # Global styles
├── components/                   # Reusable React components
│   ├── ui/                       # Base UI components
│   ├── cook-dashboard.tsx        # Cook dashboard layout
│   ├── customer-*.tsx           # Customer-specific components
│   ├── navigation.tsx           # Main navigation
│   └── ...                      # Other feature components
├── contexts/                     # React Context providers
│   └── cart-context.tsx         # Shopping cart state
├── lib/                          # Utility functions and data
│   ├── mock-data.ts             # Sample data for development
│   └── utils.ts                 # Utility functions
└── public/                      # Static assets
    ├── *.png                    # Food and cook images
    └── favicon.ico              # Site favicon
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dapur-kita
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 User Roles & Features

### Customer Features

- Browse dishes by cuisine, dietary requirements, and meal times
- Search for specific dishes or cooks
- Add items to cart from multiple cooks
- Secure checkout process
- Order tracking and history
- Review and rating system
- Profile management

### Cook Features

- Multi-step registration with halal certification
- Comprehensive dashboard with analytics
- Menu management (add, edit, delete dishes)
- Order management and processing
- Review and feedback monitoring
- Business profile customization

## 🍽️ Supported Cuisines

- **Malay Traditional**: Nasi Lemak, Rendang, Ayam Pongteh
- **Chinese Malaysian**: Char Kway Teow, Hokkien Mee, Dim Sum
- **Indian Malaysian**: Roti Canai, Banana Leaf Rice, Biryani
- **Peranakan**: Nyonya dishes, Kuih Lapis, Laksa Lemak

## 🔧 Development

### Component Architecture

- Modular component design with clear separation of concerns
- Reusable UI components with consistent styling
- Type-safe props and state management
- Responsive design patterns

### Data Management

- Mock data structure for development and testing
- TypeScript interfaces for type safety
- Context-based state management for global state

### Styling

- Tailwind CSS for utility-first styling
- Custom design system with consistent color palette
- Responsive breakpoints for all device sizes
- Dark/light theme support

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings (automatically detected)
3. Deploy with zero configuration

### Other Platforms

- **Netlify**: Compatible with Next.js static export
- **AWS Amplify**: Full-stack deployment support
- **Railway**: Simple deployment with database support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Malaysian food culture and traditions
- Home cooks and culinary entrepreneurs
- Open source community and contributors
- Next.js and React teams for excellent frameworks

---

**Note**: This is a demonstration website. Some features may not function properly in a production environment without proper backend integration and database setup.
