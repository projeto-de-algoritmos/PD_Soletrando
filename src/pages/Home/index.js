import React, { useEffect, useState } from 'react'

import closeCircleFilled from '@iconify/icons-ant-design/close-circle-filled'
import headPhone from '@iconify/icons-ant-design/customer-service-filled'
import { Icon } from '@iconify/react'

import logoPNG from '../../assets/img/logo.png'
import bannerPNG from '../../assets/img/spelling_bee_banner.png'

const Home = () => {
  const [text, setText] = useState('')
  const [time, setTime] = useState(0)

  const [spelling, setSpelling] = useState('')
  const [spellingSize, setSpellingSize] = useState(0)

  const [isModal, setIsModal] = useState(false)
  const [isGame, setIsGame] = useState(false)

  const handleSpelling = (word) => {
    const letter = word.slice(-1)
    const newSpelling = spelling + letter

    setText(letter)
    setSpelling(newSpelling)
    setSpellingSize(newSpelling.length)

    console.log(newSpelling)
  }

  useEffect(() => {
    if (isGame) {
      setInterval(() => {
        setTime(t => t + 1)
      }, 1000);
    } else {
      setTime(0)
    }
  }, [isGame])

  useEffect(() => {
  }, [])

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
      <div className={`page ${isGame}`}>
        <div className={`central ${isGame}`}>
          {!isGame ?
            <div className='home'>
              <div className='banner'>
                <img src={bannerPNG} width={540} alt='spelling-bee' />
              </div>
              <div className='title'>
                <h1>Descubra sua capacidade <br /> com palavras</h1>
              </div>
              <div className='description'>
                <h2>Soletre as palavras que você ouvir</h2>
                <button onClick={() => setIsGame(true)}>
                  <span>Começar</span>
                </button>
              </div>
            </div>
          :
            <div className='game'>
              <div className='info'>
                <div className='left'>
                  <div className='word'> 
                    <h2>Palavra 2</h2>
                    <Icon
                      icon={headPhone}
                      style={{ color: '#324161', fontSize: '35px' }}
                      onClick={() => {}}
                    />
                  </div>
                  <h3>Escutas restantes: 3</h3>
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
                <button className='btn-gray' onClick={() => {}}>
                  <span>Finalizar</span>
                </button>
                <button className='btn-orange' onClick={() => {}}>
                  <span>Próxima</span>
                </button>
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
