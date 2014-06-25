// ( function() {
//   var horizontalruleCmd = {
//     canUndo: false, // The undo snapshot will be handled by 'insertElement'.
//     exec: function( editor ) {
//       var cut = editor.document.createElement( 'cut' );
//       editor.insertElement( cut );
//     },

//     allowedContent: 'cut',
//     requiredContent: 'cut'
//   };

//   var pluginName = 'cut';

//   // Register a plugin named "cut".
//   CKEDITOR.plugins.add( pluginName, {
//     hidpi: true, // %REMOVE_LINE_CORE%
//     init: function( editor ) {
//       if ( editor.blockless )
//         return;

//       editor.addCommand( pluginName, horizontalruleCmd );
//       editor.ui.addButton && editor.ui.addButton( 'cut', {
//         label: "cut",
//         command: pluginName
//       } );
//     }
//   } );
// } )();




CKEDITOR.plugins.add( 'cut',
{
  hidpi: true, // %REMOVE_LINE_CORE%
  init: function( editor )
  {
    if ( editor.blockless )
      return;

    CKEDITOR.addCss("cut {display:block; height: 2px;width: 100%;background: #DDDD99;margin-bottom: 1em;}");
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