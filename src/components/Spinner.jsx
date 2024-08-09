import React from 'react'
import { ScaleLoader } from 'react-spinners'

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center  h-screen justify-center bg-slate-200/20 backdrop-blur-sm z-50">
  <ScaleLoader
  color="orange"
   
  cssOverride={{}}
  height={50}
  loading={5}
  margin={3}
  radius={3}
  speedMultiplier={1}
  width={6}
/>
    </div>
  )
}
