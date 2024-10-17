const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Tests Bigfoot's Initialization", () => {
  beforeEach(async () => {
    document.body.innerHTML = `
        <a href="#footnote1" id="fn1" rel="footnote">1</a>
        <a href="#footnote2" id="fn2" rel="footnote">2</a>
        <ol>
          <li id="footnote1">This is footnote 1</li>
          <li id="footnote2">This is footnote 2</li>
        </ol>
      `;
    $.bigfoot();
    await new Promise((resolve) => setTimeout(resolve, 150));
  });

  // TEST for footnoteInit
  test("Function [footnoteInit] initializes footnotes", () => {
    // Length should be 2 since we have two footnotes
    const bgft_len = $(".bigfoot-footnote__button").length;
    expect(bgft_len).toBe(2);

    // Get the first footnote number
    const bgft_num = $(".bigfoot-footnote__button").first().attr("data-footnote-number");
    expect(bgft_num).toBe("1");
  });

});
