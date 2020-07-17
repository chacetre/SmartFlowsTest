import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { assets } from "../../data/data";
import ListInformations from "./Components/ListInformations";
import GraphicsInformations from "./Components/GraphicsInformations";
import {
  Card,
  CardHeader,
  Tabs,
  Tab,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import { matchAssets } from "../../data/data";
import { getChange } from "../../request/ConvertAPI";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#7DA2B5",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTab: "list",
      isLoading: false,
      values: {},
      totalWallet: 0,
      currentCount: 10,
    };
  }

  convertToEUro(changeValue, CMValue) {
    return (changeValue * CMValue).toFixed(2);
  }

  getPourcentageValues() {
    for (const asset of Object.keys(this.state.values)) {
      this.setState((prevState) => ({
        values: {
          ...prevState.values, // copy all other key-value pairs of food object
          [asset]: {
            ...prevState.values[asset],
            pourcentage: (
              (100.0 * prevState.values[asset].valueEuros) /
              prevState.totalWallet
            ).toFixed(2),
          },
        },
      }));
    }
  }

  initDefaultValues() {
    this.setState({
      currentCount: 10,
      totalWallet: 0,
    });
  }

  async getData() {
    this.initDefaultValues();

    const assetsValue = Object.keys(assets);

    for (const asset of assetsValue) {
      const response = await getChange(asset, "EUR");

      this.setState((prevState) => ({
        values: {
          ...prevState.values, // copy all other key-value pairs of food object
          [asset]: {
            name: matchAssets[asset].name,
            icon: matchAssets[asset].icon,
            color: matchAssets[asset].color,
            valueCM: assets[asset],
            valueEuros: this.convertToEUro(response["EUR"], assets[asset]),
            pourcentage: 10,
          },
        },
        totalWallet:
          prevState.totalWallet +
          parseFloat(this.convertToEUro(response["EUR"], assets[asset])),
      }));
    }

    this.getPourcentageValues();
    this.interval = setInterval(this.timerUpdateData.bind(this), 1000);
  }

  timerUpdateData() {
    this.setState({
      currentCount: this.state.currentCount - 1,
    });
    if (this.state.currentCount < 1) {
      clearInterval(this.interval);
      this.getData();
    }
  }

  componentWillMount() {
    this.setState({ isLoading: true });
  }

  async componentDidMount() {
    this.getData();
    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChangeTab(newValue) {
    this.setState({ currentTab: newValue });
  }

  render() {
    return (
      <Card style={{ margin: 20 }}>
        <CardHeader
          title="Votre portemonnaie"
          action={
            <StyledTabs
              value={this.state.currentTab}
              indicatorColor="primary"
              textColor="primary"
              aria-label="disabled tabs example"
              onChange={(event, value) => this.handleChangeTab(value)}
            >
              <Tab label="Liste" value="list" style={{ color: "#7DA2B5" }} />
              <Tab
                label="Graphique"
                value="graph"
                style={{ color: "#7DA2B5" }}
              />
            </StyledTabs>
          }
        />
        <CardContent>
          {this.state.isLoading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={80} style={{ color: "#7DA2B5" }} />
            </div>
          )}
          {!this.state.isLoading && (
            <div>
              {this.state.currentTab === "list" && (
                <ListInformations data={this.state.values} />
              )}
              {this.state.currentTab === "graph" && (
                <GraphicsInformations data={this.state.values} />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

export default Wallet;
