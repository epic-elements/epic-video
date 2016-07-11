'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var EpicVideo = function () {
    function EpicVideo() {
      _classCallCheck(this, EpicVideo);
    }

    _createClass(EpicVideo, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'epic-video';
        this.properties = {
          src: {
            type: String,
            notify: true,
            value: ''
          },
          width: {
            type: String,
            notify: true,
            value: '',
            observer: '_widthChanged'
          },
          computedWidth: {
            type: String,
            notify: true
          },
          height: {
            type: String,
            notify: true,
            value: 'auto'
          },
          ratio: {
            type: String,
            notify: true,
            value: '16:9'
          },
          thumbnail: {
            type: String,
            notify: true,
            value: ''
          },
          parsedSrc: {
            type: Object,
            notify: true,
            readOnly: true,
            computed: '_computeParsedSrc(src)',
            observer: '_parsedSrcChanged'
          },
          queryParams: {
            type: Object,
            notify: true,
            readOnly: true,
            computed: '_computeQueryParams(parsedSrc.search)',
            observer: '_queryParamsChanged'
          },
          isYoutubeHosted: {
            type: Boolean,
            notify: true,
            readOnly: true,
            computed: '_computeIsYoutube(parsedSrc.hostname)',
            observer: '_isYoutubeHostedChanged'
          },
          isYoutubeSrc: {
            type: Boolean,
            notify: true,
            readOnly: true,
            computed: '_computeIsYoutubeSrc(isYoutubeHosted, queryParams)',
            observer: '_isYoutubeSrcChanged'
          },
          isYoutubeEmbedSrc: {
            type: Boolean,
            notify: true,
            readOnly: true,
            computed: '_computeIsYoutubeEmbedSrc(isYoutubeHosted, parsedSrc.pathname)',
            observer: '_isYoutubeEmbedSrcChanged'
          },
          youtubeId: {
            type: String,
            notify: true,
            readOnly: true,
            computed: '_computeYoutubeId(isYoutubeHosted, isYoutubeEmbedSrc, isYoutubeSrc, parsedSrc.pathname, queryParams)',
            observer: '_isYoutubeIdChanged'
          },
          youtubeSrc: {
            type: String,
            notify: true,
            readOnly: true,
            computed: '_computeYoutubeSrc(isYoutubeHosted, isYoutubeSrc, src, youtubeId)'
          },
          youtubeEmbedSrc: {
            type: String,
            notify: true,
            readOnly: true,
            computed: '_computeYoutubeEmbedSrc(isYoutubeHosted, isYoutubeEmbedSrc, src, youtubeId)'
          },
          youtubeVideoThumbailSrc: {
            type: String,
            notify: true,
            readOnly: true,
            computed: '_computeYoutubeVideoThumbailSrc(isYoutubeHosted, youtubeId)'
          },
          videoSrc: {
            type: String,
            notify: true,
            readOnly: true,
            computed: '_computeVideoSrc(src, youtubeEmbedSrc)'
          },
          thumbnailSrc: {
            type: String,
            notify: true,
            readOnly: true,
            computed: '_computeThumbnailSrc(thumbnail, youtubeVideoThumbailSrc)'
          }

        };
        this.observers = ['_sizeOptionsChanged(height, ratio)'];
        this.listeners = {
          "iron-resize": "_handleWidthChange"
        };
      }
      // Define other lifecycle methods as you need.

    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {}
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'attributeChanged',
      value: function attributeChanged() {}
    }, {
      key: '_widthChanged',
      value: function _widthChanged(width) {
        if (width.includes('%')) {
          console.dir(this.parentElement);
          this.customStyle['--epic-video-width'] = this.parentElement.offsetWidth * (width.replace('%', '') / 100) + 'px';
        } else {
          this.customStyle['--epic-video-width'] = width.replace('px', '') + 'px';
        }
        this.updateStyles();
      }
    }, {
      key: '_handleWidthChange',
      value: function _handleWidthChange() {
        this.customStyle['--epic-video-width'] = this.offsetWidth + 'px';
        this.updateStyles();
      }
    }, {
      key: '_sizeOptionsChanged',
      value: function _sizeOptionsChanged(height, ratio) {
        if (ratio) {
          this.customStyle['--epic-video-height'] = 'calc(var(--epic-video-width)*(' + ratio.split(':')[1] + '/' + ratio.split(':')[0] + '))';
        } else {
          this.customStyle['--epic-video-height'] = height;
        }
        this.updateStyles();
      }
    }, {
      key: '_computeParsedSrc',
      value: function _computeParsedSrc(videoSrc) {
        var link = this.root.ownerDocument.createElement('a');
        link.href = videoSrc;
        return link;
      }
    }, {
      key: '_computeQueryParams',
      value: function _computeQueryParams(queryString) {

        if (!queryString) {
          return {};
        } else {
          return queryString.split(/\?|&/).reduce(function (result, item) {
            if (!item || !item.includes('=')) {
              return result;
            }
            return Object.defineProperty(result, item.split('=')[0], {
              value: item.split('=')[1],
              enumerable: true
            });
          }, {});
        }
      }
    }, {
      key: '_computeHost',
      value: function _computeHost(hostname) {
        return hostname;
      }
    }, {
      key: '_computeIsYoutube',
      value: function _computeIsYoutube(host) {
        return host.includes('youtube.com');
      }
    }, {
      key: '_computeIsYoutubeEmbedSrc',
      value: function _computeIsYoutubeEmbedSrc(isYoutube, pathname) {
        if (!isYoutube || !pathname) {
          return false;
        }

        return pathname.includes('embed');
      }
    }, {
      key: '_computeIsYoutubeSrc',
      value: function _computeIsYoutubeSrc(isYoutube, params) {

        if (!isYoutube || !params || Object.keys(params).length < 1) {
          return false;
        }

        return 'v' in params;
      }
    }, {
      key: '_computeYoutubeId',
      value: function _computeYoutubeId(isYoutube, isYoutubeEmbedSrc, isYoutubeSrc, path, params) {
        if (!isYoutube || !isYoutubeEmbedSrc && !isYoutubeSrc || !path && !params) {
          return '';
        }

        if (isYoutubeEmbedSrc && path && path.includes('embed')) {
          return path.split['/'].filter(function (pathPart) {
            return pathPart && !parthPart.includes('embed');
          })[0];
        }
        if (isYoutubeSrc && params && params.v) {
          return params.v;
        }

        return '';
      }
    }, {
      key: '_computeYoutubeEmbedSrc',
      value: function _computeYoutubeEmbedSrc(isYoutubeHosted, isYoutubeEmbedSrc, src, youtubeId) {
        if (!isYoutubeHosted || !youtubeId) {
          return '';
        }
        if (isYoutubeEmbedSrc && src) {
          return src;
        }
        return 'https://www.youtube.com/embed/' + youtubeId;
      }
    }, {
      key: '_computeYoutubeSrc',
      value: function _computeYoutubeSrc(isYoutubeHosted, isYoutubeSrc, src, youtubeId) {
        if (!isYoutubeHosted || !youtubeId) {
          return '';
        }
        if (isYoutubeSrc && src) {
          return src;
        }
        return 'https://www.youtube.com/watch?v=' + youtubeId;
      }
    }, {
      key: '_computeVideoSrc',
      value: function _computeVideoSrc(src, youtubeEmbedSrc) {
        return youtubeEmbedSrc || src;
      }
    }, {
      key: '_computeYoutubeVideoThumbailSrc',
      value: function _computeYoutubeVideoThumbailSrc(isYoutubeHosted, youtubeId) {
        if (!isYoutubeHosted || !youtubeId) {
          return '';
        }
        return '//img.youtube.com/vi/' + youtubeId + '/hqdefault.jpg';
      }
    }, {
      key: '_computeThumbnailSrc',
      value: function _computeThumbnailSrc(thumbnail, youtubeVideoThumbailSrc) {
        return youtubeVideoThumbailSrc || thumbnail || '';
      }
    }, {
      key: 'behaviors',

      // Define behaviors with a getter.
      get: function get() {
        return [Polymer.IronResizableBehavior];
      }
    }]);

    return EpicVideo;
  }();
  // Register the element using Polymer's constructor.


  Polymer(EpicVideo);
})();