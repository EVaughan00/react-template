import React, {
  FunctionComponent
} from "react";
import { RouteProps } from "react-router-dom";
import { WithNavigation } from "../../../providers/NavigationProvider";

interface Props extends RouteProps {
}

const Dashboard: FunctionComponent<Props> = (props) => {

  return (
      <div />
  );
};

export default WithNavigation(Dashboard);
