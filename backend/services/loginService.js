import passport from 'passport';
import jwt from 'jsonwebtoken';
import Config from '@config';

const githubOAuthLogin = (req, res) => {
  passport.authenticate('github', { failureRedirect: '/' }, (err, user) => {
    const [User] = user;
    const token = jwt.sign({ userId: User.dataValues.userId }, Config.JWT_SECRET);
    if (req.headers['user-agent'].includes('iPhone')) {
      return res.redirect(`issuetracker://${token}`);
    }
    res.cookie('jwt', token, { domain: '49.50.166.157', httpOnly: true });
    return res.redirect('http://49.50.166.157:8000/');
  })(req, res);
};

export default { githubOAuthLogin };
