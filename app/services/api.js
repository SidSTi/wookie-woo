import {
  set
} from '@ember/object';
import Service from '@ember/service';
import fetch from 'fetch';
import {
  all,
  resolve
} from 'rsvp';

export default Service.extend({

  /**
   * The base host api url.
   * 
   * @private
   * @property {string} baseUrl
   */
  baseUrl: 'https://swapi.co/api',

  /**
   * The cache store.
   * 
   * @private
   * @property {string} store
   */
  store: null,

  /**
   * The request timeout period. (Default: 5 minutes).
   * 
   * @private
   * @property {number} timeout
   */
  timeout: 300000,

  /**
   * Clean up url to remove special characters.
   * 
   * @public
   * @function cleanupUrl
   * @param {string} url 
   * 
   * @returns {string}
   */
  cleanupUrl(url = '') {
    return url.replace(/[/]|[.]|[:]|[?]|[=]|[&]/g, '');
  },

  /**
   * Fetch records by url.
   * 
   * @public
   * @function find
   * @param {string} url 
   * 
   * @returns {Promise}
   */
  find(url) {
    return this.getPayload(url);
  },

  /**
   * Fetch all records by resource name.
   * 
   * @public
   * @function findAll
   * @param {string} resource 
   * 
   * @returns {Promise}
   */
  findAll(resource) {
    return this.find(`${this.baseUrl}/${resource}`);
  },

  /**
   * Fetch multiple records by making concurrent requests.
   * 
   * @public
   * @function findMany
   * @param {string[]} urls
   * 
   * @returns {Promise}
   */
  findMany(urls = []) {
    return all(urls.map(url => this.find(url)));
  },

  /**
   * Fetch record by resource name and id.
   * 
   * @public
   * @function findRecord
   * @param {string} resource 
   * @param {string} id
   * 
   * @returns {Promise}
   */
  findRecord(resource, id) {
    return this.find(`${this.baseUrl}/${resource}/${id}`);
  },

  /**
   * Retrieve cached/fresh records.
   * 
   * @private
   * @function getPayload
   * @param {string} url 
   * @param {Object} payload
   * 
   * @returns {Promise}
   */
  getPayload(url) {
    let cleanUrl = this.cleanupUrl(url);

    if (this.isCached(cleanUrl) && !this.isStale(cleanUrl)) {
      return this.peek(cleanUrl);
    }

    return fetch(url)
      .then(response => response.json())
      .then(payload => {
        this.throttle(cleanUrl, payload);

        return payload;
      })
      .catch(e => {
        console.error(e)

        return resolve({});
      });
  },

  /**
   * Service initializer.
   * 
   * @override
   * @public
   * @function init
   * 
   * @returns {void}
   */
  init() {
    this._super(...arguments);

    set(this, 'store', {});
  },

  /**
   * Determine whether a payload exists in cache.
   * 
   * @private
   * @function peek
   * @param {string} url 
   * 
   * @returns {boolean}
   */
  isCached(url) {
    return this.store[url] ? true : false;
  },

  /**
   * Determine whether a request is stale.
   * 
   * @private
   * @function isStale
   * @param {string} url 
   * 
   * @returns {boolean}
   */
  isStale(url) {
    return this.store[url].stale;
  },

  /**
   * Peek payload from store.
   * 
   * @private
   * @function peek
   * @param {string} url 
   * 
   * @returns {Promise}
   */
  peek(url) {
    return resolve(this.store[url].payload);
  },

  /**
   * Throttle request and store to cache.
   * 
   * @private
   * @function throttle
   * @param {string} url 
   * @param {Object} payload
   * 
   * @returns {void}
   */
  throttle(url, payload) {
    this.store[url] = {
      payload,
      stale: false
    }

    setTimeout(() => set(this.store[url], 'stale', true), this.timeout);
  }
});
