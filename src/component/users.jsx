import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { paginate } from "./utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import api from "../api";
import GroupList from "./groupList";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const count = allUsers.length;
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((date) =>
            setProfessions(
                Object.assign(date, {
                    allProffession: { name: "Всё профессии" }
                })
            )
        );
    }, []);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers =
        selectedProf && selectedProf._id
            ? allUsers.filter((user) => user.profession === selectedProf)
            : allUsers;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    return (
        <>
            {professions && (
                <GroupList
                    selectedItem={selectedProf}
                    items={professions}
                    onItemSelect={handleProfessionSelect}
                />
            )}
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретились, раз</th>
                            <th scope="col">Избранное</th>
                            <th scope="col">оценка</th>
                            <th scope="col">delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User {...rest} {...user} key={user._id} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};
Users.propTypes = {
    users: propTypes.array
};

export default Users;
