class DashboardController {
	constructor(youtubeService, albumService, $uibModal, $scope, $rootScope) {
		this.youtubeService = youtubeService;
		this.albumService = albumService;
		this.$scope = $scope;
		this.$uibModal = $uibModal;
		this.albumList = [];
		this.$rootScope = $rootScope;
		this.$onInit = function() {
			this.$rootScope.progress = true; 
			this.albumService.getAlbums()
				.then((res) => {
					this.albumList = res;
					this.$scope.$broadcast("equalHeights");
				}).catch((err) => {
					console.log('err', err);
				}).then(() => {
					this.$rootScope.progress = false;
				})
		};
	}
	createAlbum(){
		let modal = this.$uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title-top',
			ariaDescribedBy: 'modal-body-top',
			template: require('./../view/part/createAlbum.html'),
			size: 'sm',
			controller: ($scope) => {
				$scope.album = {
					name: '',
					title: '',
					description: '',
					id: Date.now(),
					movies: []
				}
				$scope.create = () => {
					console.log($scope.album);
					this.albumService.createAlbum($scope.album);
					this.$scope.$broadcast("equalHeights");
					$scope.close();
					
				};
				$scope.close = function() {
					modal.close();
				};
			}
		});

		modal.result.then(function () { }, function () { });
	}
}

export const Dashboard = {
  template: require('../view/dashboard.html'),
  controller: DashboardController,
  bindings: {

  }
};
// require('dashboard.html')