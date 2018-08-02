import React, {Component} from 'react'

class BetPriceCard extends Component { 

    state = {
        currentPrice: null,
        currentOdds: null
       
      };

      flightOddCalc = () => {
        const {currentPriceProp, currentOddsProp} = this.props;

        let currentPriceflight =  currentPriceProp;
        let currentOdd = currentOddsProp;
        return currentPriceflight/currentOdd;
    } 



    static getDerivedStateFromProps(props, state) {
        debugger
        if (props.currentPriceProp !== state.currentPrice || 
            props.currentOddsProp !== state.currentOdds ) {
          return {
            currentPrice: props.currentPriceProp,
            currentOdds : props.currentOddsProp
          };
        }
    
        return null; // Return null to indicate no change to state.
      }

   
    render () {
        return(
            <section>
                <div className="card">
                    <h2>Bet Price</h2>
                    <p>{this.flightOddCalc()}</p>
                </div>
            </section>
        )
    }
    }



    


export default BetPriceCard