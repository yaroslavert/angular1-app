const YOUTUBE_API_KEY = 'AIzaSyAadF8bwOnEmEZ-2Swdrx-PWyzlgNsESbo';
const YOUTUBE_API_URL_SEARCH = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_API_URL_VIDEOS = 'https://www.googleapis.com/youtube/v3/videos';

export class YoutubeService {
  constructor($log, $http) {
		// $log.log($http);
		this.$http = $http;
	}
	search(query) {
		const params = [
			`q=${query}`,
			`key=${YOUTUBE_API_KEY}`,
			`part=snippet`,
			`type=video`,
			`maxResults=10`
		].join('&');
		const queryUrl = `${YOUTUBE_API_URL_SEARCH}?${params}`;
		return this.$http.get(queryUrl);
	}
	getVideoById(id){
		const params = [
			`id=${id}`,
			`key=${YOUTUBE_API_KEY}`,
			`part=snippet`,
		].join('&');
		const queryUrl = `${YOUTUBE_API_URL_VIDEOS}?${params}`;
		return this.$http.get(queryUrl);
	}
}
