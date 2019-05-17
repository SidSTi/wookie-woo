import Component from '@ember/component';

export default Component.extend({

  /**
   * Set the default class names for this component
   *
   * @override
   * @public
   * @property classNames
   * @type {string[]}
   */
  classNames: ['pure-select', 'pure-select--dark'],

  /**
   * Component cache.
   *
   * @public
   * @property model
   * @type {Object[]}
   */
  model: null,

  /**
   * Select box name.
   *
   * @public
   * @property name
   * @type {string}
   */
  name: null,

  /**
   * Select option placeholder.
   *
   * @public
   * @property placeholder
   * @type {string}
   */
  placeholder: null,

  /**
   * Closure action fired on select.
   *
   * @public
   * @function onSelect
   * @param {string} value
   */
  onSelect() {}

});
