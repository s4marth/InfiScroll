import React from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import Home from "../components/Home";
import { render, screen, cleanup, fireEvent, waitFor, act } from "@testing-library/react";
import 'jest-fetch-mock'
require('jest-fetch-mock').enableMocks()

afterEach(cleanup);
const mockFetch = jest.fn();
global.fetch = mockFetch;
global.window.alert = jest.fn();

// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-router-dom"),
//     useLocation: () => ({
//       state: countryData.state, // Set the desired state for your test
//     }),
//     useNavigate: () => jest.fn(),
//   }));

describe("Details info", () => {

    beforeEach(() => {
        // Mock fetch globally to avoid actual network requests
        global.fetch = jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue({ hits: [] }),
        });
      });

    it('renders component', async() => {
        render(<Router><Home /></Router>); 
        const linkElement = screen.getByText(/Third one../i);
         expect(linkElement).toBeInTheDocument();
      });

      it('fetches data on mount', async () => {
        render(<Router><Home /></Router>);
        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalledWith('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0');
        });
      });


      it('search button triger', async()=>{
        // global.fetch = jest.fn().mockResolvedValue({
        //   json: jest.fn().mockResolvedValue({}),
        // });
         render(<Router><Home /> </Router>);
        const ip = screen.getByPlaceholderText('Search')
        const submitButton = screen.getByText(/SEARCH/i);
        fireEvent.change(ip, { target: { value: 'The' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    })

    it('search button fail triger', async()=>{
        global.fetch = jest.fn().mockRejectedValue(new Error());
        jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error());
         render(<Router><Home /> </Router>);
        const ip = screen.getByPlaceholderText('Search')
        const submitButton = screen.getByText(/SEARCH/i);
        fireEvent.change(ip, { target: { value: 'abcefdjkhskd' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
        expect(global.fetch).toHaveBeenCalled();
      });
    })

    it('handles card click', async () => {
        render(<Router><Home /></Router>);
        //const card = screen.getByTestId('test3') 
        // let card
        await fireEvent.click(screen.getByTestId('test3') );
        await waitFor(() => {
            expect(screen.getByTestId('test2')).toBeInTheDocument();
        });
      });

})