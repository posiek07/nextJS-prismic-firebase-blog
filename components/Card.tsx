/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Link from 'next/link';

interface CardProps {
  title: string,
  description: string,
  bgImage: string,
  uid: string
}

const Card: React.FC<CardProps> = ({
  title, description, bgImage, uid,
}) => {
  const [hover, setHover] = useState(false);

  const shortDescriptionHandler = (descriptionString, maxLenght) => `${descriptionString.slice(0, maxLenght)}...`;

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className=" m-4 relative bg-center bg-cover bg-gray-50" style={{ height: 300, backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 z-10 transition-all duration-100" style={{ background: hover && 'grey', opacity: !hover ? 0.2 : 0.8 }} />
      <div className="absolute inset-0 z-20 flex flex-col items-start justify-end p-6 transition-all duration-100">
        <h2 className="text-3xl font-bold text-white uppercase font-gopher">{ title }</h2>
        <p className={`text-white ${!hover && 'max-h-0 overflow-hidden opacity-0 pointer-events-none'}`}>{ shortDescriptionHandler(description, 150) }</p>
        <div className={`w-36 ${!hover && 'max-h-0 overflow-hidden opacity-0 pointer-events-none'}`}><Link href={`/blog/${uid}`}><button type="button" style={{ background: 'orange' }} className="flex items-center justify-center text-center rounded-lg transition-all duration-100 py-3 px-3 text-sm  text-white hover:shadow  w-full">Read more</button></Link></div>
      </div>
    </div>
  );
};

export default Card;
