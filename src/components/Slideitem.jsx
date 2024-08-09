import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { goToSlide, nextSlide, prevSlide, sliderData } from '../redux/slider/SliderSlice';
import TypicalText from "./TypicalText"
import { Link } from 'react-router-dom';


export default function Slideitem({scroll}) {
  
    const dispatch = useDispatch()
    const  currentIndex  = useSelector((state) => state.slider.currentIndex);
    const  slides  = useSelector((state) => state.slider.slides);
      
  
  





    useEffect(() => {
        const interval = setInterval(() => {
          dispatch(nextSlide());
        }, 8000); // Change Slide after 8 sec
    
        return () => clearInterval(interval);
      }, [dispatch]);
     
      function handlenextSlides() {
        dispatch(nextSlide())
      }
      function handleprevSlides() {
        dispatch(prevSlide())
      }

    
  return ( 
  
    <section className="relative  h-screen">
      <div className='icons    z-[999]'>
          <div className='z-[999] flex justify-between items-center'>
          <FaArrowLeft onClick={handleprevSlides}  size={50} className='z-[999] text-orange-500 cursor-pointer absolute hidden md:flex  md:left-10 md:top-[50%] border-2 p-2  border-orange-500 rounded-full ' />
          <FaArrowRight onClick={handlenextSlides}  size={50} className='z-[999] text-orange-500 cursor-pointer absolute  hidden md:flex   md:right-10 md:top-[50%] border-2 p-2  border-orange-500 rounded-full' />
          </div>
      </div>
    {slides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0  transition-opacity duration-1000 ${
          currentIndex === index ? 'opacity-100' : 'opacity-0 '
        }`}
      >
        {currentIndex === index && (
          
        <>
        <img src={slide.image} alt={slide.heading} className=" max-w-full w-full h-full object-cover lg:object-top" />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] bg-black bg-opacity-50 text-white py-6  px-8 rounded z-50">
          {/* <h2 className="text-4xl font-bold">{slide.heading}</h2>
           */}
            <TypicalText text={slide.heading} />
          <p className="mt-3">{slide.desc}</p>
          <Link to={"/home/#products"}  onClick={() => scroll()}className="text-center rounded cursor-pointer py-2 px-2 block  w-fit text-md font-semibold mx-auto mt-4 tracking-widest bg-cyan-700 hover:bg-orange-500">Shop Now</Link>
        </div>


     



        </>
        )}
         
       
      </div>
    ))}
     <div className='flex justify-center gap-4 absolute top-[90%] left-[50%] md:top-[80%] md:left-[50%] translate-x-[-50%]'>
     {slides.map((_, index) => (
      
      <div className=''>
         <div key={index} onClick={()=>dispatch(goToSlide(index))} className={ `z-[1000]  relative   w-5 h-5 rounded-full cursor-pointer ${index === currentIndex ? 'bg-orange-500' : 'bg-cyan-600'}`}>
         </div>
      </div>
            
          ))}
     </div>
     
    

     
    </section>
  );
};

    
 
 
  
