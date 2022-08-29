import React from "react";
import Quality from "./ui/quality";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    name,
    _id,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onToggleBookMark,
    onDelete
}) => {
    return (
        <tr>
            <td>{name}</td>

            <td>
                {qualities.map((qyalit) => (
                    <Quality key={qyalit._id} {...qyalit} />
                ))}
            </td>

            <td>{profession.name}</td>

            <td>{completedMeetings}</td>

            <td>
                <BookMark
                    status={bookmark}
                    onClick={() => onToggleBookMark(_id)}
                />
            </td>

            <td>
                {rate} / {"5"}
            </td>

            <td>
                <button
                    onClick={() => onDelete(_id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    bookmark: PropTypes.bool,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
