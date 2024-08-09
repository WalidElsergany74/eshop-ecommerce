import React, { useState } from 'react'

export default function Pagination({currentPage,
    setCurrentPage,
    productsPerPage,
    totalProducts,}) {

        const pageNumbers = [];
        const totalPages = totalProducts / productsPerPage;
        // Limit the page Numbers shown
        const [pageNumberLimit] = useState(5);
        const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
        const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

            // Paginate
        const paginate = (pageNumber) => {
          setCurrentPage(pageNumber);
        };
      
        // GO to next page
        const paginateNext = () => {
          setCurrentPage(currentPage + 1);
          // Show next set of pageNumbers
          if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
          }
        };
      
        // GO to prev page
        const paginatePrev = () => {
          setCurrentPage(currentPage - 1);
          // Show prev set of pageNumbers
          if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
          }
        };
      
    
      
        for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
          pageNumbers.push(i);
          console.log(i)
        }

  return (
    <nav aria-label="Page navigation example ">
    <ul className="flex items-center justify-center mt-10 pt-10 -space-x-px h-10 text-base" >
      
      <li onClick={paginatePrev} className={`${currentPage === pageNumbers[0] ? "hidden" : "z-10 cursor-pointer transition-all active:bg-orange-500 flex items-center justify-center px-4 h-10 leading-tight 0 border border-gray-400 hover:bg-orange-500 hover:text-white"}`}>Prev</li>
      {pageNumbers.map((number) => {
        if(number < maxPageNumberLimit +1 &&  number > minPageNumberLimit) {

            return (
            
                <li>
                <button onClick={() => paginate(number)} className={`${currentPage === number ? "bg-orange-500 z-10 transition-all  flex items-center justify-center px-4 h-10 leading-tight 0 border border-gray-400 hover:bg-orange-500 hover:text-white" : "z-10 active:bg-orange-500 flex items-center justify-center px-4 h-10 leading-tight 0 border border-gray-400 hover:bg-orange-500 hover:text-white"}`}>{number}</button>
              </li>
                  )
        }
       
      })}
    
     <li onClick={paginateNext} className={`${currentPage === pageNumbers[pageNumbers.length - 1] ? "hidden" : "transition-all z-10 cursor-pointer active:bg-orange-500 flex items-center justify-center px-4 h-10 leading-tight 0 border border-gray-400 hover:bg-orange-500 hover:text-white"}`}>Next</li>
    <p className='text-orange-500'>
        <b className='ml-4 '>{`Page ${currentPage}`}</b>
        <span className='ml-2 text-darkblue'>of</span>
        <b className='ml-2 text-darkblue'>{`${Math.ceil(totalPages)}`}</b>
    </p>
    </ul>
  </nav>
  )
}
