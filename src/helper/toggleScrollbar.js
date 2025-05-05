export function toggleScrollbar(isOpen) {
  const getScrollbarWidth = () => {
    return typeof window !== "undefined" && window.innerWidth - typeof window !== "undefined" && document.documentElement.clientWidth;
  };
  const body = typeof window !== "undefined" && document.body;
  if (isOpen) {
    const scrollbarWidth = getScrollbarWidth();
    body.style.paddingRight = `${scrollbarWidth}px`;
    body.classList.add("overflow-y-hidden");

    const style = typeof window !== "undefined" && document.createElement("style");
    style.id = "hide-scrollbar";
    style.innerHTML = `::-webkit-scrollbar { display: none; }`;
    typeof window !== "undefined" && document.head.appendChild(style);
  } else {
    body.style.paddingRight = "0";
    body.classList.remove("overflow-y-hidden");
    const styleElement = typeof window !== "undefined" && document.getElementById("hide-scrollbar");
    if (styleElement) {
      styleElement.remove();
    }
  }
}
export function cleanupScrollbar() {
  const body = typeof window !== "undefined" && document.body;
  body.style.paddingRight = "0";
  body.classList.remove("overflow-y-hidden");
  const styleElement = typeof window !== "undefined" && document.getElementById("hide-scrollbar");
  if (styleElement) {
    styleElement.remove();
  }
}
