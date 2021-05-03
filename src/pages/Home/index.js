import React, { useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'

import closeCircleFilled from '@iconify/icons-ant-design/close-circle-filled'
import headPhone from '@iconify/icons-ant-design/customer-service-filled'
import { Icon } from '@iconify/react'

import logoPNG from '../../assets/img/logo.png'
import bannerPNG from '../../assets/img/spelling_bee_banner.png'

import { getWord } from '../../utils/getWord'
import { getGrade } from '../../utils/getGrade'

const Home = () => {
  const { speak, voices } = useSpeechSynthesis()

  const [listens, setListens] = useState(4)
  const [time, setTime] = useState(0)
  const [timer, setTimer] = useState(null)
  const [text, setText] = useState('')

  const [word, setWord] = useState('')
  const [words, setWords] = useState([])
  const [level, setLevel] = useState(1)
  const [points, setPoints] = useState(0)
  const [spelling, setSpelling] = useState('')
  const [comparation, setComparation] = useState([])
  const [spellingSize, setSpellingSize] = useState(0)

  const [game, setGame] = useState('')
  const [isModal, setIsModal] = useState(false)

  const handleSpeaking = (word) => {
    const voiceBR = voices.filter(v => 
      v.name === 'Luciana' || v.lang === 'pt-BR'
    )[0]

    if (listens > 0) {
      speak({
        text: word,
        rate: 0.7,
        voice: voiceBR,
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
  }

  const nextWord = () => {
    if (word !== spelling) {
      const beePoints = getGrade(word, spelling, words)
      setComparation(beePoints.comparation)
      setPoints(beePoints.nota)
      setGame('end')
      return
    }

    const newWord = getWord(level + 1)
    setWord(newWord)
    setWords([...words, word])

    setListens(4)
    setLevel(level + 1)
    handleSpeaking(newWord)

    setText('')
    setSpelling('')
    setSpellingSize(0)
  }

  useEffect(() => {
    if (game === 'start') {
      setTime(0)

      const interval = setInterval(() => {
        setTime(t => t + 1)
      }, 1000)
      setTimer(interval)

      const newWord = getWord(1)
      setWord(newWord)
      setWords([word])

      setLevel(1)
      setListens(4)
      handleSpeaking(newWord)

      setText('')
      setSpelling('')
      setSpellingSize(0)
    } else if (game === 'end') {
      clearInterval(timer)
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
                      <h2>Palavra {level}</h2>
                      <Icon
                        icon={headPhone}
                        style={{ fontSize: '35px' }}
                        onClick={() => handleSpeaking(word)}
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
                  <button className='btn-orange' onClick={() => nextWord()}>
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
                    <h3>
                      {word.split('').map((letter, index) => (
                        <span key={index}>
                          {letter}
                        </span>
                      ))}
                    </h3>
                  </div>
                  <div className='wrong'>
                    <h3>
                      {comparation.map((letter, index) => {
                        if (letter[1]) {
                          return (
                            <span key={index}>
                              {letter[0] ? letter[0] : '\xa0'}
                            </span>
                          )
                        }
                        return (
                          <span key={index} className='error'>
                            {letter[0] ? letter[0] : '\xa0'}
                          </span>
                        )
                      })}
                    </h3>
                  </div>
                  <h4>Tempo: {time}</h4>
                </div>

                <div className='description'>
                  <button className='btn-gray' onClick={() => setGame('start')}>
                    <span>Tentar novamente</span>
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
              style={{ fontSize: '25px' }}
              onClick={() => setIsModal(false)}
            />
          </div>
          <div className='modal-body'>
            <p align='justify'>
              O jogo Soletrando é um resultado de um trabalho da matéria Projeto de Algoritmos.<br /><br />Ele utiliza do algoritmo "Edit Distance",
              de programação dinâmica para calcular a pontuação final do usuário.<br /><br />Quanto maior a gravidade do erro, menor sua pontuação.
              O usuário ganha pontos também soletrando corretamente as palavras.<br />< br />
              ** Observação:<br />1) Caso não esteja ouvindo as palavras, tente em outro navegador.< br />2) As vozes são diferentes em cada navegador.<br /><br />
              Navegadores que funcionaram nos testes:<br />- Chrome<br />- Safari<br />- Firefox<br /><br />
              Navegadores que não funcionaram nos testes:<br />- Brave
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
