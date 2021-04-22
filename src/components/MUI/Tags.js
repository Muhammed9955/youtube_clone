/* eslint-disable no-use-before-define */
import React from "react";
// import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
    marginTop: "1.5rem",
  },
}));

export default function Tags({ options, label, setSelectedOptions }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        size="small"
        id="tags-outlined"
        options={Areas}
        getOptionLabel={(option) => option}
        // defaultValue={[top100Films[0]]}
        filterSelectedOptions
        onChange={(event, newValue) => {
          setSelectedOptions(newValue);
          //   console.log({ newValue });
          //   console.log({ newValue });
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              //   onChange={handleChange}
              variant="outlined"
              label={label}
              placeholder="Nasr City"
            />
          );
        }}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Areas = [
  "Heliopolis",
  "Nasr City",
  "El-Maadi",
  "New Cairo",
  "Hadayek El-Kobba",
  "El-Obour City",
  "El-Manyal",
  "Shoubra",
  "West El-Balad",
  "10th of Ramadan",
  "Ain Shams",
  "Boulaq",
  "Dar El-Salam",
  "El Salam City",
  "El-Abbasia",
  "El-Kattameya",
  "1st sttelment",
  "2nd settlement ",
  "3rd settlement ",
  "4th settlement ",
  "5th settlement ",
  "6th of October",
  "Dokki",
  "Mohandessin",
  "El-Haram",
  "Faisal",
  "El-Sheikh Zayed",
  "Hadayek El-Ahram",
  "El-Agouza",
  //   { title: "Heliopolis",  },
];
