import { useEffect, useState, Children } from "react";
import { Page404 } from "../pages/404";
import { EVENTS } from "../utils/constants";
import { match } from "path-to-regexp";
import { getCurrentPath } from "../utils/utils";

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = Page404,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";

    return isRoute ? props : null;
  });

  const routesToRender = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToRender.find(({ path }) => {
    if (path === currentPath) return true;

    const matcherURL = match(path, { decode: decodeURIComponent });
    const matched = matcherURL(currentPath);

    if (!matched) return false;

    routeParams = matched.params;
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
