CKEDITOR.dialog.add("i18n", function(e) {
	return {
		title: 'dialog',
		resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
		minWidth: 300,
		minHeight: 100,
		onShow: function() {
		},
		onLoad: function() {
			dialog = this;
			this.setupContent();
		},
		onOk: function() {
		},
		contents: [
		{
			id: "info",
			name: 'info',
			label: 'Tab',
			elements: [
			{
				id: 'format',
				type: 'select',
				label: 'Format',
				accessKey: 'T',
				items: [
					['1'],
					['2']
				]
			},
			{
				id: 'val',
				type: 'text',
				html: '<input type="text">Hello world</input>'
			}]
		}],
		buttons: [
		{
			type: 'button',
			id: 'okBtn',
			label: 'Го!',
			onClick: function() {
				addSmth();
			}
		}, CKEDITOR.dialog.cancelButton],
	};

	function addSmth() {
		var t = dialog.getValueOf('info', 'format');
		var v = dialog.getValueOf('info', 'val');
		if(t.length == 0) {
			alert('You are wrong!');
			return false;
		}

		var myEditor = CKEDITOR.instances.editor1;

		myEditor.insertHtml(t + ":" + v + "<br>");
		return false;
	};
});