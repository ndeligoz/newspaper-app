

Template.registerHelper('getEditorPicks', function (start, end) {
    return Template.instance().state.get('editorPicks').slice(start, end);
});