
import SimpleSchema from 'simpl-schema'
import NewsUtil from '../../../../lib/utils/news-util/server/news-util'

new ValidatedMethod({
  name: 'editorPicks.list',
  validate: new SimpleSchema({
    language: String,
    category: String,
  }).validator(),
  run: function (data) {
    this.unblock()
    const { language, category } = data



    return NewsUtil.api.getNews(language, category)
  },
})