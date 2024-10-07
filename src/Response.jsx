import React from 'react'

const Response = ({word, phonetics, meanings, changeWord}) => {

    return (
        <div className="response-container">
            <div className="word">
                <h2>{word}</h2>
            </div>
            <div className="phonetics">
                {
                    phonetics.map(phonetic => {
                        if(phonetic.text) return (<>
                        <span key={phonetic.text}>{`${phonetic.text} `}</span>
                        </>)
                    })                        
                }
            </div>
            
            {
                meanings.map((data, index) => (
                    <div className="display-response">
                        <div className="parts-of-speech">
                            <h4 key={index}>
                                {data.partOfSpeech}
                            </h4>
                        </div>

                        <div className="meaning">
                            <h4>Meaning</h4>
                            {
                                data.definitions.map((def, index) => (
                                    <p key={index}>{`- ${def.definition}`}</p>
                                ))
                            }
                        </div>    
                        {
                            data.synonyms.length > 0 ?
                                (
                                    <div className="synonyms">
                                        <h4>Synonyms</h4>
                                        {data.synonyms.map((syn, index) => (
                                            <>
                                            <span key={index}
                                            onClick={() => changeWord(syn)}
                                            >{`${syn}`}</span>
                                            <span>{`, `}</span>
                                            </>
                                        ))}
                                    </div>
                                )
                            : null
                        }
                    </div>
                ))
            }

        </div>
    )
}

export default Response