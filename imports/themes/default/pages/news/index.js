
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import './index.html'
import './style.scss'



Template.pagesNews.onCreated(function () {

  this.state = new ReactiveDict(null, {
    news: [],
    refreshTokenNews: Random.id()
  });
  this.tags = [
    { key: 'general', title: 'Genel' },
    { key: 'sport', title: 'Spor' },
    { key: 'economy', title: 'Ekonomi' },
    { key: 'technology', title: 'Teknoloji' },
  ],


    console.log("onCreated");


});



Template.pagesNews.onRendered(function () {
  const self = this;

  console.log("onRendered");

  this.autorun(function () {
    self.state.get('refreshTokenNews')

    console.log("autorun");

    const obj = {
      country: 'tr',
      tag: 'general'
    }

    Loading.dots();
    Meteor.call('news.list', obj, function (error, result) {
      Loading.remove();
      if (error) {

        return
      }

      console.log(result);
      self.state.set('news', result.result)
      console.log(self.state.get('news'))
    });








  });

});



Template.pagesNews.events({
  'click #refreshNews': function (event, template) {
    template.state.set('refreshTokenNews', Random.id());
  },
  'click a': function (event, template) {
    const tag = event.currentTarget.id;
    template.state.set('tag', tag);


    const obj = {
      country: 'tr',
      tag: tag
    };

    Loading.circle();
    Meteor.call('news.list', obj, function (error, result) {
      Loading.remove();


      template.state.set('news', result.result);
    });
  }
});
