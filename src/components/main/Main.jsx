import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, setPrevPrompts} = useContext(Context);
    const loadPrompt = async (prompt) => {
        setPrevPrompts(prev=>[...prev, prompt]);
        await  onSent(prompt)
    }
    return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult
            ?
            <>
                <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
            {assets.prompts.map((item, index)=> {
                return (
                    <div className="card" key={index}>
                        <p onClick={()=> {loadPrompt(item.prompt)}}>{item.prompt}</p>
                        <img src={item.src} alt="" />
                    </div>
                )
            })}
            </div>
            </>
            :
            <div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?  <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :   <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    } 
                </div>
            </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' id="" />
                    <div className="">
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input&&<img src={assets.send_icon} onClick={() => onSent()} alt="" />}
                    </div>
                </div>
                <div className="bottom-info">
                Gemini may display inaccurate info, including about people, so double-check its responses.
                <u> Your privacy and Gemini Apps</u>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Main