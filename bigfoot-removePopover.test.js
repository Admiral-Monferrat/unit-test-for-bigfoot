const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Bigfoot Plugin Options", () => {
  test("Bigfoot is able to remove popovers", () => {
    const options = {
      actionOriginalFN: "hide",
      useFootnoteOnlyOnce: true,
    };

    const removePopovers = () => $.bigfoot(options).removePopovers();

    expect(removePopovers).not.toThrow();
  });
});
