import React, {Component} from 'react'

const BetCard = props => {

    const {odds, results, teams, competition, date, time, link} = props.betsProp

    return (
        <div>
            <div className="block">
                <div>
                    <span className="font-weight-bold">Odds: </span><span>{odds}</span>
                </div>
            </div>
            <div className="block2">
                <div>
                    <span className="font-weight-bold">Results:</span><span>{results}</span>
                </div>
            </div>
            <div className="block">
                <div>
                    <span className="font-weight-bold">Teams:</span><br /><span>{teams}</span>
                </div>
            </div>
            <div className="block2">
                    <span className="font-weight-bold">Competition:</span><br /><span>{competition}</span>
            </div>
            <div className="block">
                    <div>
                        <span className="font-weight-bold">Date: </span><span>{date}</span>
                    </div>
                    <div>
                        <span className="font-weight-bold">Time: </span><span>{time}</span>
                    </div>
                </div>
            <div className="block2Btn">
                <div>
                    <a className="pt-3" href={link} target="_blank">Go to Bet</a>
                </div>
            </div>
        </div>
    )
}

export default BetCard












{/* <div>
            <div>
                <span>Odds </span><span>{odds}</span>
                <div>
                    <span>Results </span><span>{results}</span>
                    <span>Teams </span><span>{teams}</span>
                    <span>Competition </span><span>{competition}</span>
                </div>
                <div>
                    <span>Date </span><span>{date}</span>
                    <span>Time </span><span>{time}</span>
                    <span>Link </span><span><a href={link}>Go to Bet</a></span>
                </div>
            </div>
        </div> */}