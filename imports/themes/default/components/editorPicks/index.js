import "./index.html";
import "./style.scss";

Template.componentEditorPicks.onCreated(function () {
  this.state = new ReactiveDict(null, {
    editorPicks: [],
  });
});

Template.componentEditorPicks.onRendered(function () {
  const self = this;

  this.autorun(function () {
    const obj = {
      language: "tr",
      category: "general",
    };

    Meteor.call("editorPicks.list", obj, function (error, result) {
      if (error) {
        console.log("error", error);
        return;
      }

      self.state.set("editorPicks", result.result);

      console.log(result.result);
    });
  });
});
