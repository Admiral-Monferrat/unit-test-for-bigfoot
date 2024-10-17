const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Tests Bigfoot's Handling of Click", () => {
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

  // TEST for touchClick
  test("Function [touchClick] creates active/inactive popovers when clicked", async () => {
    const $ftbutton = $('[data-footnote-identifier="1"]');

    $ftbutton.trigger("click");
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect($ftbutton.hasClass("is-active")).toBe(true);

    $ftbutton.trigger("click");
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect($ftbutton.hasClass("is-active")).toBe(false);
  });
});
