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
  });

  loadGruntTasks(grunt);

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'cssmin']);
};
