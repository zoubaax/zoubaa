# ZOUBAA — Professional Portfolio Website

A modern, full-featured portfolio website built with React and Vite, showcasing the work and skills of Mohammed Zoubaa. Features a beautiful single-page design with dark mode, multi-language support, dynamic project management, and a comprehensive admin dashboard.


## 🌟 Features

### Core Features
- **Modern Single-Page Design** - Smooth scrolling navigation between sections
- **Smart Dark Mode ("Drake Mode")** - Automatic system theme detection + manual toggle with persistent storage
- **Interactive Project Gallery** - Premium image slider with smooth Framer Motion transitions and full-screen lightbox
- **Multi-Language Support** - English and French (i18next)
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Custom Animations** - GSAP animations, custom target-cursor effects, and smooth transitions
- **Preloader** - Elegant loading animation on initial page load
- **AI Portfolio Assistant** - Responsive AI chatbot powered by Google Gemini 2.5 Flash and Supabase Edge Functions

### Portfolio Sections
1. **Home** - Hero section with profile photo, introduction, and premium CTA buttons
2. **About** - Work experience and education timeline with animated tech loops
3. **Skills/Projects** - Dynamic project showcase with advanced filtering and deep-dive detail pages
4. **Certificates** - Dedicated page for professional certifications with verification links
5. **AI ChatBot** - Interactive assistant for quick questions about skills, projects, and contact info
6. **Contact** - Premium contact form with Web3Forms integration and social links

### Admin Dashboard
- **Protected Routes** - Secure authentication via Supabase
- **Project Management** - Add, edit, and manage portfolio projects with **unlimited gallery images**
- **Technology Management** - Manage technology stack with image uploads
- **Certificate Management** - Upload and organize certificates
- **AI Configuration** - Deploy and manage AI Edge Functions
- **Real-time Updates** - Changes reflect immediately on the portfolio via Supabase listeners

### Technical Features
- **Centralized Theme Architecture** - Global `ThemeContext` managing "Drake Mode" across all pages and hooks
- **Supabase Integration** - High-performance backend database and storage for projects, technologies, and certificates
- **Dynamic Content** - All portfolio content managed through a unified Supabase schema
- **Asset Storage** - Automated bucket management for project galleries and tech logos
- **Edge Functions** - Serverless AI logic for the Portfolio Assistant
- **Form Handling** - Secured contact form with Web3Forms API integration

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **i18next** - Internationalization
- **Lucide React** - Icon library
- **React Icons** - Additional icons

### Backend & Services
- **Supabase** - Backend as a Service (Database, Auth, Storage, Edge Functions)
- **Google AI Studio** - Gemini 2.5 Flash for the AI assistant
- **Web3Forms** - Contact form handling

### Development Tools
- **ESLint** - Code linting
- **TypeScript Types** - Type definitions for React

## 📸 Images & Assets
<img width="1895" height="855" alt="Screenshot 2025-11-29 101213" src="https://github.com/user-attachments/assets/faeb8ce6-b695-4d79-81d3-e23aeb5dac09" />
<img width="1879" height="834" alt="Screenshot 2025-11-29 101520" src="https://github.com/user-attachments/assets/a463264c-d0a6-4a7a-ae5c-cdf9e0dcc996" />
<img width="1894" height="868" alt="Screenshot 2025-11-29 101307" src="https://github.com/user-attachments/assets/6ecbe5e3-3f39-4487-b156-d3278b355d75" />
<img width="1890" height="868" alt="Screenshot 2025-11-29 101333" src="https://github.com/user-attachments/assets/589ff3a7-fc44-4968-8d26-98c2fb4c380f" />
<img width="1879" height="862" alt="Screenshot 2025-11-29 101356" src="https://github.com/user-attachments/assets/aadf6c8a-b9a3-4f94-a78b-f5b49c6b4f40" />
<img width="1073" height="513" alt="Screenshot 2025-11-29 200540" src="https://github.com/user-attachments/assets/f2f1847f-5de0-4875-a7d6-c81b9ce33027" />



### Technology Icons
- React, Node.js, TypeScript, Python, Java, AngularJS
- Spring Boot, PostgreSQL, Supabase, MongoDB
- Tailwind CSS, Figma, GitHub, Selenium
- And many more technology logos in `src/assets/img/`

### Project Images
- `src/assets/img/Healthcare.jpg` - Default project image
- Project images are stored in Supabase Storage and can be managed via the dashboard

### UI Elements
- Hand icon, arrow icons, download icon
- Menu icons (light/dark variants)
- Various UI component icons

## 📋 Prerequisites

- **npm** or **yarn**
- **Supabase Account** - For backend services
- **Web3Forms API Key** - For contact form (optional)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zoubaa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_WEB3FORMS_KEY=your_web3forms_key
GOOGLE_API_KEY=your_google_ai_studio_key (set in Supabase Secrets)
   ```

4. **Set up Supabase**
   - Create a Supabase project
   - Run the migration scripts in `supabase/` directory
   - Set up storage buckets for images
   - See `SUPABASE_SETUP.md` for detailed instructions

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run predeploy` - Build before deployment
- `npm run deploy` - Deploy to GitHub Pages

## 📁 Project Structure

```
zoubaa/
├── public/                 # Static assets
├── src/
│   ├── assets/
│   │   └── img/           # Images (profile photos, logos, icons)
│   ├── components/        # React components
│   │   ├── Home.jsx       # Hero section with profile photo
│   │   ├── About.jsx      # Work experience & education
│   │   ├── MySkills.jsx   # Projects showcase
│   │   ├── Contact.jsx    # Contact form & footer
│   │   ├── Navbar.jsx     # Navigation bar
│   │   ├── Preloader.jsx  # Loading animation
│   │   └── dashboard/     # Admin dashboard components
│   ├── contexts/          # React contexts (Auth, Theme)
│   ├── hooks/             # Custom hooks (TargetCursor, LogoLoop)
│   ├── lib/               # Utilities (Supabase client, storage)
│   ├── locales/           # Translation files (en, fr)
│   ├── pages/             # Page components
│   ├── services/          # API services (projects, certificates, technologies)
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind CSS imports
├── supabase/              # Database migrations and Edge Functions
│   ├── functions/         # Supabase Edge Functions
│   │   └── portfolio-chat # AI assistant logic
│   └── migrations/        # SQL schema migrations
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## 🎨 Customization

### Profile Photo
Replace `src/assets/img/zoubaa2.jpg` with your own profile photo. The image should be square or portrait orientation for best results.

### Colors & Themes
- **Light mode background**: `#eff9ff` (Soft Slate Blue)
- **Dark mode background**: `#050A30` (Deep Space Navy)
- **Accent colors**: Cyan (`#22d3ee`) and Blue (`#2563eb`)
- **Glassmorphism**: Extensive use of backdrop-blur and semi-transparent layers for a premium feel
- **Global Tokens**: Colors are managed via `ThemeContext` and standardized Tailwind classes

### Content Management
- **Projects**: Manage via `/dashboard/projects`
- **Technologies**: Manage via `/dashboard/technologies`
- **Certificates**: Manage via `/dashboard/certificates`
- **Profile Info**: Edit in `src/components/Home.jsx` and `src/components/About.jsx`

### Translations
Edit translation files in:
- `src/locales/en/translation.json`
- `src/locales/fr/translation.json`

## 🌐 Deployment

The project is configured for GitHub Pages deployment:
- Base path: `/zoubaa`
- Build output: `dist/`
- Deploy command: `npm run deploy`

See `GITHUB_PAGES_SETUP.md` for detailed deployment instructions.

## 📝 Additional Documentation

- `SUPABASE_SETUP.md` - Supabase configuration guide
- `SUPABASE_STORAGE_SETUP.md` - Image storage setup
- `DASHBOARD_SETUP.md` - Admin dashboard setup
- `TECHNOLOGIES_SETUP.md` - Technology management guide
- `ENV_SETUP.md` - Environment variables configuration
- `QUICK_START.md` - Quick start guide

## 🎯 Key Features Explained

### Dark Mode (Drake Mode)
Toggle between light and dark themes using the theme button in the navbar. The entire UI adapts with appropriate color schemes.

### Custom Cursor
Interactive custom cursor that follows mouse movement with smooth animations.

### Smooth Scrolling
Navigation links smoothly scroll to sections using anchor links (`#home`, `#about`, etc.).

### Dynamic Projects
Projects are fetched from Supabase and can be filtered by category (Full-stack, AI/ML, Data).

### Multi-language
Switch between English and French using the language switcher in the navbar.

## 📞 Contact

- **Email**: Itsmezoubaa@gmail.com
- **Phone**: +212 701-230904
- **Location**: FEZ, Morocco
- **GitHub**: [zoubaax](https://github.com/zoubaax)
- **LinkedIn**: [zoubaa-mohammed-398266350](https://www.linkedin.com/in/zoubaa-mohammed)

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ by Mohammed Zoubaa
