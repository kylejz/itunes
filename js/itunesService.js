var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here

this.getMusicData = function(artist, mediaType) {
	var dfrd = $q.defer();
	$http({
		method: "JSONP",
		url: 'https://itunes.apple.com/search?term=' + artist + '&media=' + mediaType + '&callback=JSON_CALLBACK'
	}).then(function(response) {
		var newObjs = response.data.results;
		console.log(response);
		var x = [];
		for (var i = 0; i < newObjs.length; i++) {
			x.push({
				'AlbumArt': newObjs[i].artworkUrl100,
				'Artist': newObjs[i].artistName,
				'Title': newObjs[i].trackName,
				'Collection': newObjs[i].collectionName,
				'CollectionPrice': newObjs[i].collectionPrice,
				'Play': newObjs[i].previewUrl,
				'Type': newObjs[i].kind
			})
		}
		dfrd.resolve(x);
	})
	return dfrd.promise
}
});