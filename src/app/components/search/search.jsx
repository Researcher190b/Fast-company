import React, { useState } from "react";
// import SearchTextName from "./searchTextName";

// Таблица:

const Search = () => {
    const [data, setData] = useState({ search: "" });

    // универсальный метод для нескольких полей (создание форм):

    const characterSearch = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <form action="">
            {/* <SearchTextName
                placeholder="Search..."
                // type="text"
                name="search"
                value={data.search}
                onChange={characterSearch}
            /> */}
            <div className="container">
                {/* 1-й способ идентификации полей: */}
                {/* <label htmlFor="search">Search...</label>
                    <input type="text" id="search" name="search" /> */}
                {/* 2-й способ идентификации полей: */}
                <label className="row">
                    <input
                        placeholder="Search..."
                        type="text"
                        name="search"
                        value={data.search}
                        onChange={characterSearch}
                    />
                </label>
            </div>
        </form>
    );
};

export default Search;
