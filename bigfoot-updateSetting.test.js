const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Bigfoot Plugin Options", () => {
  test("Bigfoot is able to update its settings", () => {
    const options = {
      actionOriginalFN: "hide",
      useFootnoteOnlyOnce: true,
    };

    const update = () =>
      $.bigfoot(options).updateSetting("useFootnoteOnlyOnce", false);

    expect(update).not.toThrow();
  });
});
