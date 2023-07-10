import SimpleSchema from "simpl-schema";
import NewsUtil from "../../../../lib/utils/news-util/server/news-util";

new ValidatedMethod({
  name: "news.list",
  validate: new SimpleSchema({
    language: String,
    category: String,
    pageNumber: Number,
    itemAmount: Number,
  }).validator(),
  run: function (data) {
    this.unblock();
    const { language, category, pageNumber, itemAmount } = data;
    // const language = data.language
    // const category = data.category

    let news = NewsUtil.api.getNews(language, category).result;
    console.log("haberler alındı");
    //pageNumber sayfa numarası
    //itemAmount sayfadaki haber sayısı (2)

    let result = {
      data: null,
      totalDataAmount: news.length,
    };

    result.data = news.slice(
      (pageNumber - 1) * itemAmount,
      pageNumber * itemAmount
    );

    return result;
  },
});
