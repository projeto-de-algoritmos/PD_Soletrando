import React, { useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'

import closeCircleFilled from '@iconify/icons-ant-design/close-circle-filled'
import headPhone from '@iconify/icons-ant-design/customer-service-filled'
import { Icon } from '@iconify/react'

import logoPNG from '../../assets/img/logo.png'
import bannerPNG from '../../assets/img/spelling_bee_banner.png'

const Home = () => {
  const { speak } = useSpeechSynthesis()
  
  const [listens, setListens] = useState(4)
  const [time, setTime] = useState(0)
  const [text, setText] = useState('')

  const [points, setPoints] = useState(33)
  const [spelling, setSpelling] = useState('')
  const [spellingSize, setSpellingSize] = useState(0)

  const [game, setGame] = useState('')
  const [isModal, setIsModal] = useState(false)

  const handleSpeaking = (word) => {
    if (listens > 0) {
      speak({
        text: word,
        rate: 0.8,
      })

      setListens(l => l - 1)
    }
  }

  const handleSpelling = (word) => {
    const letter = word.slice(-1)
    const newSpelling = spelling + letter

    setText(letter)
    setSpelling(newSpelling)
    setSpellingSize(newSpelling.length)

    console.log(newSpelling)
  }

  useEffect(() => {
    let interval

    if (game === 'start') {
      interval = setInterval(() => {
        setTime(t => t + 1)
      }, 1000)
    } else if (game === 'end') {
      clearInterval(interval)
    } else {
      setTime(0)
    }
  }, [game])

  useEffect(() => {
    if (time >= 999) {
      setGame('end')
    }
  }, [time])

  return (
    <div className='container'>

      {/* header */}
      <div className='header'>
        <div className='nav'>
          <div className='logo'>
            <a href='/'>
              <img src={logoPNG} width={125} alt='logo' />
            </a>
          </div>
          <div className='menus'>
            <ul className='menu'>
              <li onClick={() => setIsModal(true)}>Sobre</li>
            </ul>
          </div>
        </div>
      </div>

      {/* page */}
      <div className='page'>
        <div className='central'>
          {game === '' ?
            <div className='home'>
              <div className='banner'>
                <img src={bannerPNG} width={540} alt='spelling-bee' />
              </div>
              <div className='title'>
                <h1>Descubra sua capacidade <br /> com palavras</h1>
              </div>
              <div className='description'>
                <h2>Soletre as palavras que você ouvir</h2>
                <button onClick={() => setGame('start')}>
                  <span>Começar</span>
                </button>
              </div>
            </div>
          : game === 'start' ?
            <div className='game'>
              <div className='info'>
                <div className='left'>
                  <div className='word'> 
                    <h2>Palavra 2</h2>
                    <Icon
                      icon={headPhone}
                      style={{ fontSize: '35px' }}
                      onClick={() => handleSpeaking('O tiago é um falso.')}
                    />
                  </div>
                  <h3>Escutas restantes: {listens}</h3>
                </div>
                <div className='right'>
                  <h2>Tempo: <span>{time}</span></h2>
                  <h3>Letras digitadas: {spellingSize}</h3>
                </div>
              </div>
              <div className='user-input'>
                <input
                  type='text'
                  value={text}
                  onChange={(e) => handleSpelling(e.target.value)}
                />
              </div>
              <div className='buttons'>
                <button className='btn-gray' onClick={() => setGame('end')}>
                  <span>Finalizar</span>
                </button>
                <button className='btn-orange' onClick={() => {}}>
                  <span>Próxima</span>
                </button>
              </div>
            </div>
          : 
            <div className='end'>
              <div className='score'>
                <div className='points'>
                  <h2>{points}</h2>
                </div>
              </div>

              <div className='spelling'>
                <div className='correct'>
                  <h3>paralelepípedo</h3>
                </div>
                <div className='wrong'>
                  <h3>paralerepípedo</h3>
                </div>
                <span>5 pontos</span>
              </div>
            </div>
          }
          </div>
      </div>

      {/* modal */}
      <div className={`modal-overlay ${isModal}`}>
        <div className='modal'>
          <div className='modal-header'>
            <h5 className='modal-title'>Sobre</h5>
            <Icon
              icon={closeCircleFilled}
              style={{ color: '#fff', fontSize: '25px' }}
              onClick={() => {
                localStorage.setItem('modal', '1')
                setIsModal(false)
              }}
            />
          </div>
          <div className='modal-body'>
            <p>
              Sobre
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
