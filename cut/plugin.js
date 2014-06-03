CKEDITOR.plugins.add( 'cut',
{
  init: function( editor )
  {
    CKEDITOR.addCss("cut {display:block; height: 2px;width: 100%;background: #DDDD99;margin-bottom: 1em;}");
	  CKEDITOR.dtd['cut']={};
	  CKEDITOR.dtd.$empty['cut']=1;
	  CKEDITOR.dtd.$nonEditable['cut']=1;
	  CKEDITOR.dtd.$object['cut']=1;
    editor.addCommand( 'insertCutTag',
    {
      exec: function( editor )
      {
        var element = CKEDITOR.dom.element.createFromHtml( '<cut />' );
        editor.insertElement( element );
      }
    });

    editor.ui.addButton( 'cut',
    {
      label: 'Вставить кат',
      command: 'insertCutTag',
      icon: this.path + 'favicon.ico'
    } );
  }
});