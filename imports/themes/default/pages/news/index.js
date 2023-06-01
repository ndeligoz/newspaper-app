import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './index.html'
import './style.scss'





Template.pagesNews.onCreated(function () {
    this.newsData = new ReactiveVar([]);
    this.news_Editor = new ReactiveVar([]);
    fetch('https://api.collectapi.com/news/getNews?country=tr&tag=general', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'apikey 577q4nxMUU6A7fsIK3l91H:1ibTCURaZzcyr8FKZwh0u3'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const news = data.result.slice(0, 4);
            const news_data = data.result.slice(4, 6);
            this.newsData.set(news);
            this.news_Editor.set(news_data);
        })
        .catch(error => {
            console.error('Veri çekme hatası:', error);
        });
});


Template.pagesNews.helpers({
    newsData() {
        return Template.instance().newsData.get();

    },
    news_Editor() {
        return Template.instance().news_Editor.get();

    }
});
