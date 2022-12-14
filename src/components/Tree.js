import React, { useEffect } from "react";
import axios from "axios";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import jwt_decode from "jwt-decode";
import * as CONSTANTS from "../Constants";

const DASHBOARD_UUID = CONSTANTS.TREE_DASHBOARD_UUID;
const SUPERSET_DOMAIN = CONSTANTS.SUPERSET_DOMAIN;

async function getAccessToken() {
  const login_url = "api/v1/security/login";
  const login_payload = {
    password: "Test@123",
    provider: "db",
    refresh: true,
    username: "admin",
  };
  const response = await axios.post(login_url, login_payload);
  // .then((res) => {
  //   localStorage.setItem("access_token", res.data.access_token);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  localStorage.setItem("access_token", response.data.access_token);
}

async function getGeustToken() {
  const guest_token_url = "api/v1/security/guest_token/";

  const guest_token_payload = {
    user: {
      username: "admin",
      first_name: "admin",
      last_name: "user",
    },
    resources: [
      {
        type: "dashboard",
        id: DASHBOARD_UUID,
      },
    ],
    rls: [],
  };

  // check if we have access token
  const access_token = localStorage.getItem("accessToken");
  if (
    !access_token ||
    jwt_decode(localStorage.getItem("access_token")).exp * 1000 < Date.now()
  ) {
    await getAccessToken();
  }

  const headers = {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  const response = await axios.post(
    guest_token_url,
    guest_token_payload,
    headers
  );
  // .then((response) => {
  //   console.log(response);
  //   localStorage.setItem("tree_guest_token", response.data.token);
  // })
  // .catch((err) => {
  // if (err.data.message === "Token Expired") {
  //   getAccessToken();
  // }
  // });
  localStorage.setItem("tree_guest_token", response.data.token);
}

const Tree = () => {
  useEffect(() => {
    async function fetchTokens() {
      if (
        !localStorage.getItem("tree_guest_token") ||
        jwt_decode(localStorage.getItem("tree_guest_token")).exp * 1000 <
          Date.now()
      ) {
        await getGeustToken();
        embedDashboard({
          id: DASHBOARD_UUID, // given by the Superset embedding UI
          supersetDomain: SUPERSET_DOMAIN,
          mountPoint: document.getElementById("container"), // any html element that can contain an iframe
          fetchGuestToken: () => localStorage.getItem("tree_guest_token"),
          dashboardUiConfig: {
            hideTitle: true,
            show_filters: 0,
          }, // dashboard UI config: hideTitle, hideTab, hideChartControls (optional)
        }).then((response) => {
          console.log("Response of embed fun...", response);
        });
      } else {
        embedDashboard({
          id: DASHBOARD_UUID, // given by the Superset embedding UI
          supersetDomain: SUPERSET_DOMAIN,
          mountPoint: document.getElementById("container"), // any html element that can contain an iframe
          fetchGuestToken: () => localStorage.getItem("tree_guest_token"),
          dashboardUiConfig: {
            hideTitle: true,
            show_filters: 0,
          }, // dashboard UI config: hideTitle, hideTab, hideChartControls (optional)
        }).then((response) => {
          console.log("Response of embed fun", response);
        });
      }
    }
    fetchTokens();
  }, []);
};

export default Tree;
