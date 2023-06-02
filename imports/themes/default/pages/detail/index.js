import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './index.html'
import './style.scss'





Template.pagesDetail.onCreated(function () {
    this.relatedTopics = new ReactiveVar([]);

    fetch('https://api.collectapi.com/news/getNews?country=tr&tag=general', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'apikey 577q4nxMUU6A7fsIK3l91H:1ibTCURaZzcyr8FKZwh0u3'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const relatedTopics = data.result.slice(0, 5)

            this.relatedTopics.set(relatedTopics);



        })
        .catch(error => {
            console.error('Veri çekme hatası:', error);
        });
});


Template.pagesDetail.helpers({
    relatedTopics() {
        return Template.instance().relatedTopics.get().slice();
    },

});
