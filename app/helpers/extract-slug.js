import {
  helper
} from '@ember/component/helper';

export function extractSlug([url] /*, hash*/ ) {
  if (url.charAt(url.length - 1) === '/') {
    let chars = url.split('/');

    return chars[chars.length - 2];
  }

  return url.split('/').pop();
}

export default helper(extractSlug);
