import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import router from 'react-router';

import { AsideNav } from '../aside-nav';
import { QueryClientProvider, QueryClient } from 'react-query';

const mockNavigate = jest.fn(); //Comes from jest - Simulate a function

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'), //Require the actual module
    useNavigate: () => mockNavigate //Change the original execution to a mock
})) //Comes from jest - Simulates the behavior from import 'react-router'

const renderAsideComponent = () => {
    const queryClient = new QueryClient();

    render(
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AsideNav />
        </QueryClientProvider>
        </BrowserRouter>
    ); //Comes from jest - Render a element, creating in Virtual DOM 

    return { queryClient }
}

describe("AsideNav", () => { //Comes from jest - Description from all tests from this file
    it("should render correctly", () => { //Comes from jest - Describe especif test
        renderAsideComponent();

        expect(screen.getByText("All files")).toBeInTheDocument(); //Expect Comes from jest - Expected behavior  
        expect(screen.getByText("Favorites")).toBeInTheDocument(); //screen object (element created on render method), toBeInTheDocument (checks if element searched by getByText) it's in the documment
        expect(screen.getByText("New")).toBeInTheDocument(); //comes from testing library
    });

    //TODO: ABORDAR REFATORAÇÃO [x]
    // TODO: explicar o que vem do jest e o que vem da testing library [x]
    // TODO: explicar o for each [x]
    it("should call navigate with correct params", () => {
        renderAsideComponent();

        const btnAllFiles = screen.getByText("All files") //Comes from testing library - Search a element in rendered component before

        fireEvent.click(btnAllFiles); //Comes from testing library - executes a event, on this case, execute click action on searched element

        expect(mockNavigate).toHaveBeenCalled(); //Expect Comes from jest - Expected navigation function to be called
        expect(mockNavigate).toHaveBeenCalledWith("/");// and expected function to be called passing "/" as parameter
    })

    //Create a foreach loop, passing iteration values as parameter 
    it.each([["All files", "/"], ["Favorites", "/favorites"]])("testings %s", (text, path) => {
        renderAsideComponent();

        const btn = screen.getByText(text); //Comes from testing library - Search a element in rendered component before

        fireEvent.click(btn); //Comes from testing library - executes a event, on this case, execute click action on searched element

        expect(mockNavigate).toHaveBeenCalled();//Expect Comes from jest - Expected navigation function to be called
        expect(mockNavigate).toHaveBeenCalledWith(path);// and expected function to be called passing path value from iteration as parameter
    })
})