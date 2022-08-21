import { useAppDispatch } from "app/hooks";
import React from "react";
import { useEffect } from "react";
import { getMatchAsync } from "./slice";

export default function Club() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMatchAsync());
  }, []);
  return <div>Club</div>;
}
