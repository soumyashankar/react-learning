import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

function GitHub() {
    const data = useLoaderData()
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     fetch('https://api.github.com/users/hiteshchoudhary')
    //     .then(response => response.json())
    //     .then(data => {
    //     console.log(data);
    //     setData(data);
    //     }
    // );
        
   // }, [])
    return (
        <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>GitHub Followers: {data?.followers}
        <img src={'https://img.freepik.com/free-photo/beautiful-strawberry-garden-sunrise-doi-ang-khang-chiang-mai-thailand_335224-762.jpg?t=st=1743230692~exp=1743234292~hmac=43157bb38e64c2143448b24793877e4e24012130401c3e682f5196eccc8d1a4f&w=2000'} 
         alt="Git Picture" width={300}/>
        </div>
    )
}

export default GitHub;

export const gitHubInfoLoader = async () => {
   const response = await fetch('https://api.github.com/users/hiteshchoudhary')
   return response.json();
}