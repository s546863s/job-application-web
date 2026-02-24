# JavaScript Interview Questions & Answers

# 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
getElementById grabs a single element by its unique ID, while getElementsByClassName collects all elements sharing a specific class name. querySelector is the most flexible, using any CSS selector to find the first match, and querySelectorAll gets every element that matches that selector.

# 2. How do you create and insert a new element into the DOM?
First, you create the element in memory using document.createElement() and optionally give it some content. Then, you insert it into the page by selecting a parent element and using appendChild() to place it inside.

# 3. What is Event Bubbling? And how does it work?
Event Bubbling is like a ripple effect where an event starts from the target element you clicked on and then travels upward through its ancestors. It works by triggering any event listeners on the parent, then its parent, all the way up to the document object.

# 4. What is Event Delegation in JavaScript? Why is it useful?
Event Delegation is a technique where you attach a single event listener to a parent element to manage events for all its current and future children. It's incredibly useful because it boosts performance and automatically works for new elements you add to the page later.

# 5. What is the difference between preventDefault() and stopPropagation() methods?
preventDefault() stops an element's default browser behavior, like a link from navigating to a new page. stopPropagation(), on the other hand, stops the event from bubbling up to parent elements, but it doesn't interfere with the default action.