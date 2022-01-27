import { render, fireEvent, cleanup, screen } from "@testing-library/react";

import CheckBox from "../core/CheckBox";

describe("Checkbox tests", () => {
  const categories = [
    {
      _id: "1",
      name: "1",
    },
    {
      _id: "2",
      name: "2",
    },
    {
      _id: "3",
      name: "3",
    },
  ];

  let filters: Array<string> = [];

  const handleFilters = (categoryFilters: Array<string>) => {
    filters = categoryFilters;
  };

  afterEach(() => {
    filters = [];
    cleanup();
  });

  it("Should check second category", () => {
    render(<CheckBox categories={categories} handleFilters={handleFilters} />);

    const input = screen.getByTestId("checkbox-2") as HTMLInputElement;

    fireEvent.click(input);

    expect(filters).toHaveLength(1);
  });

  it("should check all categories", () => {
    render(<CheckBox categories={categories} handleFilters={handleFilters} />);

    const inputs = screen.getAllByRole("checkbox") as Array<HTMLInputElement>;

    inputs.forEach((item) => fireEvent.click(item));

    expect(filters).toHaveLength(3);
  });
});
