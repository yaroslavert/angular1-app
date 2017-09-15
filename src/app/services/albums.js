export class AlbumService {
  constructor($log, $http, $q) {
        this.$http = $http;
        this.$q = $q;
        this.albumList = [];
	}
	getAlbums() {
        if (!this.albumList.length) {
            return this.$http.get('./local.json').then((res) => {
                this.albumList = res.data.albums;
                return this.albumList;
            });
        } else {
            let deferred = this.$q.defer();
            deferred.resolve(this.albumList);
            return deferred.promise;
        }
    }
    getAlbum(id) {
        return this.getAlbums().then(res => {
            return res.find(item => item.id === Number(id));
        });
    }
    addVideo(albumId, video){
        return this.$q((resolve, reject) => {
            this.getAlbums().then(albumList => {
                let album = albumList.find((item) => item.id === albumId);
                
                if (!album) {
                    reject('album not found');
                } else {
                    album.movies.push(video);
                    resolve();
                }
            });
        });
    }
    createAlbum(album){
        this.albumList.push(album);
    }
}
