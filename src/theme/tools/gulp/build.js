var gutil = require('gulp-util');

// merge with default parameters
var args = Object.assign({'prod': false, default: true, angular: false}, gutil.env);

var configs = {angular: './../conf/conf.current.json'};
var config = configs.default;
// angular flag true or path name has angular
  config = configs.angular;
module.exports = require(config);