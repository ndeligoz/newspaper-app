import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
    name: 'pages.home',
    action(params, queryParams) {
        this.render('LayoutDefault', { page: 'pagesHome' });
    }
});