import React, {Component} from 'react'
import Pagination from '../materialUI/Pagination.js'
//import CountryCard from "./components/CountryCard";
import FlightCard from "./FlightCard";

class FlightResults extends Component {

    state = {
        allFlights: this.props.flightsProp,
        currentFlight: this.props.flightsProp[0],
        currentPage: null,
        totalPages: null
      };
    
      /*componentDidMount() {
        const allFlights = Flights;
        this.setState({ allFlights });
      }*/
    
      onPageChanged = data => {
        const { allFlights } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentFlight = allFlights.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentFlight, totalPages });
      };
    
      render() {
        const {
          allFlights,
          currentFlight,
          currentPage,
          totalPages
        } = this.state;
        const totalFlights = allFlights.length;

        if (totalFlights === 0) return null;
    
        const headerClass = [
          "text-dark py-2 pr-4 m-0",
          currentPage ? "border-gray border-right" : ""
        ]
          .join(" ")
          .trim();
    
        return (
          <div className="container mb-5">
            <div className="row d-flex flex-row py-5">
              <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalFlights}</strong>{" "}
                    Flights
                  </h2>
                  {currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                      Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                      <span className="font-weight-bold">{totalPages}</span>
                    </span>
                  )}
                </div>
                <div className="d-flex flex-row py-4 align-items-center">
                  <Pagination
                    totalRecords={totalFlights}
                    pageLimit={1}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged}
                  />
                </div>
              </div>
              {/*currentFlight.map(country => (
                <CountryCard key={country.cca3} country={country} />
              ))*/}
              {<FlightCard flightsProp={currentFlight}/>}
            </div>
          </div>
        );
      }

}

export default FlightResults