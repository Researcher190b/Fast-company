import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { paginate } from "./utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
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

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers =
        selectedProf && selectedProf._id
            ? allUsers.filter((user) => {
                  return (
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
                  );
              })
            : allUsers;

    // console.log(filteredUsers); // выводим массив

    const count = filteredUsers.length;
    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink bd-highlight p-4">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
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
            </div>
            <div className="d-flex jystify-content-center"></div>
        </div>
    );
};

Users.propTypes = {
    users: propTypes.array
};

export default Users;
