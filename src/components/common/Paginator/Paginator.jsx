import React, { useState } from 'react';
import s from './Paginator.module.css'

const Paginator = ({usersAmount, usersOnPage, onPageChanged, currentPage, portionSize = 10}) => {
    let pagesCount = Math.ceil(usersAmount / usersOnPage);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let portionLeftPageNumber = (portionNumber - 1) * portionSize + 1;
    let portionRightPageNumber = portionNumber * portionSize;

    return (
        <div className={s.paginator}>
            {portionNumber > 1 && 
            <button className={s.paginatorBtn} onClick={() => {setPortionNumber(portionNumber - 1)}} >PREV</button>}

           <div className={s.pages}>
                {pages
                .filter(p => p >= portionLeftPageNumber && p <= portionRightPageNumber)
                .map(p => {
                    return <span onClick={() => { onPageChanged(p) }} className={currentPage === p ? s.selectedPage : s.page}>{p + ' '}</span>
                })}
           </div>    

            {portionNumber < portionCount && 
            <button className={s.paginatorBtn} onClick={() => {setPortionNumber(portionNumber + 1)}} >NEXT</button>}
        </div>
    )
}

export default Paginator;