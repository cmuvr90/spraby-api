import {validationResult, checkSchema} from 'express-validator';
import RegisterError from '../services/ErrorService/RegisterError';

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 * @constructor
 */
const RegisterRequest = async (req, res, next) => {
  try {
    await checkSchema({
      email: {
        exists: {
          errorMessage: 'Email is required',
        },
        isEmail: {
          errorMessage: 'Email is not valid'
        }
      },
      password: {
        exists: {
          errorMessage: 'Password is required',
        },
        isLength: {
          errorMessage: 'Password should be at least 3 and less 15 chars long',
          options: {min: 3, max: 15},
        },
      }
    }).run(req);

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    RegisterError.badRequestError(errors.array().map(i => i.msg));

  } catch (e) {
    return next(e)
  }
}

export default RegisterRequest;
