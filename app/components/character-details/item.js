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
  classNames: ['character-details__item'],

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
  tagName: 'article',
});
