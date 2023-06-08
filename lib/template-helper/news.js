

Template.registerHelper('newsData', function (start, end) {
    return Template.instance().state.get('news').slice(start, end);
});