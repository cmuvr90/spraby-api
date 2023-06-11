import {transliterate as tr} from 'transliteration';

/**
 *
 * @param value
 * @returns {string}
 */
const getHandle = value => tr(value).toLowerCase().replaceAll(' ', '_');

/**
 *
 * @param value
 * @returns {null|number}
 */
const getTime = value => {
  if (value.includes('d')) {
    const days = +value.replace('d', '');
    if (Number.isInteger(days)) return days * 24 * 60 * 60 * 1000;
  }

  if (value.includes('h')) {
    const hours = +value.replace('h', '');
    if (Number.isInteger(hours)) return hours * 60 * 60 * 1000;
  }

  if (value.includes('m')) {
    const minutes = +value.replace('m', '');
    if (Number.isInteger(minutes)) return minutes * 60 * 1000;
  }

  if (value.includes('s')) {
    const seconds = +value.replace('s', '');
    if (Number.isInteger(seconds)) return seconds * 1000;
  }

  return null;
}

export {
  getHandle,
  getTime
}
