// useScrollToTop Hook
// This custom hook scrolls the referenced element to the top whenever it is called.
//
// Usage:
// 1. Import the hook:
//    import { useScrollToTop } from './path/to/useScrollToTop';
//
// 2. Create a ref for the element you want to scroll:
//    const myRef = useRef(null);
//
// 3. Pass the ref to the hook when you want to trigger the scroll to top action:
//    useScrollToTop(myRef);
//
// 4. Attach the ref to the element you want to scroll:
//    <div ref={myRef}>Your content here</div>
//
// Additional Usage:
// You can also use it inside a useEffect to scroll to the top when a component mounts.
//
// Example 1 - Direct usage:
//  import React, { useRef } from 'react';
//  import { useScrollToTop } from './path/to/useScrollToTop';
//
//  const MyComponent = () => {
//    const myRef = useRef(null);
//
//    const handleButtonClick = () => {
//      useScrollToTop(myRef);
//    };
//
//    return (
//      <div>
//        <button onClick={handleButtonClick}>Scroll to Top</button>
//        <div ref={myRef}>Your content here</div>
//      </div>
//    );
//  };
//
//  export default MyComponent;
//
// Example 2 - Using with useEffect:
//  import React, { useRef, useEffect } from 'react';
//  import { useScrollToTop } from './path/to/useScrollToTop';
//
//  const MyComponent = () => {
//    const courseRef = useRef(null);
//
//    useEffect(() => {
//      useScrollToTop(courseRef);
//    }, []); // Add dependencies if needed
//
//    return (
//      <div ref={courseRef}>Your content here</div>
//    );
//  };
//
//  export default MyComponent;

export const useScrollToTop = (ref) => {
  // Scroll the referenced element to the top left corner
  ref.current.scrollTo(0, 0);
};
