CKEDITOR.plugins.add('i18n',
{
	requires: ['dialog'],
	lang: 'en, ru',
	init: function(a) {
		var b = "i18n";
		var c = a.addCommand(b, new CKEDITOR.dialogCommand(b));
		c.modes = {wysiwyg: 1, source: 1};

		a.ui.addButton("i18n",
		{
			label: 'Show lang',
			command: b,
			icon: this.path + "favicon.ico"
		});

		CKEDITOR.dialog.add(b, this.path + "dialog/dg.js");
	}
})