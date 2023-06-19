

Template.registerHelper('newsData', function () {
    return Template.instance().state.get('news');
});