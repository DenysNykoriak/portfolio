import { cleanup, render, screen } from "@testing-library/react";
import Portfolio from "../../../client/components/portfolio/Portfolio";
import PortfolioSection1Welcome from "../../../client/components/portfolio/sections/PortfolioSection1Welcome";
import { PrivateInfoWrapper, ThemeWrapper } from "../../helpers/wrappers";

describe("Portfolio UI", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
    render(<Portfolio />, {
      wrapper: ThemeWrapper.SimpleWrapper,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should all sections rendered", () => {
    const section1 = screen.queryByTestId("portfolio-section-1");
    const section2 = screen.queryByTestId("portfolio-section-2");
    const section3 = screen.queryByTestId("portfolio-section-3");
    const section4 = screen.queryByTestId("portfolio-section-4");
    const section5 = screen.queryByTestId("portfolio-section-5");
    const section6 = screen.queryByTestId("portfolio-section-6");
    const section7 = screen.queryByTestId("portfolio-section-7");

    expect(section1).toBeInTheDocument();
    expect(section2).toBeInTheDocument();
    expect(section3).toBeInTheDocument();
    expect(section4).toBeInTheDocument();
    expect(section5).toBeInTheDocument();
    expect(section6).toBeInTheDocument();
    expect(section7).toBeInTheDocument();
  });
});

describe("Portfolio Section 1", () => {
  beforeEach(() => {
    render(<PortfolioSection1Welcome expandToRef={{ current: null }} />, {
      wrapper: new PrivateInfoWrapper().setWithTheme(true).Wrapper,
    });
  });

  test("=", () => {
    expect(2).toBe(2);
  });

  test("render portfolio author name", () => {
    const typography = screen.queryByText(/Nykoriak Denys/);
    expect(typography).toBeInTheDocument();
  });

  test("render portfolio author position", () => {
    const typography = screen.queryByText(/Junior Front-End Developer/);
    expect(typography).toBeInTheDocument();
  });
});
