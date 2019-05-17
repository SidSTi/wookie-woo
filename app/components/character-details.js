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
   * Character sort by options.
   *
   * @public
   * @property sortOptions
   * @type {Object[]}
   */
  sortOptions: null,

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
   * Lifecycle hook called upon component insertion into DOM.
   *
   * @override
   * @private
   * @function didInsertElement
   * 
   * @returns {void}
   */
  didInsertElement() {
    this._super(...arguments);

    set(this, 'sortOptions', ['name',
      'mass',
      'height',
      'homeworld'
    ]);
  },

  /**
   * Lifecycle hook called upon each subsequent attribute insertion/update.
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
  },

  /**
   * Actions hash.
   *
   * @public
   * @property actions
   * @type {Object}
   */
  actions: {

    /**
     * Call this action to sort characters by attribute.
     *
     * @private
     * @function sortBy
     * @param {string} attribute - the attribute type.
     */
    sortBy(attribute) {
      let modelCopy = [...this.model];

      switch (attribute) {
        case 'mass':
          modelCopy.sort((a, b) => {
            if (isNaN(a) || isNaN(b)) {
              return a.mass.localeCompare(b.mass);
            }

            return a.mass - b.mass
          });
          break;
        case 'height':
          modelCopy.sort((a, b) => {
            if (isNaN(a) || isNaN(b)) {
              return a.height.localeCompare(b.height);
            }

            return a.height - b.height
          });
          break;
        case 'name':
          modelCopy.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'homeworld':
          modelCopy.sort((a, b) => a.homeworld.name.localeCompare(b.homeworld.name));
          break;
        default:
          modelCopy.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }

      set(this, 'model', modelCopy);
    }
  }
});
