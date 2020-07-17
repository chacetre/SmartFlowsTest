import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core";
import ProgressBar from "../../../components/ProgressBar";
import "./components.css";

class ListInformations extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Table>
        <TableBody>
          {Object.values(this.props.data).map((asset) => (
            <TableRow key={asset}>
              <TableCell scope="row">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={`./logoCM/${asset.icon}`}
                    width="30"
                    className="image-logo"
                  />
                  {asset.name}
                </div>
              </TableCell>
              <TableCell align="right">
                <ProgressBar
                  bgcolor={asset.color}
                  completed={asset.pourcentage < 3 ? 3 : asset.pourcentage}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`${asset.pourcentage}%`}</Typography>
                {this.state.totalEuro}
              </TableCell>
              <TableCell align="right">{asset.valueCM}</TableCell>
              <TableCell align="right">{asset.valueEuros}€</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default ListInformations;
