var app = angular.module('demo', []);
var controllers = {};
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var countriesNotSorted = ['Ukraine', 'Urugvai', 'Russia', 'Romania', 'Belgium', 'Algeria', 'Rome', 'Argentina', 'Britain', 'Indonesia', 'Germany', 'Brazil', 'Portugal', 'Polska', 'Uganda', 'Bolivia', 'Andorra'],
    countriesArray = countriesNotSorted.sort();

app.directive('searchList', function() {
    return {
        scope: {
            searchModel: '=model'
        },
        link: function(scope, element, attrs) {
            element.on('click', attrs.searchList, function() {
                scope.searchModel = $(this).text();
                scope.$apply();
            });
        }
    };
});

controllers.MainController = function($scope) {
    $scope.setTerm = function(letter) {
        $scope.search = letter;
    };
    $scope.alphabet = {
        letter: alphabet
    }

    $scope.countries = {
        country: countriesArray
    }
    $scope.startsWith = function(actual, expected) {
        var lowerStr = (actual + "").toLowerCase();
        return lowerStr.indexOf(expected.toLowerCase()) === 0;
    }
};



app.controller(controllers);