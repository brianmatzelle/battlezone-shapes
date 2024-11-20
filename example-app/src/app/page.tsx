"use client";

import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="flex flex-col bg-zinc-900/40 backdrop-blur-sm rounded-xl p-10 items-center justify-center">
        <Typewriter />
      </div>
    </div>
  );
}

const Typewriter = () => {
  return <TypeAnimation 
    className="text-4xl font-bold" 
    sequence={[
      "Hello World!", 1000, 
      "this is the battlezone-shapes demo ≽^•⩊•^≼", 2000,
      "look at the nice stars in the background", 2000,
      "check out the github repo for code examples!", 2000,
      "peace ✌🏻", 2000
    ]} 
    repeat={100}
    speed={50}
  />;
};
