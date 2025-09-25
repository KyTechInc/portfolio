'use client'

import Image from 'next/image'
import Bottom from "@/images/devices/Case Bot.svg"
import Top from "@/images/devices/Case Top.svg"
import TopOpen from "@/images/devices/Case Top Open.svg"
import Left from "@/images/devices/Airpod Left.svg"
import Right from "@/images/devices/Airpod Right.svg"

export default function AirpodsLG() {
  return (
    <div className="relative w-[75px] h-[75px] cursor-pointer group transform-gpu origin-bottom-left scale-[1.6]">
      {/* Bottom Case Layer - Back */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src={Bottom} 
          width={325}
          height={281}
          alt="AirPods Case Bottom" 
          className="w-full object-contain"
        />
      </div>

      {/* AirPods Layer */}
      <div 
        className="absolute inset-0 flex justify-center z-10"
      >
        <Image 
          src={Left} 
          alt="Left AirPod" 
          width={25}
          height={25}
          className="absolute -translate-x-[15px] object-contain opacity-0 translate-y-0 group-hover:-translate-y-[70px] group-hover:opacity-100 transition-all duration-500 ease-in-out"
        />
        <Image 
          src={Right} 
          alt="Right AirPod" 
          width={25}
          height={25}
          className="absolute translate-x-[15px] object-contain opacity-0 translate-y-0 group-hover:-translate-y-[60px] group-hover:opacity-100 transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Bottom Case Layer - Front */}
      <div className="absolute inset-0 z-100">
        <Image 
          src={Bottom} 
          width={325}
          height={281}
          alt="AirPods Case Bottom" 
          className="w-full object-contain shadow-sm rounded-b-2xl"
        />
      </div>

      {/* Top Case Layer - Closed */}
      <div 
        className="absolute inset-0 transition-opacity duration-200 opacity-100 group-hover:opacity-0 ease-in-out"
      >
        <Image 
          src={Top} 
          width={150}
          height={150}
          alt="AirPods Case Top Closed" 
          className="w-full -translate-y-[22px] object-contain shadow-sm rounded-t-2xl"
        />
      </div>

      {/* Top Case Layer - Open */}
      <div 
        className="absolute inset-0 transition-opacity duration-100 opacity-0 group-hover:opacity-100 ease-in-out"
      >
        <Image 
          src={TopOpen} 
          width={150}
          height={150}
          alt="AirPods Case Top Open" 
          className="w-full -translate-y-[28px] object-contain"
        />
      </div>
    </div>
  )
}

