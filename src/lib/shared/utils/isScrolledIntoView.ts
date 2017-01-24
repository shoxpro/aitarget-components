export function isScrolledIntoView (el, holder) {
  const elemTop      = el.getBoundingClientRect().top;
  const elemBottom   = el.getBoundingClientRect().bottom;
  const holderTop    = holder.getBoundingClientRect().top;
  const holderBottom = holder.getBoundingClientRect().bottom;

  return elemTop >= holderTop && elemBottom <= holderBottom;
}
