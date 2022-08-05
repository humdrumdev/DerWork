import { useEffect,useState } from "react";

const PageSelect = ({pages,active,handleClick}) => {
    const [allpages, setAllpages] = useState([]);
    useEffect
    (() => {    
        // setAllpages(pages);
        
        if(pages < 6)
        {
            const _pages = [];
            for (let index = 1; index <= pages; index++) {
                _pages.push(index);
            }
            setAllpages(_pages);
        }
        else
        {
            const _pages = [];
            for(let i = active-2<1?1:active-2; i<= (active<=3?5:active+2); i++)
            {
                if(i <= pages)
                _pages.push(i);
            }
            setAllpages(_pages);
        }
    }
    , [active]);
    const myhandleClick = (page) => {
        handleClick(page);
    }
    return (
        <nav className="mt-3 mt-sm-0" aria-label="Jobs list pagination">
            <ul className="pagination pxp-pagination">
                {
                    // pages.length>1?
                    // pages.map((page,index)=> {
                    //     return (
                    //         <li key={index}
                    //         //add class active if the page is active
                    //         className={page === activePage ? "page-item active" : "page-item"}
                    //         onClick={()=>{requestJobsData(page),setActivePage(page)}}>
                    //         <span className="page-link">{page}</span>
                    //         </li>
                    //     );
                    // }):null
                    allpages.length>1?
                    allpages.map((page,index)=> {
                        return (
                            <li key={index}
                            //add class active if the page is active
                            className={page === active ? "page-item active" : "page-item"}
                            onClick={()=>{myhandleClick(page)}}>
                            <span className="page-link">{page}</span>
                            </li>
                        );
                    }
                    )
                    :null
                }
            </ul>
        </nav>
    );
}

export default PageSelect;
