const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Tests Bigfoot's Handling of Repositioning", () => {
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

  // TEST for repositionFeet
  test("Function [repositionFeet] repositions footnote when resized", async () => {
    
    // Click button (and wait)
    const $button = $('[data-footnote-identifier="1"]');
    $button.trigger("click");
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Popover should have been created when clicked
    const $popover = $(".bigfoot-footnote");
    expect($popover.length).toBe(1);

    // Resize event
    window.dispatchEvent(new Event("resize"));

    // Check transform-origin has appropriate CSS values
    // in this case, they should be "n% n%"" for some integer n
    const popoverStyle = $popover.css("transform-origin");
    expect(popoverStyle).not.toBe(undefined);
    expect(popoverStyle).toMatch(/\d+% \d+%/);
  });
});
