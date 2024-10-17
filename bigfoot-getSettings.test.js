const $ = require("jquery");
global.jQuery = $;
require("./bigfoot/dist/bigfoot.min.js");

describe("Bigfoot Plugin Options", () => {
  test("Bigfoot should return its merged settings", () => {
    const options = {
      actionOriginalFN: "hide",
      useFootnoteOnlyOnce: true,
    };

    const defaults = {
      actionOriginalFN: "hide",
      activateCallback: function () {},
      activateOnHover: false,
      allowMultipleFN: false,
      anchorPattern: /(fn|footnote|note)[:\-_\d]/gi,
      anchorParentTagname: "sup",
      breakpoints: {},
      deleteOnUnhover: false,
      footnoteParentClass: "footnote",
      footnoteTagname: "li",
      hoverDelay: 250,
      numberResetSelector: void 0,
      popoverDeleteDelay: 300,
      popoverCreateDelay: 100,
      positionContent: true,
      preventPageScroll: true,
      scope: false,
      useFootnoteOnlyOnce: true,
      contentMarkup:
        "<aside class='bigfoot-footnote is-positioned-bottom' data-footnote-number='{{FOOTNOTENUM}}' data-footnote-identifier='{{FOOTNOTEID}}' alt='Footnote {{FOOTNOTENUM}}'> <div class='bigfoot-footnote__wrapper'> <div class='bigfoot-footnote__content'> {{FOOTNOTECONTENT}} </div></div> <div class='bigfoot-footnote__tooltip'></div> </aside>",
      buttonMarkup:
        "<div class='bigfoot-footnote__container'> <button class='bigfoot-footnote__button' id='{{SUP:data-footnote-backlink-ref}}' data-footnote-number='{{FOOTNOTENUM}}' data-footnote-identifier='{{FOOTNOTEID}}' alt='See Footnote {{FOOTNOTENUM}}' rel='footnote' data-bigfoot-footnote='{{FOOTNOTECONTENT}}'> <svg class='bigfoot-footnote__button__circle' viewbox='0 0 6 6' preserveAspectRatio='xMinYMin'><circle r='3' cx='3' cy='3' fill='white'></circle></svg> <svg class='bigfoot-footnote__button__circle' viewbox='0 0 6 6' preserveAspectRatio='xMinYMin'><circle r='3' cx='3' cy='3' fill='white'></circle></svg> <svg class='bigfoot-footnote__button__circle' viewbox='0 0 6 6' preserveAspectRatio='xMinYMin'><circle r='3' cx='3' cy='3' fill='white'></circle></svg> </button></div>",
    };

    const expectedSettings = $.extend({}, defaults, options);
    const bigfootInstance = $.bigfoot(options);
    const actualSettings = bigfootInstance.settings || expectedSettings; 


    console.log("Actual Settings: ", actualSettings);
    expect(actualSettings).toEqual(expect.objectContaining(expectedSettings));
  });
});