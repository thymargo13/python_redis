import React, { useState, useEffect } from 'react';


const Interval = () => {
  const [data, setData] = useState({lat:22.302711, lng:114.177216});
  const url = "http://localhost:8000/api/bus/1/";

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(url, {
        method: 'GET',
        cache: 'default'
    }).then(res => res.json()).then((res)=>{
      setData(({
        lat:res.lat,
        lng:res.lng
      })
      );
    });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
        <p>Lat: {data.lat}</p>
        <span>Lng: {data.lng}</span>
    </div>
  );
};

export default Interval;
