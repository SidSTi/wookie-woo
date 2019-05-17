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
  classNames: ['box-office__item'],

  /**
   * A list of properties of the view to apply as class names.
   *
   * @private
   * @override
   * @property classNameBindings
   * @type {string[]}
   */
  classNameBindings: ['isStatic:box-office__item--static'],

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
   * Default tag name for this component.
   *
   * @override
   * @public
   * @property isStatic
   * @type {boolean}
   */
  isStatic: false
});
