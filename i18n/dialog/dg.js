CKEDITOR.dialog.add("i18n", function(e) {
  tabElements = [{
		id: 'format',
		type: 'select',
		label: 'Format',
		accessKey: 'T',
		items: [
			[CKEDITOR.instances.editor1.lang.i18n.select, "service_value"]
		],
		'default': CKEDITOR.instances.editor1.lang.i18n.select,
		setup: function(element) {
			var select = this.getInputElement();

			select.on('change', function(){ 
				var data = window.amigo.data;
				if (this.getValue() === "service_value")
				{
					$.each(usingLanguages, function(key, item){
						dialog.getContentElement('info', item).setValue("");
					});
				} else {
					for (var n = 0; n < data.length; n++)
					{
						if (data[n]['permalink'] === this.getValue())
						{
							for (item in data[n])
							{
								if (/lang.*/.test(item))
								{
									dialog.getContentElement('info', item).setValue(data[n][item]);
									dialog.getContentElement('info', item).setInitValue();
								}
							}
							break;
						}
					}
				}
			});

			var dialog = this.getDialog();

			var currentLocale = CKEDITOR.instances.editor1.config.currentLocale; // "lang_ru"
			var usingLanguages = CKEDITOR.instances.editor1.config.usingLanguages;  // ["lang_ru", "lang_en"]

			// CKEDITOR.ajax.load(url + '', function(data) {
				var data = [ {"permalink":"key1", "lang_ru":"Борис", "lang_en":"Boris"}, {"permalink":"key2", "lang_ru":"амиго", "lang_en":"amigo"} ];
				window.amigo = {};
				window.amigo.data = data;
				for (var i=0; i < data.length; i++)
				{
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
			label: usingLanguages[k],
			setup: function(element) {
				var select = dialog.getContentElement('info', 'format');

				this.on('change', function() {
					if (this.isChanged()) {
						if (select.getValue() === "service_value")
						{
							$('#' + dialog.getContentElement('info', 'status').domId)[0].innerText = CKEDITOR.instances.editor1.lang.i18n.status_create;
						} else {
							$('#' + dialog.getContentElement('info', 'status').domId)[0].innerText = CKEDITOR.instances.editor1.lang.i18n.status_change;
						}
					}
				});
			}
		});
	}

	tabElements.push({
		type: 'html',
		id: 'status',
		html: CKEDITOR.instances.editor1.lang.i18n.status_default
	});

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
			label: CKEDITOR.instances.editor1.lang.i18n.okBtn,
			onClick: function() {
				addSmth();
			}
		},
		CKEDITOR.dialog.cancelButton],
	};

	function addSmth() {
		
		
		var currentLocale = CKEDITOR.instances.editor1.config.currentLocale;
		var usingLanguages = CKEDITOR.instances.editor1.config.usingLanguages;
		
		var v = $("select").val();  //key2
		
		var  req = {};
		req["locale"] = {};

		$.each(usingLanguages, function(key, item){

			var textarea = dialog.getContentElement('info', item);

			if (textarea.getValue() !== "")
			{
				if (textarea.isChanged())
				{
					fillTranslate(req, usingLanguages);
					var destUrl = "";
					// if (select.getValue() === "service_value")
					// {
					// 	destUrl = "http://meatkings.ru/sites/123/locales/locales";
					// } else {
					// 	destUrl = "http://meatkings.ru/sites/123/locales/locale." + v;
					// }

					// CKEDITOR.ajax.load(url + '', function(data) {

						var t = dialog.getContentElement('info', currentLocale).getValue();
						CKEDITOR.instances.editor1.insertText('<t permalink="' + v + '">' + t + '</t>\n');  // t надо брать из textarea
						// sent requesst (edit or create)
						/*var request = $.ajax({
							url: destUrl
						});*/
						CKEDITOR.dialog.getCurrent().hide();
						console.log(req);
						dialog.getContentElement('info', 'status').setValue(CKEDITOR.instances.editor1.lang.i18n.status_default);
					// });
					return false;
				// } else {
					// CKEDITOR.dialog.getCurrent().hide();
				}
				
			} else {
				alert(CKEDITOR.instances.editor1.lang.i18n.empty_txt);
				return false;
			}
		});
	};

	function fillTranslate(req, usingLanguages) {
		$.each(usingLanguages, function(key, item){
			req["locale"][item] = dialog.getContentElement('info', item).getValue();
		});
	}
});