import {
  set
} from '@ember/object';
import Service from '@ember/service';
import fetch from 'fetch';
import {
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
   * Find records by url.
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
   * Find records by resource name.
   * 
   * @public
   * @function findAll
   * @param {string} url 
   * 
   * @returns {Promise}
   */
  findAll(resource) {
    return this.find(`${this.baseUrl}/${resource}`);
  },

  /**
   * Find record by resource name and id.
   * 
   * @public
   * @function findRecord
   * @param {string} url 
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
    if (this.isCached(url) && !this.isStale(url)) {
      return this.peek(url);
    }

    return fetch(url)
      .then(response => response.json())
      .then(payload => {
        this.throttle(url, payload);

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
   * @function init
   */
  init() {
    this._super(...arguments);

    set(this, 'store', {});
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
