import Component from '@ember/component';
import {
  set
} from '@ember/object';
import {
  all,
  hash
} from 'rsvp';

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
   * Character species.
   *
   * @public
   * @property species
   * @type {Object[]}
   */
  species: null,

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
   * Toggle component load state.
   *
   * @override
   * @public
   * @property loading
   * @type {boolean}
   */
  loading: false,

  /**
   * Build an array of species.
   *
   * @private
   * @function buildSpecies
   * @param {Object[]} characters
   * 
   * @return {Object[]}
   */
  buildSpecies(characters) {
    return Object.values(characters.reduce((collection, character) => {
        let hasSpecies = Array.isArray(character.species) && character.species.length > 0;
        let species = hasSpecies ? character.species[0].name : 'unknown';

        if (collection[species]) {
          collection[species].count++
        } else {
          collection[species] = {
            name: species,
            count: 1
          }
        }

        return collection;
      }, {}))
      .sort((previous, next) => next.count - previous.count);
  },

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

    if (this.links) {
      set(this, 'loading', true);

      this.api.findMany(this.links)
        .then(results => {
          return all(results.map(({
            name,
            mass,
            height,
            species,
            homeworld
          }) => {
            return hash({
              name,
              mass,
              height,
              species: this.api.findMany(species),
              homeworld: this.api.find(homeworld)
            })
          }));
        })
        .then(results => {
          set(this, 'model', results);
          set(this, 'species', this.buildSpecies(results));
        })
        .finally(() => set(this, 'loading', false));
    }
  }
});
