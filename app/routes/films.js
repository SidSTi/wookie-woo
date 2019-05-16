import Route from '@ember/routing/route';

export default Route.extend({

  /**
   * A hook implemented to convert the URL into the model for this route.
   * 
   * @override
   * @public
   * @function model
   * 
   * @returns {Promise}
   */
  model() {
    return this.api.findAll('films');
  }
});
