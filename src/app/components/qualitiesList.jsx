import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qyalit) => (
                <Quality key={qyalit._id} {...qyalit} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
