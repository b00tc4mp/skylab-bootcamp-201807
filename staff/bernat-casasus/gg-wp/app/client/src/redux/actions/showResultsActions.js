import { SET_SUMMONER_DATA, SET_SUMMONER_ERROR, SET_LEAGUE_DATA, SET_SUMMONER_PENDING } from '../actions/types'
import logic from '../../logic'

export const summoner = (summonerName) => {
    return dispatch => {
        console.log('action:', summonerName)
        dispatch(setSummonerPending(true))
        // dispatch(setSummonerData(null))
        dispatch(setLeagueData(null))
        return logic.getSummonerSumaryBySummonerName(summonerName)
            .then(res => {
                dispatch(setSummonerPending(false))
                if (res && res.championsStats) {

                    const championLabels = res.championsStats.map((champion) => {
                        return champion.name
                    })

                    const championTimesPlayed = res.championsStats.map((champion) => {
                        return champion.timesPlayed
                    })

                    const championWinrate = res.championsStats.map((champion) => {
                        return parseInt(champion.wins / champion.timesPlayed * 100)
                    })

                    res.championLabels = championLabels
                    res.championTimesPlayed = championTimesPlayed
                    res.championWinrate = championWinrate

                }

                res.favorite = false
                return logic.listFollows()
                    .then(summoner => {
                        summoner.forEach(id => {
                            if (id == res.id) {
                                res.favorite = true
                            }
                        })

                    })
                    .then(() => {
                        dispatch(setSummonerData(res))
                    })


            })

            .catch(error => {
                dispatch(setSummonerPending(false))
                dispatch(setSummonerData({}))
                dispatch(setSummonerError(error.message))
                setTimeout(() => {
                    dispatch(setSummonerError(null))
                }, 6000)
            })
    }
}


function setSummonerData(summonerData) {
    return {
        type: SET_SUMMONER_DATA,
        summonerData
    };
}

function setSummonerError(summonerError) {
    return {
        type: SET_SUMMONER_ERROR,
        summonerError
    };
}

function setSummonerPending(isSummonerPending) {
    return {
        type: SET_SUMMONER_PENDING,
        isSummonerPending
    };
}

function setLeagueData(leagueData) {
    return {
        type: SET_LEAGUE_DATA,
        leagueData
    };
}

