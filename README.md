# Airbnb Clone

A Node.js web application that replicates core Airbnb functionality, built with Express.js, EJS templating, and file-based data storage with advanced data validation and utility functions.

## 🏠 Features

### For Guests/Users
- **Browse Homes**: View all available properties with details
- **Home Details**: See comprehensive information about each property
- **Favorites System**: Add/remove homes to your favorites list
- **Contact Support**: Reach out through the contact form with data validation
- **Booking Interface**: View and manage your bookings

### For Hosts
- **Property Management**: Add, edit, and delete your listed properties
- **Host Dashboard**: Manage all your listed homes from one place
- **Property Details**: Update property information and images
- **Data Validation**: Automatic whitespace trimming and input sanitization

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: Tailwind CSS
- **Data Storage**: JSON files (file-based storage)
- **Data Validation**: Custom utility functions for input sanitization
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
- **Contact Us**: Fill out the contact form for support (with data validation)

### Host Features
- **Host Dashboard**: Manage your properties
- **Add New Property**: Create new listings with automatic data cleaning
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
│   ├── homes.json
│   └── contactInfo.json   # Contact form submissions
├── models/               # Data models
│   ├── favourite.js
│   ├── home.js
│   └── contactInfo.js    # Contact form data model
├── public/               # Static assets
│   ├── homes.css
│   └── output.css
├── routes/               # Route definitions
│   ├── hostRouter.js
│   └── storeRouter.js
├── utils/                # Utility functions
│   └── pathUtil.js
├── utlity/               # Data validation utilities
│   ├── utlityFunction.js # String trimming and object sanitization
│   └── test.js          # Utility function tests
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
- **Data Validation**: Automatic whitespace trimming and sanitization

## 🛡️ Data Validation & Utilities

### Utility Functions (`utlity/utlityFunction.js`)

The project includes custom utility functions for data validation:

- **`trimObjString(obj)`**: Trims all string values in an object recursively
- **`strTrim(value)`**: Safely trims individual values with null/undefined handling

### Features:
- ✅ **Automatic Whitespace Removal**: All form inputs are automatically trimmed
- ✅ **Safe Data Handling**: Handles null, undefined, and non-string values gracefully
- ✅ **Nested Object Support**: Recursively processes nested objects and arrays
- ✅ **Non-Mutating**: Returns new objects without modifying originals
- ✅ **Error Prevention**: Prevents crashes from invalid input types

### Usage Example:
```javascript
const { trimObjString } = require("../utlity/utlityFunction");

// Automatically trim all string values in request body
const cleanData = trimObjString(req.body);
```

## 📝 API Endpoints

### Guest Routes
- `GET /` - Homepage
- `GET /homes` - List all homes
- `GET /homes/:id` - Home details
- `GET /favourites` - Favorites list
- `POST /favourites` - Add to favorites
- `POST /favourites/:id/delete` - Remove from favorites
- `GET /contact-us` - Contact form
- `POST /contact-us` - Submit contact form (with validation)
- `GET /bookings` - View bookings

### Host Routes
- `GET /host/homes` - Host dashboard
- `GET /host/homes/add` - Add new home form
- `POST /host/homes/add` - Create new home (with data validation)
- `GET /host/homes/:id/edit` - Edit home form
- `POST /host/homes/:id/edit` - Update home (with data validation)
- `POST /host/homes/:id/delete` - Delete home

## 🎨 Styling

The application uses Tailwind CSS for styling. The main stylesheet is located at `public/output.css`.

## 🔄 Development

To run the application in development mode with auto-restart:

```bash
npm run dev
```

## 🧪 Testing Utilities

Test the utility functions:

```bash
node utlity/test.js
```

## 📄 License

This project is created for educational purposes as part of a learning workshop.

## 🤝 Contributing

This is a learning project. Feel free to explore the code and experiment with new features!

## 🎓 Internship Program

This project was developed as part of the **Infinicode Workshop Internship Program**. It serves as a comprehensive learning experience in full-stack web development using Node.js and modern web technologies.

### 👨‍💻 Developer Details

- **Name**: Nivash Kumar
- **Id**: 1401/INFI25/065
- **Email**: tfnnivash@gmail.com
- **Program**: Infinicode
- **Project**: Airbnb Clone
- **Technologies Learned**: Node.js, Express.js, EJS, Tailwind CSS, File-based Data Storage, Data Validation

### 🎯 Learning Objectives

This project demonstrates proficiency in:
- **Backend Development**: Building RESTful APIs with Express.js
- **Frontend Development**: Creating responsive UIs with EJS and Tailwind CSS
- **Data Management**: Implementing file-based data storage and CRUD operations
- **Data Validation**: Creating utility functions for input sanitization and validation
- **User Experience**: Designing intuitive interfaces for both guests and hosts
- **Project Architecture**: Organizing code with MVC pattern and modular structure
- **Error Handling**: Implementing robust error handling and data validation

### 📚 Project Context

This Airbnb clone represents a real-world application scenario, teaching essential concepts like:
- User authentication and authorization patterns
- Property listing and management systems
- Favorites and booking functionality
- Contact and support systems with data validation
- Responsive design principles
- Data sanitization and validation best practices
- Utility function development and testing

### 🔧 Recent Improvements

- **Data Validation**: Implemented comprehensive input sanitization
- **Utility Functions**: Created reusable data cleaning utilities
- **Contact System**: Added contact form with data persistence
- **Error Handling**: Improved error handling and validation
- **Code Quality**: Enhanced code structure and maintainability
