import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header';

function Cat() {
  const [endPoint, setEndPoint] = useState('404');

  function getCatByHttp(httpStatus: string) {
    const apiUrl = 'https://http.cat/' + httpStatus;

    setEndPoint(apiUrl);
  }

  useEffect(() => {
    getCatByHttp(endPoint);
  }, [])

  return (
    <>
      <Header />
      <div className='min-h-screen w-full bg-gray-900 flex items-center flex-col'>

        <h1 className='text-gray-400 py-2'>Digite um numero de 100 a 599 para achar um gato !!</h1>
        <input
          className='my-2 py-2 px-5 rounded-md mt-5 bg-gray-700 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none text-gray-400'
          type="text"
          onChange={(e) => setEndPoint(e.target.value)}
          onKeyUp={() => getCatByHttp(endPoint)} />
        <img className='h-96 w-96 rounded-md mt-5' src={endPoint} alt="Foto de um gato" />
      </div>
    </>
  )
}

export default Cat