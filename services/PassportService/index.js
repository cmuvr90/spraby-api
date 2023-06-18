import jwt from "jsonwebtoken";

const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const passport = require('passport');

export default class PassportService {

  /**
   *
   * @param payload
   */
  static generateToken = payload => jwt.sign(payload, 'TEST_API', {expiresIn: '1d'});

  /**
   *
   * @param app
   */
  static initialize = app => {
    const jwtOptions = {jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: 'TEST_API'};
    passport.use(new JwtStrategy(jwtOptions, async (payload, done) => done(null, !!payload ? payload : false)));
    app.use(passport.initialize())
  }

  /**
   *
   *
   * @param req
   * @param res
   * @param next
   * @param callback
   */
  static passportMiddleware = async (req, res, next, callback) => {
    passport.authenticate('jwt', {session: false}, async (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({message: 'Unauthorized'});
      await callback(user);
      next();
    })(req, res, next);
  }
}
