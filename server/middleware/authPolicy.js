module.exports = {
  restrictToSelf: (req, res, next) => {
    if (req.authenticatedUser.id === req.user.id) {
      next();
    } else {
      next(new Error('Unauthorized'));
    }
  },

  restrictTo: role => (req, res, next) => {
    if (req.authenticatedUser.role === role) {
      next();
    } else {
      next(new Error('Unauthorized'));
    }
  },
};
