'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('hashtagger',['$filter',
      function($filter) {
          return function(text) {
              if (!text) return text;

              // replace #hashtags and send them to twitter
              var replacePattern1 = /(^|\s)#(\w*[a-zA-ZА-Яа-яґіїєё'_]+\w*)/gim;
              var replacedText = text.replace(replacePattern1, '$1<a href="#/#$2">#$2</a>');

              // replace @mentions but keep them to our site
              var replacePattern2 = /(^|\s)\@(\w*[a-zA-ZА-Яа-яґіїєё'_]+\w*)/gim;
              replacedText = replacedText.replace(replacePattern2, '$1<a href="#/@$2">@$2</a>');

              return replacedText;
          };

      }
  ]);
