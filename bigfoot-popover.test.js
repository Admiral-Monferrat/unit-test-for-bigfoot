const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Bigfoot Popover", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <p> This is a paragraph with a footnote.<sup id="fnref:1"><a href="$fn:1" rel="footnote"></a></sup></p>
        <ol>
            <li id="fn:1">This is the footnote content.<li/>
        </ol>
        `;
  });
});

test("Popover appears on button click", (done) => {
  $.bigfoot();

  const footnoteButton = $(".footnote-button");
  footnoteButton.trigger("click");

  setTimeout(() => {
    const popover = $(".bigfoot-footnote__container");
    expect(popover.length).toBe(1);
    expect(popover.is(":visible")).toBe(true);
    done();
  }, 200);
}, 10000);
