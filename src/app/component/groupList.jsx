import React from "react";
import propTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    // if (!Array.isArray(items)) {
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li
                    key={items[item][valueProperty]}
                    className={
                        "list-group-item" +
                        (items[item] === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(items[item])}
                    role="button"
                >
                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
    // }
    // return (
    //     <ul className="list-group">
    //         {items.map((item) => (
    //             <li
    //                 key={item[valueProperty]}
    //                 className={
    //                     "list-group-item" +
    //                     (item === selectedItem ? " active" : "")
    //                 }
    //                 onClick={() => onItemSelect(item)}
    //                 role="button"
    //             >
    //                 {item[contentProperty]}
    //             </li>
    //         ))}
    //     </ul>
    // );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: propTypes.oneOfType(propTypes.object, propTypes.array),
    valueProperty: propTypes.string.isRequired,
    contentProperty: propTypes.string.isRequired,
    onItemSelect: propTypes.func,
    selectedItem: propTypes.object
};

export default GroupList;
