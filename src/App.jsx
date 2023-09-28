import React, { useEffect, useState } from 'react';
import { BsSearch } from "react-icons/bs";

const App = () => {

  const [allData, setAllData] = useState([]);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    fetch('https://api.punkapi.com/v2/beers')
      .then(res => res.json())
      .then(data => {
        setAllData(data)
        setInitialData(data)
      })
  }, [])


  const [title, setTitle] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    const filtered = initialData.filter(item => {
      return item.name.toLowerCase().startsWith(title.toLocaleLowerCase());
    })
    setAllData(filtered)
  }

  return (
    <div>
      {/* search section */}
      <form onSubmit={handleSubmit} className='my-10 flex justify-center'>
        <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
        <button type='submit' className="btn btn-warning">
          <BsSearch></BsSearch>
        </button>
      </form>


      {/* display all card section */}
      <div className='grid md:grid-cols-3 gap-4'>
        {
          allData.map(item => <div key={item.id} className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img className='h-[200px]' src={item.image_url} alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <div>{item.description.length >= 40 ? <p>{item.description.slice(0, 40)} ...</p> : item.description}</div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default App;