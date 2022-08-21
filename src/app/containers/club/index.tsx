import Modal from "app/components/modal";
import Table from "app/components/Table";
import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createData, mapbyClubname } from "./helper";
import { getMatchAsync, selectMatchList } from "./slice";
import { Match } from "./types";

export default function Club() {
  const dispatch = useAppDispatch();
  const matchList = useAppSelector(selectMatchList);

  const [dataList, setDataList] = useState<any>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getMatchAsync());
  }, []);

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
    setIsOpen((isOpen) => !isOpen);
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
              {/* //image */}
              <span onClick={(e) => handleClick(value)}>{value.club}</span>
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
          return <div>kk</div>;
        },
      },
    ],

    []
  );
  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        hello
      </Modal>
      <Table data={data} columns={columns} />
    </div>
  );
}
