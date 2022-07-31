import React from "react";
import propTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    // console.log(Object.keys(items));

    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li
                    key={items[item][valueProperty]}
                    className={
                        "list-group-item" +
                        (items[item] === selectedItem ? "active " : "")
                    }
                    // className="list-group-item"
                    onClick={() => onItemSelect(items[item])}
                    role="button"
                >
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    // items: propTypes.object.isRequired, // прошлый код

    // =====================================
    // =        Добавить по заданию        =
    // =====================================

    item: propTypes.oneOfType(propTypes.object, propTypes.array),

    // ======================================

    valueProperty: propTypes.string.isRequired,
    contentProperty: propTypes.string.isRequired,
    onItemSelect: propTypes.func,
    selectedItem: propTypes.object
};

export default GroupList;
