# Final Year Project Client

A modern web application built with React and Vite, featuring location-based services and payment integration.

## 🚀 Features

- Interactive maps using Leaflet
- Location-based services with geolocation support
- Payment processing with Stripe
- Modern UI components using Ant Design
- State management with Redux Toolkit
- Responsive design for all devices

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 6
- **UI Library:** Ant Design 5
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM 7
- **Maps:** Leaflet & React-Leaflet
- **HTTP Client:** Axios
- **Payment Processing:** Stripe
- **Date Handling:** Moment.js
- **Geolocation:** Geolib

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd FinalYearClient
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 📝 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── redux/         # Redux store and slices
├── services/      # API services
├── utils/         # Utility functions
└── App.jsx        # Root component
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React Team
- Vite Team
- Ant Design Team
- Leaflet Team