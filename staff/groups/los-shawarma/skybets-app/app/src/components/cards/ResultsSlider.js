import React, {Component} from 'react'
//import './ResultsSlider.css'
import Pagination from '../materialUI/Pagination.js'

class ResultsSlider extends Component {

      state = {
        allResults: null,
        currentResult: null,
        currentPage: null,
        totalPages: null,
      };

      static getDerivedStateFromProps(props, state) {
        if (props.resultsProp !== state.allResults) {
          return {
            allResults: props.resultsProp,
            currentResult: props.resultsProp[0],
          };
        }
    
        return null; // Return null to indicate no change to state.
      }
    
      onPageChanged = data => {
        const { allResults } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentResult = allResults.slice(offset, offset + pageLimit)[0];
       
        this.setState({ currentPage, currentResult, totalPages });

        this.props.onPageChangedProp(currentResult);
      };
    
      render() {
        const {
          allResults,
          currentResult,
          currentPage,
          totalPages
        } = this.state;
        const totalResults = allResults.length;

        if (totalResults === 0) return null;
    
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
                { this.props.render(currentResult) }
                <div className="d-flex flex-row align-items-center">
                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalResults}</strong>{" "}
                    { this.props.titleProps }
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
                    totalRecords={totalResults}
                    pageLimit={1}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged}
                  />
                </div>
              </div>

              

            </div>
          </div>
        );
      }

}

export default ResultsSlider