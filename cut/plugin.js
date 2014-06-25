CKEDITOR.plugins.add( 'cut',
{
  hidpi: true,
  init: function( editor )
  {
    if ( editor.blockless )
      return;

    CKEDITOR.addCss("hr.cut {display:block; height: 2px;width: 100%;background: #DDDD99;margin-bottom: 1em;}");
	  CKEDITOR.dtd['cut']={};
    CKEDITOR.dtd.$empty['cut']=1;
    CKEDITOR.dtd.$nonEditable['cut']=1;
	  CKEDITOR.dtd.$object['cut']=1;
    editor.addCommand( 'insertCutTag',
    {
      canUndo: false,
      exec: function( editor )
      {
        var element = editor.document.createElement( 'hr' );
        element.setAttribute('class', 'cut');
        editor.insertElement( element );
      },

      allowedContent: 'hr',
      requiredContent: 'hr'
    });

    editor.ui.addButton( 'cut',
    {
      label: 'Вставить кат',
      command: 'insertCutTag',
      icon: this.path + 'favicon.ico'
    } );
  }
});