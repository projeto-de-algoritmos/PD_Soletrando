import React, { useEffect, useState } from 'react'

import closeCircleFilled from '@iconify/icons-ant-design/close-circle-filled'
import { Icon } from '@iconify/react'

import logoPNG from '../../assets/img/logo.png'
import bannerPNG from '../../assets/img/spelling_bee_banner.png'

const Home = () => {
  const [isModal, setIsModal] = useState(false)
  const [isGame, setIsGame] = useState(false)

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
            <div className='game' />
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
