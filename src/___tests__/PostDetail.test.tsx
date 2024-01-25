import React from "react";
import { BrowserRouter as Router} from 'react-router-dom';
import Details from "../components/PostDetail";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
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
   
    it('renders page', async() => {
        render(<Router><Details /></Router>); 
        await waitFor(()=>{
            expect(screen.getByTestId('test1')).toBeInTheDocument();
        })
      });

    it('should go back when btton pressed', ()=>{
    render(<Router><Details /> </Router>)
    fireEvent.click(screen.getByText(/Back/i));
     expect(window.location.pathname).toBe("/")
})

})