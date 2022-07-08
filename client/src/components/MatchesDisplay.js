import React from "react";
import api from "../api/api";

const MatchesDisplay = (matches) => {
  const getMatches = async () => {
    try {
      const response = await api.get("/matches", {
        params: {},
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return <div className="matches-container"></div>;
};

export default MatchesDisplay;
