import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('films', {
    path: '/'
  });
  this.route('film', {
    path: '/films/:id'
  });
});

export default Router;
