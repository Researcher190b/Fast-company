import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import api from "../api";
import GroupList from "./common/groupList";
import SearchStatus from "./ui/searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
// import Search from "./search/search"; // не используется, (2 дня потратил впустую из-за своего решения)

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [letter, setLetter] = useState("");
    const pageSize = 6;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newArray);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfessions(
                Object.assign(data, {
                    allProfessions: { name: "Все профессии" }
                })
            )
        );
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, letter]);

    const handleProfessionSelect = (item) => {
        setLetter("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers =
            selectedProf && selectedProf._id
                ? users.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : letter
                ? users.filter((user) =>
                      user.name.toLowerCase().includes(letter.toLowerCase())
                  )
                : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const handleLetter = (e) => {
            setSelectedProf(undefined);
            setLetter(e.target.value);
        };
        // console.log(letter);

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
                    <input
                        type="text"
                        placeholder="Search..."
                        name="search"
                        value={letter}
                        onChange={handleLetter}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex jystify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
