

import './index.html'
import './style.scss'





Template.pagesDetail.onCreated(function () {

    this.state = new ReactiveDict(null, {
        news: [],

    });

    console.log("onCreated");

});



Template.pagesDetail.onRendered(function () {
    const self = this;

    console.log("onRendered");

    this.autorun(function () {


        console.log("autorun");

        const obj = {
            country: 'tr',
            tag: 'general'
        }


        Meteor.call('news.list', obj, function (error, result) {

            if (error) {

                return
            }

            console.log(result.result);
            self.state.set('news', result.result)
            console.log(self.state.get('news'))
        });


    });
});


