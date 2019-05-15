import DS from 'ember-data';

export default DS.RESTAdapter.extend({

  /**
   * The host url
   * 
   * @override
   * @public
   * @property {string} host
   */
  host: 'https://swapi.co',

  /**
   * The api namespace
   * 
   * @override
   * @public
   * @property {string} namespace
   */
  namespace: 'api'
});
