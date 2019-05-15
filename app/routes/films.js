import Route from '@ember/routing/route';

export default Route.extend({

  /**
   * A hook implemented to convert the URL into the model for this route.
   * 
   * @override
   * @public
   * @function model
   * 
   * @returns {DS.PromiseArray}
   */
  model() {
    this._super(...arguments);
  }
});
