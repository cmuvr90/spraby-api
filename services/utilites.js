import {transliterate as tr} from 'transliteration';

/**
 *
 * @param value
 * @returns {string}
 */
const getHandle = value => tr(value).toLowerCase().replaceAll(' ', '_');

export {
  getHandle
}
