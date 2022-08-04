import React from "react";
import PropTypes from "prop-types";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete
    // ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретились, раз"
        },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        rate: { path: "rate", name: "оценка" },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
    // return (
    //     <Table
    //         onSort={onSort}
    //         selectedSort={selectedSort}
    //         columns={columns}
    //         data={users}
    //     >
    //         <TableHeader {...{ onSort, selectedSort, columns }} />
    //         <TableBody {...{ columns, data: users }} />
    //     </Table>
    // );
};
UserTable.propTypes = {
    // PropTypes - ошибка; propTypes - верный ответ
    // добавляем типизацию
    users: PropTypes.array.isRequired, // массив пользователей
    onSort: PropTypes.func.isRequired, // функция метода onSort
    selectedSort: PropTypes.object.isRequired, // ...
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
