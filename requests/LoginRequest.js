import {validationResult, checkSchema} from 'express-validator';
import LoginError from '../services/ErrorService/LoginError';

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 * @constructor
 */
export const LoginRequest = async (req, res, next) => {
  try {
    await checkSchema({
      email: {
        exists: {
          errorMessage: 'Email is required',
        },
        notEmpty: {
          errorMessage: 'Email is not empty'
        },
        isEmail: {
          errorMessage: 'Email is not valid'
        }
      },
      password: {
        exists: {
          errorMessage: 'Password is required',
        },
        notEmpty: {
          errorMessage: 'Password is not empty'
        }
      }
    }).run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    LoginError.badRequestError(errors.array().map(i => i.msg));

  } catch (e) {
    return next(e)
  }
}
