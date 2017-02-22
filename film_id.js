var app = angular.module('movieplug', []);
app.controller('film_id', function($scope, $http) {
    for (let i = 1; i <=25; i++) {
        $scope.film_list = [];
        $http.get("https://api.themoviedb.org/3/genre/878/movies?api_key=e72f880255c5b01996f688fc51152f3a&page=" + i).
        then(function(response) {
            $scope.films = response.data;
            for (let j=0; j< $scope.films.results.length-1; j++){
              $scope.film_list.push($scope.films.results[j]);
            }
        });
    }

    $scope.show_infos = function(i) {
        $('#info-div').addClass('displayed');
        $('#info-div').on('click', '.bye', function() {
          $('#info-div').removeClass('displayed');
        });
        console.log("click is ok !");

        $scope.title = i.original_title;
        $scope.overview = i.overview;
        $scope.date = i.release_date;
        $scope.img = "https://image.tmdb.org/t/p/w640" + i.poster_path;
        $scope.vote = i.vote_average;
        console.log($scope.img);

        let request = i.original_title + ' trailer';
        console.log(request);

        $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + request + '&key=AIzaSyBo6GWJnzMlR_M4WQOQGYBcZ2lU_Lgw2LQ').then(function(response) {
            let filmList = response.data;
            $scope.videoId = filmList.items[0].id.videoId;
        });

    };


});
