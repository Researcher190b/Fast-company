import PropTypes from "prop-types";
import React from "react";
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        // handleSort - обработчки сортировки
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort, // selectedSort - выбранная сортировка
                order: selectedSort.order === "asc" ? "desc" : "asc" // asc - по возрастанию, desc - по убыванию
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const renderSortArrow = (selectedSort, currentPath) => {
        if (selectedSort.path === currentPath) {
            if (selectedSort.order === "asc") {
                return <i className="bi bi-caret-down-fill"></i>;
            } else {
                return <i className="bi bi-caret-up-fill"></i>;
            }
            // } else {
            //     return " ";
        }
        return undefined;
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}

                        <span>
                            {renderSortArrow(
                                selectedSort,
                                columns[column].path
                            )}
                        </span>

                        {/* <span>
                            {() =>
                                renderSortArrow(
                                    selectedSort,
                                    columns[column].path
                                )
                            }
                        </span> */}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
