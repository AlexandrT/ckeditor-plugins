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
					['Создать новый перевод']
				],
				setup: function(element) {
					var select = this.getInputElement();
					console.log(select.$);
					var element_id = '#' + this.getInputElement().$.id;

					// CKEDITOR.ajax.load(url + '', function(data) {
						var data = '{"permalink":"key1", "lang_ru":"Меня зовут Борис", "lang_en":"My nam Boris"}';
						var items = JSON.parse(data);

						for(var item in items) {
							console.log(item + ": " + items[item]);
							select.appendHtml("<option>" + items[item] + "</option>");
						};
					// })
				}
			},
			{
				id: 'val',
				type: 'text',
				html: '<input type="text"/>'
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