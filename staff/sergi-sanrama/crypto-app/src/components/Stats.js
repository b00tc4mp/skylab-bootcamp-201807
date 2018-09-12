import React from 'react'
import {Bar, Doughnut, Pie} from 'react-chartjs-2' 



const Stats = (props) => {
    return (<div>
        <div className='stats-container' >
            <Pie
            data={props.chartData}
            width={400}
            height={100}
            options={{
                title: {
                    display: true,
                    text: 'Portfolio Value ',
                    fontSize: 25
                },
                legend:{
                    display: true,
                    position: 'bottom'
                },
                
                
            }}
            />

            <Doughnut
            data={props.chartData2}
            width={400}
            height={100}
            options={{
                title: {
                    display: true,
                    text: 'Portfolio Quantity',
                    fontSize: 25
                },
                legend:{
                    display: true,
                    position: 'bottom'
                }
            }}
            />

                {/* <Bar
            data={this.state.chartData}
            width={600}
            height={200}
            options={{
                title: {
                    display: true,
                    text: 'Portfolio Value',
                    fontSize: 25
                },
                legend:{
                    display: true,
                    position: 'bottom'
                }
            }}
            />} */}
        </div>
        
    
        

    </div>

    )
}

export default Stats