import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../images/placeholder.webp";

import api from "../api/api";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const matchedUserIds = matches.map(({ user_id }) => user_id);

  const getMatches = async () => {
    try {
      const response = await api.get("/matches", {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);

  return (
    <div className="matches-container">
      {matchedProfiles?.map((match, index) => (
        <div
          key={index}
          className="match-profile matches"
          onClick={() => setClickedUser(match)}
        >
          <div className="img-container">
            <LazyLoadImage
              effect="blur"
              src={match?.url}
              alt={match?.firstName + "profile"}
              placeholderSrc={placeholder}
            />
          </div>
          <h3>{match?.firstName}</h3>
        </div>
      ))}
    </div>
  );
};

export default MatchesDisplay;
