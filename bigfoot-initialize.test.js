const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe('Bigfoot Plugin', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <p>This is a paragraph with a footnote.<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup></p>
      <ol>
        <li id="fn:1">This is the footnote content.</li>
      </ol>
    `;
  });

  test('Bigfoot plugin initializes', () => {
    // Check if Bigfoot initializes without errors
    const initialize = () => $.bigfoot();
    expect(initialize).not.toThrow();
  });
});