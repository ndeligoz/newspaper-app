import SimpleSchema from 'simpl-schema'
import NewsUtil from '../../../lib/utils/news-util/server/news-util'

new ValidatedMethod({
    name: 'news.list',
    validate: new SimpleSchema({
        country: String,
        tag: String,
    }).validator(),
    run: function (data) {
        this.unblock()
        const { country, tag } = data




        return NewsUtil.api.getNews(country, tag)

    },
})