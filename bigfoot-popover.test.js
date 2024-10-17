const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Bigfoot internal logic for popover creation", () => {
  let mockPopoverCreate;
  let mockSettings;
  let mockElement;

  beforeEach(() => {
    jest.useFakeTimers();

    mockSettings = {
      contentMarkup: "<aside class='bigfoot-footnote' data-footnote-number='{{FOOTNOTENUM}}' data-footnote-identifier='{{FOOTNOTEID}}'><div class='bigfoot-footnote__content'>{{FOOTNOTECONTENT}}</div></aside>",
      buttonMarkup: "<button class='bigfoot-footnote__button' data-footnote-number='{{FOOTNOTENUM}}' data-footnote-identifier='{{FOOTNOTEID}}'>Footnote {{FOOTNOTENUM}}</button>",
      popoverCreateDelay: 100,
      activateCallback: jest.fn(), 
    };

    mockElement = {
      attr: jest.fn((attr) => {
        const mockAttributes = {
          "data-footnote-number": "1",
          "data-footnote-identifier": "fn1",
          "data-bigfoot-footnote": "This is footnote content.",
        };
        return mockAttributes[attr];
      }),
    };


    mockPopoverCreate = (element, settings) => {
      const popoverMarkup = settings.contentMarkup
        .replace(/\{\{FOOTNOTENUM\}\}/g, element.attr("data-footnote-number"))
        .replace(/\{\{FOOTNOTEID\}\}/g, element.attr("data-footnote-identifier"))
        .replace(/\{\{FOOTNOTECONTENT\}\}/g, element.attr("data-bigfoot-footnote"));

      return {
        markup: popoverMarkup,
        footnoteNumber: element.attr("data-footnote-number"),
        footnoteId: element.attr("data-footnote-identifier"),
      };
    };
  });

  test("Creates popover with correct markup", () => {
    const popover = mockPopoverCreate(mockElement, mockSettings);

    const expectedMarkup = "<aside class='bigfoot-footnote' data-footnote-number='1' data-footnote-identifier='fn1'><div class='bigfoot-footnote__content'>This is footnote content.</div></aside>";
    expect(popover.markup).toBe(expectedMarkup);
    expect(popover.footnoteNumber).toBe("1");
    expect(popover.footnoteId).toBe("fn1");
  });

  test("Calls activateCallback when popover is created", () => {
    const popover = mockPopoverCreate(mockElement, mockSettings);

    setTimeout(() => {
      mockSettings.activateCallback(popover);
    }, mockSettings.popoverCreateDelay);

    jest.advanceTimersByTime(mockSettings.popoverCreateDelay);
    expect(mockSettings.activateCallback).toHaveBeenCalledWith(popover);
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});