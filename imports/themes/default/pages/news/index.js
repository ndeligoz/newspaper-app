

import { Loading } from 'notiflix/build/notiflix-loading-aio';
import './index.html'
import './style.scss'



Template.pagesNews.onCreated(function () {

  this.state = new ReactiveDict(null, {
    news: [],
    refreshTokenNews: Random.id(),
    currentCategory: 'general',

  });



});


Template.pagesNews.onRendered(function () {
  const self = this;



  console.log("onRendered");

  this.autorun(function () {
    console.log("autorun");

    const obj = {
      language: 'tr',
      category: self.state.get('currentCategory'),

    }

    self.state.get('refreshTokenNews', Random.id());
    console.log(self.state.get('refreshTokenNews', Random.id()));

    Loading.dots();
    Meteor.call('news.list', obj, function (error, result) {
      Loading.remove();
      if (error) {
        console.log('error', error);
        return
      }

      console.log(result);
      self.state.set('news', result.result)
      console.log(self.state.get('news'))
    });



  });


})


Template.pagesNews.events({
  'click #refreshNews': function (event, template) {
    template.state.set('refreshTokenNews', Random.id());
  },

  'click .news-category-button': function (event, template) {
    event.preventDefault();
    const category = event.target.id;



    const _obj = {
      language: 'tr',
      category: category,

    };

    Loading.circle();
    Meteor.call('news.list', _obj, function (error, result) {
      Loading.remove();


      template.state.set('news', result.result);

      template.state.set('currentCategory', category);
    });
  }
});



