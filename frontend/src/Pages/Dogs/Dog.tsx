import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../../Components/Header';

function Dog() {
  const [dog, setDog] = useState('');
  const [_error, setError] = useState(null);
  const [_loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      const response = await axios.get('https://random.dog/woof.json');
      setDog(response.data.url);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleClick()
  }, [])

  const checkFormat = () => {
    const url = dog.toLowerCase().split('.');
    if (url[2] === 'png' || url[2] === 'jpg' || url[2] === 'jpeg' || url[2] === 'gif') {
      return (
        <img className='h-96 w-96 rounded-md mt-5' src={dog} alt="Cachorro Aleatório" />
      )
    }
    if (url[2] === 'mp4') {
      return (
        <video className='h-96 w-96 rounded-md mt-5' src={dog} controls autoPlay />
      )
    }
  }

  useEffect(() => {
    checkFormat();
  }, [dog]);


  return (
    <div className='min-h-screen w-full bg-gray-900'>
      <Header />
      <div className='w-full flex flex-col items-center mt-5'>

        <button
          onClick={handleClick}
          className='my-2 py-2 px-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40
            text-white font-semibold rounded-lg'>
          <span>Cachorro Aleatório</span>
        </button>

        {checkFormat()}

      </div>
    </div>
  )
}

export default Dog;
