import { EVENTS } from "../utils/constants";

function navigate(path) {
  window.history.pushState({}, "", path);
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === 0;
    const isModifiedEvent =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const isManagedEvent =
      target === undefined || target === null || target === "_self";

    if (isMainEvent && isManagedEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
