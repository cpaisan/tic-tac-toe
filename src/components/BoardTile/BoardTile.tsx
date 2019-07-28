import React from "react";
import { createUseStyles } from "react-jss";

interface BoardTileProps {
  value?: string;
  onClick?: any;
}

const useStyles = createUseStyles({
  root: {
    height: 40,
    width: 40
  }
});

const BoardTile: React.FC<BoardTileProps> = props => {
  const { value = "", onClick } = props;
  const classes = useStyles();
  return (
    <button className={classes.root} onClick={onClick} disabled={!!value}>
      {value}
    </button>
  );
};

BoardTile.defaultProps = {
  value: ""
};

export default BoardTile;
