import EmberRouter from '@ember/routing/router';
import config from 'frontend-decide-question-answering/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });

  this.route('gdpr');
  this.route('route-not-found', {
    path: '/*wildcard',
  });
});
