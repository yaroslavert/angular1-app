class AlbumController {
	constructor($stateParams, $scope, toastr, $uibModal, youtubeService, albumService, $rootScope) {
    this.toastr = toastr;
    this.$scope = $scope;
		this.$uibModal = $uibModal;
		this.albumService = albumService;
		this.youtubeService = youtubeService;
		this.$rootScope = $rootScope;
    setTimeout(()=>{
      this.$scope.$broadcast("equalHeights");
    });
    this.$onInit = () => {
			if (!this.album){
				this.toastr.error('album not found');
				return;
			}
			this.$rootScope.progress = false;
    }
  }
  addVideo(){
    let modal = this.$uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title-top',
			ariaDescribedBy: 'modal-body-top',
			template: require('./../view/part/addVideo.html'),
			size: 'sm',
			controller: ($scope) => {
				$scope.link = '';
				$scope.addVideo = () => {
					let patern = /watch\?v=(\w+)/g;
					let group = patern.exec($scope.link);
					this.$rootScope.progress = true;
					if(group && group[1]) {
						this.youtubeService.getVideoById(group[1])
							.then((res) => {
								let data = res.data;
								if (!data.items.length) throw new Error();

								let video = {
									id: data.items[0].id,
									title: data.items[0].snippet.title,
									description: data.items[0].snippet.description,
									thumbnailUrl: data.items[0].snippet.thumbnails.high.url
								}
								this.albumService.addVideo(this.album.id, video)
									.then(() => {
										this.$scope.$broadcast("equalHeights");
										this.toastr.success('Success');
									}).catch((err) => {
										this.toastr.error(err);
									}).then(() => {
										this.$rootScope.progress = false;
									})
							})
							.catch((err) => {
								console.log('err', err);
								this.toastr.error('Video not found');
								this.$rootScope.progress = false;
							});
					} else {
						this.toastr.error('You video link is ivalid :)');
						this.$rootScope.progress = false;
					}
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

export const Album = {
  template: require('./../view/album.html'),
  controller: AlbumController,
  bindings: {
    album: '<'
  }
};
