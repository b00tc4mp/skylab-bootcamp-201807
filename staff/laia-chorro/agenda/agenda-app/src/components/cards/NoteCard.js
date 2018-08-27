import React from 'react'
import './NoteCard.css';


const NoteCard = props =>  { 
        const { date, text } = props 

        return(

            <div>
                <div>
                    <span className="font-weight-bold">Date: </span> <span>{date} | </span>
                </div>  
                <div>
                    <span className="font-weight-bold">Text: </span><span>{text} | </span>
                </div>
                   
            </div>

        )
    }

export default NoteCard