module.exports.isLoggedIn = (req, res, next) => {
    const authenticate = req.isAuthenticated();
    if (!authenticate) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', "You must loggedin first");
        return res.redirect('/auth');
    }
    next();
};

module.exports.isAuthor = (req, res, next) => {
    const activeMember = req.user;
    if (activeMember.auth !== 'admin' && activeMember.auth !== 'editor' && activeMember.auth !== 'moderator') {
        req.flash('error', 'This link might be broken');
      return res.redirect('/');
    } 
    next();
}