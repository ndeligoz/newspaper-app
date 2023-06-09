
import SimpleSchema from 'simpl-schema'
import NewsUtil from '../../../lib/utils/news-util/server/news-util'

new ValidatedMethod({
    name: 'news.list',
    validate: new SimpleSchema({
        language: String, // haberlerin dili
        category: String, // haber kategorisi


    }).validator(),
    run: function (data) {
        this.unblock()
        const { language, category } = data
        // const language = data.language
        // const category = data.category


        return NewsUtil.api.getNews(language, category)
    },
})





