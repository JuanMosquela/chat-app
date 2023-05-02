import React, { useRef, useEffect } from "react";

interface ScrollToBottomProps {
  children: React.ReactNode;
}

const ScrollToBottom = ({ children }: ScrollToBottomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [children]);

  return (
    <div style={{ overflowY: "scroll", maxHeight: "100%" }}>
      {children}
      <div ref={containerRef} />
    </div>
  );
};

export default ScrollToBottom;
