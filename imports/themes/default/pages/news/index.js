import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import { Loading } from "notiflix/build/notiflix-loading-aio";

import "./index.html";
import "./style.scss";

Template.pagesNews.onCreated(function () {
  this.state = new ReactiveDict(null, {
    news: [],
    refreshTokenNews: Random.id(),
    currentCategory: FlowRouter.getQueryParam("category") || "general",
  });
  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    itemAmount: 2,
    totalDataAmount: 0,
  });
  console.log("onCreated");
});

Template.pagesNews.onRendered(function () {
  const self = this;
  console.log("onRendered");

  this.autorun(function () {
    console.log("autorun");

    self.state.get("refreshTokenNews");

    const pageNumber = self.pagination.get("currentPage");
    const itemAmount = self.pagination.get("itemAmount");

    console.log(pageNumber);
    const obj = {
      language: "tr",
      category: self.state.get("currentCategory"),
      pageNumber,
      itemAmount,
    };

    Loading.dots();
    Meteor.call("news.list", obj, function (error, result) {
      Loading.remove();

      if (error) {
        console.log("error", error);
        return;
      }

      self.state.set("news", result.data);
      self.pagination.set("currentPage", pageNumber);

      self.pagination.set("totalDataAmount", result.totalDataAmount);
    });
  });
});

Template.pagesNews.events({
  "click #refreshNews"(event, template) {
    template.state.set("refreshTokenNews", Random.id());
  },

  "click .news-category-button"(event, template) {
    event.preventDefault();
    const category = event.target.id;

    template.state.set("currentCategory", category);

    template.pagination.set("currentPage", 1);
    FlowRouter.setQueryParams({ category: category, page: 1 });
    console.log(category);
  },
});
