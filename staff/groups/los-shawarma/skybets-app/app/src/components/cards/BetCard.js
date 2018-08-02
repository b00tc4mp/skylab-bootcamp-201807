import React, {Component} from 'react'

const BetCard = props => {

    const {odds, results, teams, competition, date, time, link} = props.betsProp

    return (
        <div>
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
        </div>
    )
}

export default BetCard