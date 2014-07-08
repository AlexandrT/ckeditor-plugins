CKEDITOR.plugins.add( 'cut',
{
  hidpi: true,
  init: function( editor )
  {
    if ( editor.blockless )
      return;

    CKEDITOR.addCss("hr#cut {display:block; height: 2px;width: 100%;background: #DDDD99;margin-bottom: 1em;}");
    editor.addCommand( 'insertCutTag',
    {
      canUndo: false,
      exec: function( editor )
      {
        var element = editor.document.createElement( 'hr' );
        element.setAttribute('id', 'cut');
        editor.insertElement( element );
      },

      allowedContent: 'hr[id]',
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
