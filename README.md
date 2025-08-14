# Airbnb Clone

A Node.js web application that replicates core Airbnb functionality, built with Express.js, EJS templating, and file-based data storage.

## 🏠 Features

### For Guests/Users
- **Browse Homes**: View all available properties with details
- **Home Details**: See comprehensive information about each property
- **Favorites System**: Add/remove homes to your favorites list
- **Contact Support**: Reach out through the contact form
- **Booking Interface**: View and manage your bookings

### For Hosts
- **Property Management**: Add, edit, and delete your listed properties
- **Host Dashboard**: Manage all your listed homes from one place
- **Property Details**: Update property information and images

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: Tailwind CSS
- **Data Storage**: JSON files (file-based storage)
- **Development**: Nodemon for auto-restart

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lec10airbnb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## 🚀 Usage

### Guest Features
- **Homepage**: Browse featured properties
- **Homes List**: View all available properties
- **Home Details**: Click on any property to see detailed information
- **Add to Favorites**: Use the heart icon to save properties
- **Favorites List**: View all your saved properties
- **Contact Us**: Fill out the contact form for support

### Host Features
- **Host Dashboard**: Manage your properties
- **Add New Property**: Create new listings
- **Edit Properties**: Update existing property information
- **Delete Properties**: Remove properties from your listings

## 📁 Project Structure

```
lec10airbnb/
├── app.js                 # Main application entry point
├── controllers/           # Request handlers
│   ├── errorController.js
│   ├── hostController.js
│   └── storeController.js
├── data/                  # JSON data files
│   ├── favourite.json
│   └── homes.json
├── models/               # Data models
│   ├── favourite.js
│   └── home.js
├── public/               # Static assets
│   ├── homes.css
│   └── output.css
├── routes/               # Route definitions
│   ├── hostRouter.js
│   └── storeRouter.js
├── utils/                # Utility functions
│   └── pathUtil.js
├── views/                # EJS templates
│   ├── 404.ejs
│   ├── host/            # Host-specific views
│   ├── partials/        # Reusable components
│   └── store/           # Store/guest views
├── package.json
└── README.md
```

## 🔧 Configuration

The application uses the following configuration:

- **Port**: 3000 (default)
- **Data Storage**: JSON files in the `data/` directory
- **Template Engine**: EJS
- **Static Files**: Served from `public/` directory

## 📝 API Endpoints

### Guest Routes
- `GET /` - Homepage
- `GET /homes` - List all homes
- `GET /homes/:id` - Home details
- `GET /favourites` - Favorites list
- `POST /favourites` - Add to favorites
- `POST /favourites/:id/delete` - Remove from favorites
- `GET /contact` - Contact form
- `POST /contact` - Submit contact form
- `GET /bookings` - View bookings

### Host Routes
- `GET /host/homes` - Host dashboard
- `GET /host/homes/add` - Add new home form
- `POST /host/homes/add` - Create new home
- `GET /host/homes/:id/edit` - Edit home form
- `POST /host/homes/:id/edit` - Update home
- `POST /host/homes/:id/delete` - Delete home

## 🎨 Styling

The application uses Tailwind CSS for styling. The main stylesheet is located at `public/output.css`.

## 🔄 Development

To run the application in development mode with auto-restart:

```bash
npm run dev
```

## 📄 License

This project is created for educational purposes as part of a learning workshop.

## 🤝 Contributing

This is a learning project. Feel free to explore the code and experiment with new features!

## 🎓 Internship Program

This project was developed as part of the **Infinicode Workshop Internship Program**. It serves as a comprehensive learning experience in full-stack web development using Node.js and modern web technologies.

### 👨‍💻 Developer Details

- **Name**: Nivash kumar
- **Id**: 1401/INFI25/065
- **gmail**: tfnnivash@gmail.com
- **Program**: Infinicode
- **Project**: Airbnb Clone
- **Technologies Learned**: Node.js, Express.js, EJS, Tailwind CSS, File-based Data Storage

### 🎯 Learning Objectives

This project demonstrates proficiency in:
- **Backend Development**: Building RESTful APIs with Express.js
- **Frontend Development**: Creating responsive UIs with EJS and Tailwind CSS
- **Data Management**: Implementing file-based data storage and CRUD operations
- **User Experience**: Designing intuitive interfaces for both guests and hosts
- **Project Architecture**: Organizing code with MVC pattern and modular structure

### 📚 Project Context

This Airbnb clone represents a real-world application scenario, teaching essential concepts like:
- User authentication and authorization patterns
- Property listing and management systems
- Favorites and booking functionality
- Contact and support systems
- Responsive design principles
