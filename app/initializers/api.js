export function initialize(application) {
  application.inject('component', 'api', 'service:api');
  application.inject('controller', 'api', 'service:api');
  application.inject('route', 'api', 'service:api');
}

export default {
  name: 'api-service-initializer',
  initialize: initialize
};
