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
  classNames: ['species'],

  /**
   * Species name.
   *
   * @public
   * @property name
   * @type {string}
   */
  name: null,

  /**
   * Species count.
   *
   * @public
   * @property count
   * @type {number}
   */
  count: null
});
