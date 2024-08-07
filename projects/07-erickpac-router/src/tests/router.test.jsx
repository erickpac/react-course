import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { Router } from "../router/Router";
import { Route } from "../components/Route";
import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import { getCurrentPath } from "../utils/utils";

vi.mock("../utils/utils", () => ({
  getCurrentPath: vi.fn(),
}));

describe("Router", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render with no problems", () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it("should render 404 if no routes match", () => {
    render(<Router />);
    expect(document.body.innerHTML).toContain("404");
  });

  it("should render the component of the first route that matches", () => {
    getCurrentPath.mockReturnValue("/");

    const routes = [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
    ];

    render(<Router routes={routes} />);
    expect(document.body.innerHTML).toContain("About");
  });

  it("should navigate using Link", async () => {
    getCurrentPath.mockReturnValueOnce("/");

    render(
    <Router>
      <Route path="/" Component={HomePage} />
      <Route path="/about" Componentomponent={AboutPage} />
    </Router>);

    // Click on the link
    const anchor = screen.getByText(/About us/)

    fireEvent.click(anchor)

    const aboutTitle = await screen.findByText("About");

    // Check that the new route is rendered
    expect(document.body.innerHTML).toContain(aboutTitle);
  });
});
