import Response from "./Response"
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useState, useMemo, useEffect } from "react"

const synth = window.speechSynthesis

const App = () => {

    const [voiceOpted, setVoiceOpted] = useState("Microsoft David - English (United States)"
)
    const [text, setText] = useState("")
    const [isSpeaking, setIsSpeaking] = useState("")
    
    const [word, setWord] = useState("")
    const [meanings, setMeanings] = useState([])
    const [phonetics, setPhonetics] = useState([])


    const voices = useMemo(() => synth.getVoices(), [])

    const callDictionaryApi = (text, e) => {
        e && e.preventDefault()
        if(!text.trim()) return

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
            .then(res => res.json())
            .then(data => {
                setWord(text)
                setMeanings(data[0].meanings)
                setPhonetics(data[0].phonetics)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSpeech = () => {
        if(!text.trim()) return
        if(!synth.speaking) {
            const utterance = new SpeechSynthesisUtterance(text)
            const voice = voices.find(voice => voice.name === voiceOpted)
            utterance.voice = voice
            synth.speak(utterance)
            setIsSpeaking("speak")
        }else{
            synth.cancel()
        }

        setInterval(() => {
            if(!synth.speaking) setIsSpeaking("")
        }, 100)
    }

    const changeWord = (newText) => {
        setText(newText)
        callDictionaryApi(newText)
    }

    return (
        <div className="main">
            <div className="title">
                English dictionary
            </div>
            <div className="get-input">
                <form>
                    <div className="form-top">
                        <textarea cols="1" rows="5"
                        placeholder="Learn a word"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        />
                        <select value={voiceOpted} onChange={(e) => setVoiceOpted(e.target.value)}>
                            {
                                voices?.map((voice) => (
                                    <option key={voice.name} value={voice.name}>{voice.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    
                    <div className="form-bottom">
                        
                        <button className="search-btn"
                        onClick={(e) => callDictionaryApi(text, e)}
                        >
                            Search
                        </button>
                        <div className="icon">
                            <HiMiniSpeakerWave 
                            className={isSpeaking}
                            onClick={handleSpeech} />
                        </div>
                    </div>
                    
                </form>
            </div>

            <div className="response">
                {word && (<Response 
                word = {word}
                phonetics = {phonetics}
                meanings = {meanings}
                changeWord={changeWord}
                />)}
            </div>

        </div>
    )
}

export default App