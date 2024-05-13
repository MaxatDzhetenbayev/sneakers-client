import React from "react";
const buttonStyle = {
  borderRadius: "100%",
  backgroundColor: "transparent",
  border: "0.5px solid #9dd558",
  cursor: "pointer",
  padding: "4px 8px",
  color: "#9dd558",
};

export const Counter = ({ count, onAdd, onRemove }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "10px",
        alignItems: "center",
      }}
    >
      <button onClick={onRemove} style={buttonStyle}>
        -
      </button>
      <p>{count}</p>
      <button onClick={onAdd} style={buttonStyle}>
        +
      </button>
    </div>
  );
};
