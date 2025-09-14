// Authentication middleware
exports.isAuth = (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect('/login');
  }
  next();
};

exports.isHost = (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect('/login');
  }
  if (req.session.user.userType !== 'host') {
    return res.status(403).render('404', {
      pageTitle: 'Access Denied',
      currentPage: '403',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
      errors: ['Access denied. Host privileges required.']
    });
  }
  next();
};

exports.isGuest = (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect('/login');
  }
  if (req.session.user.userType !== 'guest') {
    return res.status(403).render('404', {
      pageTitle: 'Access Denied',
      currentPage: '403',
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
      errors: ['Access denied. Guest privileges required.']
    });
  }
  next();
};
