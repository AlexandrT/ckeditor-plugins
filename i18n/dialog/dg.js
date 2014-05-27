CKEDITOR.dialog.add("i18n", function(e) {
	console.log(CKEDITOR.instances.editor1.lang.i18n.select);
  tabElements = [{
		id: 'format',
		type: 'select',
		label: 'Format',
		accessKey: 'T',
		items: [
			'CKEDITOR.instances.editor1.lang.i18n.select'
		],
		setup: function(element) {
			var select = this.getInputElement();

			select.on('change', function(){ 
				var data = window.amigo.data;
				for (var n = 0; n < data.length; n++)
				{
					if (data[n]['permalink'] === this.getValue())
					{
						for (item in data[n])
						{
							if (/lang.*/.test(item))
							{
								console.log(data[n][item]);
								dialog.getContentElement('info', item).setValue(data[n][item]);
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

			// CKEDITOR.ajax.load(url + '', function(data) {
				var data = [ {"permalink":"key1", "lang_ru":"Борис", "lang_en":"Boris"}, {"permalink":"key2", "lang_ru":"амиго", "lang_en":"amigo"} ];
				window.amigo = {};
				window.amigo.data = data;
				for (var i=0; i < data.length; i++)
				{
					console.log(data[i]);
					// var items = JSON.parse(data[i]);
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
	}

	return {
		title: CKEDITOR.instances.editor1.lang.i18n.title,
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
		var usingLanguages = CKEDITOR.instances.editor1.config.usingLanguages;
		
		var t = $("select option:selected").text(); // амиго
		var v = $("select").val();  //key2
		
		var  req = {};
		req["locale"] = {};
		$.each(usingLanguages, function(key, item){

			var textarea = dialog.getContentElement('info', item);

			if (textarea.getValue() === "")
			{
				if (textarea.isChanged())
				{
					alert("не все переводы заполнены");
					return false;
				}
				
				req["locale"][item] = dialog.getContentElement('info', item).getValue();
			}
		});


		CKEDITOR.instances.editor1.insertText('<t permalink="' + v + '">' + t + '</t>\n');  // <t permalink="key1">Меня зовут Борис</t>
		CKEDITOR.dialog.getCurrent().hide();
		return false;
	};
});