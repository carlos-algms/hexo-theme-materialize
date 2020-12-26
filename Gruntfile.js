const loadGruntTasks = require('load-grunt-tasks');

module.exports = (grunt) => {
  grunt.initConfig({
    copy: {
      fontawesome: {
        expand: true,
        cwd: 'node_modules/font-awesome/fonts/',
        src: ['**'],
        dest: 'source/fonts/',
      },
      materialize: {
        expand: true,
        cwd: 'node_modules/materialize-css/dist/',
        src: ['font/**'],
        dest: 'source/',
      },
      lightbox: {
        expand: true,
        cwd: 'node_modules/lightbox2/dist/',
        src: ['images/**'],
        dest: 'source/',
      },
    },

    clean: {
      fontawesome: ['source/css/fonts'],
      materialize: ['source/font'],
      jsCompiled: ['source/js'],
    },

    terser: {
      options: {
        mangle: false,
        ecma: 2018,
        sourceMap: false,
      },
      vendors: {
        files: {
          '.tmp/vendors.min.js': [
            'node_modules/jquery-circle-progress/dist/circle-progress.js',
            'node_modules/requirejs/require.js',
          ],
        },
      },
      jsSources: {
        expand: true,
        src: ['source/js/**/*.js'],
        dest: './',
      },
    },

    concat: {
      scripts: {
        dest: 'source/js/vendors.js',
        src: [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/materialize-css/dist/js/materialize.min.js',
          '.tmp/vendors.min.js',
        ],
      },
    },

    cssmin: {
      options: {},
      target: {
        files: {
          'source/css/vendors.css': [
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/materialize-css/dist/css/materialize.css',
            'node_modules/lightbox2/dist/css/lightbox.css',
          ],
        },
      },
    },

    requirejs: {
      all: {
        options: {
          waitSeconds: 0,
          appDir: 'src/scripts',
          mainConfigFile: 'src/scripts/app.js',
          baseUrl: '.',
          optimize: 'none',
          dir: 'source/js',
          generateSourceMaps: false,
          preserveLicenseComments: true,
          inlineText: true,
          findNestedDependencies: true,
          paths: {
            jquery: 'empty:',
            // lightbox need to be here, because it cant find images if placed on head
            lightbox: '../../node_modules/lightbox2/dist/js/lightbox',
          },
          modules: [
            {
              name: 'app',
            },
          ],
          shim: {},
          writeBuildTxt: false,
        },
      },
    },
  });

  loadGruntTasks(grunt);

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'cssmin', 'requirejs', 'terser', 'concat']);
};
