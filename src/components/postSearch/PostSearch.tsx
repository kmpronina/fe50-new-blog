import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { setSearchStringToStoreFromTMS } from "#store/reducers/blogTMSReducer/actions";
import { useDebounce } from "#hooks/useDebounce";

const PostSearch: React.FC = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedValue = useDebounce(searchValue);

  const handleChangeSearchValue = (e: BaseSyntheticEvent) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    dispatch(setSearchStringToStoreFromTMS(debouncedValue));
  }, [debouncedValue, dispatch]);

  const inputStyle = {
    width: "40%",
    height: "45px",
    fontSize: "18px",
    transition: "0.2s",
    "&>input": {
      padding: "3px",
    },
  };
  return (
    <TextField
      value={searchValue}
      onChange={handleChangeSearchValue}
      sx={inputStyle}
      label={"Search post"}
    />
  );
};

export default PostSearch;
