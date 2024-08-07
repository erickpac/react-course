import { lazy } from "react";
import { Router } from "./router/Router";
import { Route } from "./components/Route";
import { Suspense } from "react";

const AboutPage = lazy(() => import("./pages/About"));
const HomePage = lazy(() => import("./pages/Home"));
const SearchPage = lazy(() => import("./pages/Search"));

const routes = [
  {
    path: "/search/:query",
    Component: SearchPage,
  },
  {
    path: "/:lang/about",
    Component: AboutPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={routes}>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={AboutPage} />
          <Route path="/implement/:query" Component={SearchPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
