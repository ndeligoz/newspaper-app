import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
    name: 'pages.news',
    action(params, queryParams) {
        this.render('LayoutDefault', { page: 'pagesNews' });
    }
});



FlowRouter.route('/new-detail', {
    name: 'pages.detail',
    action(params, queryParams) {
        this.render('LayoutDefault', { page: 'pagesDetail' });
    }
});