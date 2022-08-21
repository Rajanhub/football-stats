import Modal from "app/components/modal";
import Table from "app/components/Table";
import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClubDetail from "./clubdetails";
import { createData, mapbyClubname } from "./helper";
import {
  getMatchAsync,
  selectError,
  selectMatchList,
  selectstatus,
} from "./slice";
import { Match } from "./types";

const initialData = {
  club: "",
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  gf: 0,
  ga: 0,
  gd: 0,
  points: 0,
  forms: [],
};

export default function Club() {
  const dispatch = useAppDispatch();
  const matchList = useAppSelector(selectMatchList);
  const error = useAppSelector(selectError);
  const status = useAppSelector(selectstatus);

  const [dataList, setDataList] = useState<any>([]);
  const [clubData, setClubData] = useState(initialData);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getMatchAsync());
  }, []);

  useEffect(() => {
    toast.error(error);
  }, [error]);
  useEffect(() => {
    if (!matchList) return;
    const clubCategory = mapbyClubname(matchList);
    const clubdata = [];
    for (const [key, value] of Object.entries(clubCategory)) {
      const clubStats = createData(key, value as Match[]);
      clubdata.push(clubStats);
    }
    setDataList(clubdata.sort((a, b) => b.points - a.points));
  }, [matchList]);

  const handleClick = (data: any) => {
    setClubData(data);
    setIsOpen(true);
  };
  const data = React.useMemo(
    () => dataList,

    [dataList]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Position",
        id: "position",
        accessor: (_: any, id: any) => {
          return id + 1;
        }, // accessor is the "key" in the data
      },

      {
        id: "club",
        Header: "Club",
        accessor: (value, id) => {
          return (
            <div className="club">
              <img
                src="https://2.bp.blogspot.com/-3-ZCGwpHf2E/T2ndazKevtI/AAAAAAAAAv8/LCJmK13t48c/s1600/Manchester+United.png"
                className="image"
                alt="club_icon"
              />
              <span className="title" onClick={(e) => handleClick(value)}>
                {value.club}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Played",
        accessor: "played",
      },
      {
        Header: "Won",
        accessor: "won",
      },
      {
        Header: "Drawn",
        accessor: "drawn",
      },
      {
        Header: "Lost",
        accessor: "lost",
      },
      {
        Header: "GF",
        accessor: "gf",
      },
      {
        Header: "GA",
        accessor: "ga",
      },
      {
        Header: "GD",
        accessor: "gd",
      },
      {
        Header: "Points",
        accessor: "points",
      },
      {
        id: "forms",
        Header: "Forms",
        accessor: (value: any, id: any) => {
          return (
            <div className="club__stats">
              {value.forms.map((el: any) => (
                <div className={`box box--${el}`}>
                  <div className={`stats`}>{el}</div>
                </div>
              ))}
            </div>
          );
        },
      },
    ],

    []
  );
  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ClubDetail data={clubData} />
      </Modal>
      <Table data={data} columns={columns} />
    </div>
  );
}
