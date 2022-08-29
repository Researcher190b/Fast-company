// ========================== не используется ==========================

import React, { useState } from "react";
import PropTypes from "prop-types";

// Таблица:

const Search = () => {
    const [search, setsearch] = useState({ search: "" });

    // универсальный метод для нескольких полей (создание форм):

    const characterSearch = ({ target }) => {
        setsearch((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                {/* 2-й способ идентификации полей: */}
                {/* <label className="row" type="submit"> */}
                <div className="row">
                    <input
                        placeholder="Search..."
                        type="text"
                        name="search"
                        value={search.search}
                        onChange={characterSearch}
                    />
                </div>
                {/* </label> */}
            </div>
        </form>
    );
};

Search.propTypes = {
    value: PropTypes.array
};

export default Search;
