const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Tests Bigfoot's Handling of Breakpoints", () => {
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

  // TEST for addBreakpoint calling trueCallback
  test("Function [addBreakpoint] calls a trueCallback", () => {
    const mockMatchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(min-width: 500px)",
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
    window.matchMedia = mockMatchMedia;

    const trueCallback = jest.fn();
    const falseCallback = jest.fn();

    // Add breakpoint
    $.bigfoot().addBreakpoint(
      "(min-width: 500px)",
      trueCallback,
      falseCallback
    );

    expect(trueCallback).toHaveBeenCalled();
    expect(falseCallback).not.toHaveBeenCalled();
  });

  // TEST for addBreakpoint calling falseCallback
  test("Function [addBreakpoint] calls a falseCallback", () => {
    const mockMatchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(min-width: 500px)",
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
    window.matchMedia = mockMatchMedia;

    const trueCallback = jest.fn();
    const falseCallback = jest.fn();

    // Add breakpoint that does not match 500px
    $.bigfoot().addBreakpoint(
      "(min-width: 1000px)",
      trueCallback,
      falseCallback
    );

    expect(falseCallback).toHaveBeenCalled();
    expect(trueCallback).not.toHaveBeenCalled();
  });

});
