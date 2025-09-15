# File Upload/Download Airbnb Clone (Express + EJS + MongoDB)

A Node.js app where hosts can add/edit/delete homes with image/PDF uploads, and guests can browse, view details, and manage favourites. Implements proper cleanup of uploaded files and removal of deleted homes from users’ favourites and hosts’ `hostedHomes`.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Auth/Session**: express-session, connect-mongodb-session
- **Upload**: multer (stores images and PDFs on disk under `uploads/`)
- **Views**: EJS
- **Styles**: Tailwind CSS (compiled to `public/output.css`)

## 📦 Setup

1) Install dependencies
```bash
npm install
```

2) Configure environment
```bash
cp env.example .env
# then edit .env:
 MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
# SESSION_SECRET=...
 PORT=8000
```

3) Build CSS (optional if `public/output.css` exists)
```bash
npm run build
```

4) Run the app
```bash
npm run dev   # development with nodemon
# or
npm start     # production
```

Open `http://localhost:8000`.

## 💡 Features

- **Host**: add/edit/delete homes, upload 1 image and 1 rules PDF per home
- **Guest**: list homes, view details, add/remove favourites
- **Cleanup**: when a home is deleted, its files are removed and the home ID is pulled from every user’s `favourites` and `hostedHomes`

## 📁 Project Structure

```
lec-20_file-upload-download/
├── app.js
├── controllers/
│   ├── authController.js
│   ├── errorController.js
│   ├── hostController.js
│   └── storeController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── home.js
│   └── user.js
├── public/
│   └── output.css
├── routes/
│   ├── authRouter.js
│   ├── hostRouter.js
│   └── storeRouter.js
├── uploads/
│   ├── images/
│   ├── pdfs/
│   └── others/
├── utils/
│   └── pathUtil.js
└── views/
    ├── 404.ejs
    ├── auth/
    ├── host/
    ├── partials/
    └── store/
```

## 🔧 Environment

See `env.example`. Required variables:
- `MONGODB_URI`
- `SESSION_SECRET`
- `PORT` (defaults to 8000 if not set)

## 🧰 Scripts

- `npm run build` – compile Tailwind to `public/output.css`
- `npm run dev` – start with nodemon
- `npm start` – start with Node

## ✅ Notes

- Ensure `uploads/images`, `uploads/pdfs`, and `uploads/others` exist. They are git-ignored; placeholder `.gitkeep` files are added so folders are tracked.
- Deleting a home also removes it from users’ `favourites` and `hostedHomes` and deletes its files from disk.
