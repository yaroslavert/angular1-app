import angular from 'angular';
import 'angular-toastr/dist/angular-toastr.tpls.js';
import 'angular-toastr/dist/angular-toastr.min.css';
import 'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';
import {YoutubeService} from './app/services/youtube';
import {AlbumService} from './app/services/albums';

import {Dashboard} from './app/components/dashboard';
import {Album} from './app/components/album';
import 'angular-ui-router';

import {equalHeights} from './app/directives/EqualHeights';

import routesConfig from './routes';
import './index.scss';

angular
  .module('app', ['ui.router', 'toastr', 'ui.bootstrap'])
  .config(routesConfig)
  .run(($rootScope) => {
    $rootScope.progress = true;
  })
  .service('youtubeService', YoutubeService)
  .service('albumService', AlbumService)
  .component('dashboardComponent', Dashboard)
  .component('album', Album)
  .directive('equalHeights', equalHeights)