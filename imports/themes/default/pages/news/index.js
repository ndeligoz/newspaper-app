import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './index.html'
import './style.scss'





Template.pagesNews.onCreated(function () {
    this.newsData = new ReactiveVar([]);

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
            this.newsData.set(news);
        })
        .catch(error => {
            console.error('Veri çekme hatası:', error);
        });
});


Template.pagesNews.helpers({
    newsData() {
        return Template.instance().newsData.get();
    }
});
