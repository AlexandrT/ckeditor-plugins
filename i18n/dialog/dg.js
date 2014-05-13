CKEDITOR.dialog.add("i18n", function(e) {
  tabElements = [{
		id: 'format',
		type: 'select',
		label: 'Format',
		accessKey: 'T',
		items: [
			['Создать новый перевод']
		],
		/*change: function() {
			var select = this.getInputElement();
			console.log(select.getValue());  // key1
			var data = window.amigo.data;
			for (hash in data)
			{
				if (hash['permalink'] === select.getValue())
				{
					console.log('find');
					// set hash['prefix + currentLocale'] to $("textarea[value=prefix + currentLocale]")
					var t = dialog.getValueOf('info', 'format'); // амиго
					break;
				}
			}
		}, */
		setup: function(element) {
			var select = this.getInputElement();

			select.on('change', function(){ 
				// var select = this.getInputElement();
				// console.log(this);  // key1
				var data = window.amigo.data;
				for (var n=0; n < data.length; n++)
				{
					// console.log(data[n]);  // {"permalink":"key1", "lang_ru":"Борис", "lang_en":"Boris"}
					// console.log(this.getValue());
					if (data[n]['permalink'] === this.getValue())
					{
						for (item in data[n])
						{
							if (/lang.*/.test(item))
							{
								console.log(data[n][item]);
								dialog.getContentElement('info', item).setValue(data[n][item]);
								// $(data[n]).setValue(data[n][item]);
							}
						}
						break;
					}
				}
			});

			var dialog = this.getDialog();
			console.log(dialog);

			var currentLocale = CKEDITOR.instances.editor1.config.currentLocale; // "lang_ru"
			var usingLanguages = CKEDITOR.instances.editor1.config.usingLanguages;  // ["lang_ru", "lang_en"]

			// var tab = dialog.definition.getContents("info");

			// CKEDITOR.ajax.load(url + '', function(data) {
				var data = [ {"permalink":"key1", "lang_ru":"Борис", "lang_en":"Boris"}, {"permalink":"key2", "lang_ru":"амиго", "lang_en":"amigo"} ];
				window.amigo = {};
				window.amigo.data = data;
				for (var i=0; i < data.length; i++)
				{
					console.log(data[i]);
					// var items = JSON.parse(data[i]);
					// console.log(items);

					select.appendHtml("<option value='" + data[i]['permalink'] + "'>" + data[i][currentLocale] + "</option>");
				};
			// }
		}
	}];

	var usingLanguages = CKEDITOR.instances.editor1.config.usingLanguages;
	for (k in usingLanguages) {
		tabElements.push({
			id: usingLanguages[k],
			type: 'textarea',
			html: '<textarea></textarea>',
			label: usingLanguages[k]
		});

		dialog.getContentElement('info', usingLanguages[k]).on('change', function() {
			
		});
	}

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
			elements: tabElements
		}],

		buttons: [
		{
			type: 'button',
			id: 'okBtn',
			label: 'ok',
			onClick: function() {
				addSmth();
			}
		},
		CKEDITOR.dialog.cancelButton],
	};

	function addSmth() {
		var currentLocale = CKEDITOR.instances.editor1.config.currentLocale;

		var t = dialog.getValueOf('info', 'format'); // амиго
		var v = dialog.getInputElement('info', 'format');
		if(t.length == 0) {
			alert('You are wrong!');
			return false;
		}

		CKEDITOR.instances.editor1.insertHtml('<t permalink="' + v + '">' + t + "</t><br>");  // <t permalink="key1">Меня зовут Борис</t>
		return false;
	};
});