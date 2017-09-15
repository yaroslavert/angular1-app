export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('dashboard', {
      url: '/',
      component: 'dashboardComponent'
    })
    .state('test', {
      url: '/test',
      component: 'album'
    })
    .state('album', {
      url: '/album/:id',
      component: 'album',
      resolve: {
        album: function($stateParams, albumService) {
          return albumService.getAlbum($stateParams.id);
        }
      }
      
    })
}
