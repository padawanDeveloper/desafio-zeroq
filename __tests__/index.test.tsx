import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import useFetchData from "@/hooks/useFetchOffices";
import Home from "@/pages/index";

jest.mock("../hooks/useFetchOffices");

const mockData = [
    {
        id: 1,
        name: "Office 1",
        online: false,
        lines: [
            {
                waiting: 3,
                elapsed: 513,
            },
            {
                waiting: 6,
                elapsed: 201,
            },
            {
                waiting: 1,
                elapsed: 334,
            },
        ],
    },
];

describe("Home Component", () => {
    it("should display loading spinner while fetching data", () => {
        (useFetchData as jest.Mock).mockReturnValue({
            data: null,
            loading: true,
            error: null,
            handleChangeState: jest.fn(),
        });

        render(<Home />);
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("should display data in CardList when fetched", () => {
        (useFetchData as jest.Mock).mockReturnValue({
            data: mockData,
            loading: false,
            error: null,
            handleChangeState: jest.fn(),
        });

        render(<Home />);

        expect(screen.getByTestId("card-list")).toBeInTheDocument();
        expect(screen.getByText("Office 1")).toBeInTheDocument();
    });

    it("should display error message when there is an error", () => {
        (useFetchData as jest.Mock).mockReturnValue({
            data: null,
            loading: false,
            error: "Network error",
            handleChangeState: jest.fn(),
        });

        render(<Home />);

        expect(screen.getByText("Network error")).toBeInTheDocument();
    });

    it("should render SearchInput and handle input changes", () => {
        (useFetchData as jest.Mock).mockReturnValue({
            data: [],
            loading: false,
            error: null,
            handleChangeState: jest.fn(),
        });

        render(<Home />);

        const searchInput = screen.getByPlaceholderText("Buscar sucursal...");
        expect(searchInput).toBeInTheDocument();

        fireEvent.change(searchInput, { target: { value: "Office" } });
        expect(searchInput).toHaveValue("Office");
    });
});
