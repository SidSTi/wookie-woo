import Component from '@ember/component';
import {
  set
} from '@ember/object';

export default Component.extend({

  /**
   * Set the default class names for this component
   *
   * @override
   * @public
   * @property classNames
   * @type {string[]}
   */
  classNames: ['character-details'],

  /**
   * Character links.
   *
   * @public
   * @property links
   * @type {string[]}
   */
  links: null,

  /**
   * Component cache.
   *
   * @public
   * @property model
   * @type {Object[]}
   */
  model: null,

  /**
   * Default tag name for this component.
   *
   * @override
   * @public
   * @property tagName
   * @type {string}
   */
  tagName: 'section',

  /**
   * Ember called upon each subsequent attribute insertion/update.
   *
   * @override
   * @private
   * @function didReceiveAttrs
   * 
   * @returns {void}
   */
  didReceiveAttrs() {
    this._super(...arguments);

    this.api.findMany(this.links)
      .then(results => set(this, 'model', results));
  }
});
