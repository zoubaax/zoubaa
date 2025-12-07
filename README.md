# Zoubaa — Professional Portfolio Website

A modern, full-featured portfolio website built with React and Vite, showcasing the work and skills of Mohammed Zoubaa. Features a beautiful single-page design with dark mode, multi-language support, dynamic project management, and a comprehensive admin dashboard.


## 🌟 Features

### Core Features
- **Modern Single-Page Design** - Smooth scrolling navigation between sections
- **Dark Mode ("Drake Mode")** - Toggle between light and dark themes
- **Multi-Language Support** - English and French (i18next)
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Custom Animations** - GSAP animations, custom cursor effects, and smooth transitions
- **Preloader** - Elegant 3.5s loading animation on initial page load

### Portfolio Sections
1. **Home** - Hero section with profile photo, introduction, and call-to-action buttons
2. **About** - Work experience and education timeline with company logos and tech stacks
3. **Skills/Projects** - Dynamic project showcase with filtering (Full-stack, AI/ML, Data)
4. **Certificates** - Dedicated page for displaying certifications
5. **Contact** - Contact form with Web3Forms integration and social links

### Admin Dashboard
- **Protected Routes** - Secure authentication via Supabase
- **Project Management** - Add, edit, and manage portfolio projects
- **Technology Management** - Manage technology stack with image uploads
- **Certificate Management** - Upload and organize certificates
- **Real-time Updates** - Changes reflect immediately on the portfolio

### Technical Features
- **Supabase Integration** - Backend database and storage for projects, technologies, and certificates
- **Dynamic Content** - All portfolio content managed through Supabase
- **Image Storage** - Supabase storage for project images and technology logos
- **Form Handling** - Contact form with Web3Forms API integration

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
- **Supabase** - Backend as a Service (Database, Auth, Storage)
- **Web3Forms** - Contact form handling

### Development Tools
- **ESLint** - Code linting
- **TypeScript Types** - Type definitions for React

## 📸 Images & Assets

Screenshot 2025-11-29 200540.png
Screenshot 2025-11-29 101213.png
Screenshot 2025-11-29 101241.png
Screenshot 2025-11-29 101307.png
Screenshot 2025-11-29 101333.png
Screenshot 2025-11-29 101356.png
Screenshot 2025-11-29 101520.png


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
├── supabase/              # Database migrations and schemas
├── index.html             # HTML entry point
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
└── README.md             # This file
```

## 🎨 Customization

### Profile Photo
Replace `src/assets/img/zoubaa2.jpg` with your own profile photo. The image should be square or portrait orientation for best results.

### Colors & Themes
- Light mode background: `#eff9ff`
- Dark mode background: `#050A30`
- Primary colors: Blue (`#3b82f6`) and Cyan (`#06b6d4`)
- Colors are defined in Tailwind classes throughout components

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
