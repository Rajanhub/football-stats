import React from "react";
import { Club } from "../types";
interface Props {
  data: Club;
}
export default function ClubDetail({ data }: Props) {
  console.log(data);
  return (
    <div className="club_details ">
      <div className="left">
        <img
          src="https://2.bp.blogspot.com/-3-ZCGwpHf2E/T2ndazKevtI/AAAAAAAAAv8/LCJmK13t48c/s1600/Manchester+United.png"
          alt="club_image"
        />
        <div className="club_name">{data.club}</div>
      </div>

      <div className="right">
        <div className="card">
          <div className="card_element">
            <span className="card_title">Win</span>
            <span className="card_value">{data.won}</span>
          </div>
          <div className="card_element">
            <span className="card_title">Loss</span>
            <span className="card_value">{data.lost}</span>
          </div>
          <div className="card_element">
            <span className="card_title">Draw</span>
            <span className="card_value">{data.drawn}</span>
          </div>
          <div className="card_element">
            <span className="card_title">Points</span>
            <span className="card_value">{data.points}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
