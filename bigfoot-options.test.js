const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Bigfoot Plugin Options", () => {
  test("Bigfoot initializes with custom options", () => {
    const options = {
      actionOriginalFN: "hide",
      useFootnoteOnlyOnce: true,
    };

    const initialize = () => $.bigfoot(options);

    expect(initialize).not.toThrow();
  });
});
