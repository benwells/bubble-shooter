module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Concatentaes all JS files found in the game directory into a
     * single game.js file
     */
    concat: {
      options: {
        // separator: ';',
      },
      dist: {
        src: [
          "./public/js/game/ObjectBase.js",
          "./public/js/game/Settings.js",
          "./public/js/game/Player.js",
          "./public/js/game/Bullet.js",
          "./public/js/game/Explosion.js",
          "./public/js/game/Enemy.js",
          "./public/js/game/Message.js",
          "./public/js/game/Score.js",
          "./public/js/game/Particle.js",
          "./public/js/game/Background.js",
          "./public/js/game/main.js"
        ],
        dest: './public/js/game.js',
      }
    }
  });

  //plugins
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat']);
};
