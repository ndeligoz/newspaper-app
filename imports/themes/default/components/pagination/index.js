Template.componentPagination.onCreated(function () {
  this.state = new ReactiveDict(null, {
    pages: [],
    pageCount: 0,
  });
});

Template.componentPagination.onRendered(function () {
  const self = this;

  this.autorun(function () {
    const totalCount = self.data.paginationState.get("totalDataAmount");
    const itemAmount = self.data.paginationState.get("itemAmount");

    const pageCount = totalCount / itemAmount;
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
      pages.push({ value: i + 1, text: i + 1 });
    }

    self.state.set("pages", pages);
    self.state.set("pageCount", pageCount);
  });
});

Template.componentPagination.events({
  "click .brd-previous": function (event, template) {
    event.preventDefault();
    let currentPage = template.data.paginationState.get("currentPage");

    if (currentPage > 1) {
      currentPage = currentPage - 1;
    }

    template.data.paginationState.set("currentPage", currentPage);
  },

  "click .brd-next": function (event, template) {
    event.preventDefault();
    let currentPage = template.data.paginationState.get("currentPage");
    const pages = template.state.get("pages");

    if (currentPage < pages[pages.length - 1].value) {
      currentPage = parseInt(currentPage) + 1;
    }

    template.data.paginationState.set("currentPage", currentPage);
  },

  "click .brd-page": function (event, template) {
    event.preventDefault();
    template.data.paginationState.set("currentPage", this.value);
  },

});
