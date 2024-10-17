describe("Bigfoot internal logic for repositioning", () => {
    test("Correctly calculates available space for footnotes", () => {
      const mockElement = {
        outerHeight: () => 50, 
        outerWidth: () => 100, 
        css: (prop) => (prop === "margin-left" ? "10px" : "auto"), 
      };
  
      const mockWindow = {
        innerHeight: 900,
        innerWidth: 1500, 
        scrollX: 0, 
        scrollY: 0, 
      };
  

      const calculatePosition = (element, window) => {
        const height = element.outerHeight();
        const width = element.outerWidth();
        const marginLeft = parseFloat(element.css("margin-left"));

        return {
          availableHeight: window.innerHeight - height,
          availableWidth: window.innerWidth - width - marginLeft,
        };
      };
  

      const result = calculatePosition(mockElement, mockWindow);
  

      expect(result.availableHeight).toBe(850); 
      expect(result.availableWidth).toBe(1390); 
    });
  
    test("Handles different margin-left values", () => {
      const mockElement = {
        outerHeight: () => 40,
        outerWidth: () => 150,
        css: (prop) => (prop === "margin-left" ? "20px" : "auto"),
      };
  
      const mockWindow = {
        innerHeight: 900,
        innerWidth: 1300,
        scrollX: 0,
        scrollY: 0,
      };
  
      const calculatePosition = (element, window) => {
        const height = element.outerHeight();
        const width = element.outerWidth();
        const marginLeft = parseFloat(element.css("margin-left"));
  
        return {
          availableHeight: window.innerHeight - height,
          availableWidth: window.innerWidth - width - marginLeft,
        };
      };
  
      const result = calculatePosition(mockElement, mockWindow);
  
      expect(result.availableHeight).toBe(860); 
      expect(result.availableWidth).toBe(1130);
    });
  
    test("Calculates correctly when scroll positions are present", () => {
      const mockElement = {
        outerHeight: () => 60,
        outerWidth: () => 120,
        css: (prop) => (prop === "margin-left" ? "15px" : "auto"),
      };
  
      const mockWindow = {
        innerHeight: 700,
        innerWidth: 1000,
        scrollX: 200,
        scrollY: 100,
      };
  
      const calculatePosition = (element, window) => {
        const height = element.outerHeight();
        const width = element.outerWidth();
        const marginLeft = parseFloat(element.css("margin-left"));
  
        return {
          availableHeight: window.innerHeight - height,
          availableWidth: window.innerWidth - width - marginLeft + window.scrollX,
        };
      };
  
      const result = calculatePosition(mockElement, mockWindow);
  
      expect(result.availableHeight).toBe(640); 
      expect(result.availableWidth).toBe(1065); 
    });
  });