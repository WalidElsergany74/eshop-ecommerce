import { createSlice } from "@reduxjs/toolkit";

export const sliderData = [
    {
      image: "https://i.ibb.co/CBGRLhG/bg-4.jpg",
      heading: "Shoes Villa",
      desc: "Up to 30% off on all onsale products.",
    },
    {
      image: "https://i.ibb.co/cDLBk5h/bg-1.jpg",
      heading: "Women Fashion",
      desc: "Up to 30% off on all onsale products.",
    },
    {
      image: "https://i.ibb.co/HXjD3V0/bg-2.jpg",
      heading: "Men Fashion",
      desc: "Up to 30% off on all onsale products.",
    },
    {
      image: "https://i.ibb.co/H2FRmtV/bg-3.jpg",
      heading: "Awesome Gadgets",
      desc: "Up to 30% off on all onsale products.",
    },
  ];
  
  const initialState = {
    currentIndex: 0,
    slides: sliderData,
  };
  
  const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
      nextSlide: (state) => {
        // state.currentIndex = (state.currentIndex + 1) % state.slides.length;
        
        state.currentIndex = state.currentIndex === state.slides.length -1 ? 0 : state.currentIndex + 1     
     },
      prevSlide: (state) => {
        // state.currentIndex = (state.currentIndex - 1) % state.slides.length;
        state.currentIndex =   state.currentIndex === 0 ? state.slides.length -1 : state.currentIndex -1
      },
      goToSlide: (state, action) => {
        state.currentIndex = action.payload;
      },
    },
  });
  
  export const { nextSlide , prevSlide , goToSlide } = sliderSlice.actions;
  export default sliderSlice.reducer;