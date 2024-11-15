import "./Pagination.scss";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
    items: number;
    handleChangePage: (page: Number) => void;
    currentPage: number;
    animalsFilterCount?: number | null;
}

const PaginationComposant = ({
    items,
    handleChangePage,
    currentPage,
    animalsFilterCount,
}: PaginationProps) => {
    /* Calcule le nombre total de pages en fonction du nombre d'animaux */
    let totalPagesNumber;
    if (animalsFilterCount) {
        totalPagesNumber = Math.ceil(animalsFilterCount / 6);
    } else {
        totalPagesNumber = Math.ceil(items / 6);
    }
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
    if (totalPagesNumber === 1) {
        return (
            <Pagination>
                <Pagination.Item disabled>1</Pagination.Item>
            </Pagination>
        );
    }
    return (
        <Pagination>
            <Pagination.Prev
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {/* Affiche la première page */}
            <Pagination.Item
                onClick={() => handleChangePage(1)}
                active={currentPage === 1}
                onMouseDown={(e) => e.preventDefault() /* Supprime le focus au clic*/}
            >
                1
            </Pagination.Item>
            {/* Affiche un ellipsis si nécessaire */}
            {currentPage > 3 && <Pagination.Ellipsis />}
            {/* Affiche la page précédente de la current page si nécessaire */}
            {currentPage > 2 && (
                <Pagination.Item
                    onClick={() => handleChangePage(currentPage - 1)}
                    onMouseDown={(e) => e.preventDefault() /* Supprime le focus au clic*/}
                >
                    {currentPage - 1}
                </Pagination.Item>
            )}
            {/* Affiche la page actuelle */}
            {currentPage !== 1 && currentPage !== totalPagesNumber && (
                <Pagination.Item active>{currentPage}</Pagination.Item>
            )}
            {/* Affiche la page suivante de la current page si nécessaire */}
            {currentPage < totalPagesNumber - 1 && (
                <Pagination.Item
                    onClick={() => handleChangePage(currentPage + 1)}
                    onMouseDown={(e) => e.preventDefault() /* Supprime le focus au clic*/}
                >
                    {currentPage + 1}
                </Pagination.Item>
            )}
            {/* Affiche un ellipsis si nécessaire */}
            {currentPage < totalPagesNumber - 2 && <Pagination.Ellipsis />}
            {/* Affiche la dernière page */}
            {totalPagesNumber > 1 && (
                <Pagination.Item
                    onClick={() => handleChangePage(totalPagesNumber)}
                    active={currentPage === totalPagesNumber}
                    onMouseDown={(e) => e.preventDefault() /* Supprime le focus au clic*/}
                >
                    {totalPagesNumber}
                </Pagination.Item>
            )}
            <Pagination.Next
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPagesNumber}
            />
        </Pagination>
    );
};

export default PaginationComposant;
