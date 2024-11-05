import "./Pagination.scss";
import { IAnimal } from "../../Interfaces/IAnimal.ts";
import { IAssociation } from "../../Interfaces/IAssociation.ts";

import { Pagination } from "react-bootstrap";

interface PaginationProps {
    items: IAnimal[] | IAssociation[];
    handleChangePage: (page: Number /*event: React.MouseEvent<HTMLButtonElement>*/) => void;
    currentPage: Number;
    animalFilterCount: Number | null;
}

const PaginationComposant = ({
    items,
    handleChangePage,
    currentPage,
    animalFilterCount,
}: PaginationProps) => {
    /* Calcule le nombre total de pages en fonction du nombre d'animaux */
    let totalPagesNumber;
    if (animalFilterCount) {
        totalPagesNumber = Math.round(animalFilterCount / 6);
    } else {
        totalPagesNumber = Math.round(items.length / 6);
    }

    /* Crée autant d'élément <li> <button> (bouton des pages) pour le nombre de pages calculés */
    // const pageItems = [];
    // for (let i = 0; i < totalPagesNumber; i++) {
    //     pageItems.push(
    //         <li key={i} className="page-item">
    //             <button onClick={handleChangePage} className="page-link" data-page={i + 1}>
    //                 {i + 1}
    //             </button>
    //         </li>
    //     );
    // }
    const pageItems = [];
    for (let page = 1; page <= totalPagesNumber; page++) {
        pageItems.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handleChangePage(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    return (
        <Pagination>
            <Pagination.Prev
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {pageItems}
            <Pagination.Next
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPagesNumber}
            />
        </Pagination>
        // <nav aria-label="Pages de navigation">
        //     <ul className="pagination">
        //         {pageItems}
        //     </ul>
        // </nav>
    );
};

export default PaginationComposant;
