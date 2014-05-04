module.exports = function(grunt) {
	grunt.initConfig({
		vendor: grunt.file.readJSON('.bowerrc'),

		shell: {
			move_dir: {
				command: "cp -f 'i18n' <%= vendor.directory %>/ckeditor/plugins",
				stdout: true,
				stderr: true,
			}
		}
	});

	grunt.loadNpmTasks('grunt-shell');
	grunt.registerTask('default', ['shell']);
}