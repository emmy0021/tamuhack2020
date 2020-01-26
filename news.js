var url = 'https://newsapi.org/v2/top-headlines?' +
		  'country=au&' +
		  'language=en&' +
          'q=Fire&' +
          'apiKey=43b1e69c4ef0483599e247b48170fcdd';

$.getJSON(url, function(data) {
	var num = data.totalResults;
	var news = "";
	var i;
	for (i = 0; i < num; i++) {
		news =  news + data.articles[i].source.name + ": " + data.articles[i].description;
	}
	document.getElementById("news").innerHTML = news;
	console.log(news);
});

