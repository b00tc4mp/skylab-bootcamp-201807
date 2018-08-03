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
          currentPage ? "" : ""
        ]
          .join(" ")
          .trim();

        return (
          <div >
            <div >
              <div >
                
                { this.props.render(currentResult) }
                
                <div>
                  <h6 className={headerClass}>
                    <strong className="text-secondary">{totalResults}</strong>{" "}
                    { this.props.titleProps }
                  </h6>
                </div>
                
                <div className="pb-3 pl-5">
                  <div className="d-flex flex-row align-items-center">
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
          </div>
        );
      }

}

export default ResultsSlider