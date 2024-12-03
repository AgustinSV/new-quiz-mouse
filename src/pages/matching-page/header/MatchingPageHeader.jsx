import React from "react";

const MatchingPageHeader = () => {
    return (
        <header style={headerStyle}>
            <h1 style={titleStyle}>Matching Game</h1>
            <p style={subtitleStyle}>Select the question then the answer</p>
        </header>
    );
};

const headerStyle = {
    textAlign: "center",
    margin: "20px 0",
    padding: "10px",
    backgroundColor: "#7197C3",
    color: "#fff",
    borderRadius: "8px",
};

const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
};

const subtitleStyle = {
    fontSize: "16px",
    fontStyle: "italic",
};

export default MatchingPageHeader;
