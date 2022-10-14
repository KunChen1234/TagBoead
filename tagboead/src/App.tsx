import React from 'react';
import './App.css';
import Clock from './comment/Clock';
import Footer from './comment/Footer';
import useSocket from './context/socket';
import Personalinfo from './personnalinfo';
import Section from './section';
import useWindowDimensions from './comment/hooks/windowDimensions';
function App() {
  const window=useWindowDimensions();
  console.log(window.height);
  console.log(window.width)
  const body_height=window.height-100-35;
  return (
    <div className=' bg-black h-screen '>
      {/* head */}
      <div className='bg-white row-span-1 h-fit'>
      <div className="bg-roobuck-blue grid grid-cols-3 gap-2 h-[100px]">
        <div className="text-white text-sm pl-1">wifi</div>
        <div className="text-center ">
          <p className="text-white text-sm">Roobuck</p>
        </div>
        <div className="grid grid-flow-3 text-white text-sm text-right">
          <div className="row-span-2 text-sm pr-1">bb</div>
          <div className="mb-0 pr-1"><Clock timer={10000} /></div>
        </div>
      </div>
      </div>
      {/* body */}
      <div className="row-span-1 bg-black  text-center gap-[2px] pb-4"style={{ overflowY: 'auto', height:body_height}}>
        <Section></Section>
      </div>
{/* feet */}
      <div className=' bg-roobuck-blue h-fit'>
        <Footer version={''}></Footer>
        </div>

    </div>);
}
export default App;
