import React, { Component, Fragment } from "react";
import "..//App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import axios from "axios";
import hello from "hellojs/dist/hello.all.js";
import { Redirect } from "react-router";

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach((val) => val.length > 0 && (count = count + 1));
  return count;
};
const code =
  "OAQABAAIAAAAm-06blBE1TpVMil8KPQ41byBivAWW02PgV06LoSk6YG4fr89OH2Q-SIc12Rul-tdewdbS2ZsC9tftTnvdX7vvDjYNOhO1MpRjiIPji5kJT1nSWtKcIR-nF7vzv9CXyZ5Pi6XFY-3IaT8BjMDzBkVp5xunFPK_qBE1Y6SzGiv-qUa5gkA2dmp7i-0VkfO9zuPb_61YfRWx-6LNFlQVjpxDJiOhI28pRV1_irdSebqFh21mtHmCoLpnA5O2r44-vg3a_81x_gVOS6PoNpIXlOAjAk6hhPpsH5a7m4J7th-nAzsZEgRLqF-2bpL44RKGYb-kFEw9C6_hmJW5XpLdWZqr7P9HCWHZHLYL06ufCGRfZqrULVXitNheDYjhDvl9R4377dLYb9voGbFp625uoezNzG7gvLcpfAOe2zrt_-C2aJ3Oda7_UOYkUjVw90Te1oUPw-yJ6Q9jfG8mENlWyithCU-ON6ck3A5AUOOfUhagJv37-YO4v1klhAOqzBa8gfG2bzLIfJXKYkbcSBwqq_RIQaHNYkTbbJpKuS0y4e30W68hn2sNKqw9uXKUfPUGj3_mfwFcBap9dmE9-EBY7wsSuTMVmJvvO-_ay5qXH02nBP0tgrjwdEBJp8JNHu-O2YZoQ4OAvAT2kEgbQAUe6ztqhG0y9ODlrhp3k0K_SD1KEHyt3ttG8pA-y-TWhDLh9vsgAA";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorCount: null,
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = value != "admin" ? "Username is not valid" : "";
        break;
      case "password":
        errors.password = value != "admin" ? "Password is not valid!" : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSignedIn: true });
    //   	this.setState({errorCount: countErrors(this.state.errors)});

    localStorage.setItem(
      "token",
      "eyJ0eXAiOiJKV1QiLCJub25jZSI6InlSM0VvVzZQb1N1VmNudGJBb1h0d3ZPMHRqQzhIY0YzRGVibkF5ckVkOVkiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0VHVoTUptRDVNN0RMZHpEMnYyeDNRS1NSWSIsImtpZCI6IkN0VHVoTUptRDVNN0RMZHpEMnYyeDNRS1NSWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xNzVjZjE0YS0xOGRhLTQwNGYtOTcwMy04NjNlOGQ4Y2FlNDcvIiwiaWF0IjoxNTg4NTA3NDkyLCJuYmYiOjE1ODg1MDc0OTIsImV4cCI6MTU4ODUxMTM5MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhQQUFBQTdsYU1FL2h4dHd6NkczV1l2b29wZlJQRWtuWWxXcjM5anBZK0x1OGtoUjU1bEhJNmdmWDE3dHdjUFdnNTFOWk5FaGFoeS8zMXhrYmxuL2M5YkhRaXBBPT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6Im15T25lbm90ZUFjY2Vzc0FwcCIsImFwcGlkIjoiMWY0ZGRlZmMtZDg0OS00ZjMwLWE0MTAtNzMyOTdlZDk4NDIyIiwiYXBwaWRhY3IiOiIwIiwiaXBhZGRyIjoiMTgzLjgzLjY3LjE5NyIsIm5hbWUiOiJNeUd1cnVLb29sIERldmVsb3BlciIsIm9pZCI6IjU1MGU0MjJiLThmZmUtNGMzMS1hMGY1LTY4YzRjODQzMmYyNCIsInBsYXRmIjoiMyIsInB1aWQiOiIxMDAzMjAwMEI5RjFEQ0UyIiwic2NwIjoiTm90ZXMuUmVhZC5BbGwgcHJvZmlsZSBvcGVuaWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJYaHBWa0pfQjZ0QkhfWkZmMGZya3lmQVNVMzBzRXJCRFRMRU0tMU8wREcwIiwidGlkIjoiMTc1Y2YxNGEtMThkYS00MDRmLTk3MDMtODYzZThkOGNhZTQ3IiwidW5pcXVlX25hbWUiOiJkZXZAbXlndXJ1a29vbC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJkZXZAbXlndXJ1a29vbC5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJxZVRHWWZVUnMwQ18xdkJNVzVVTUFRIiwidmVyIjoiMS4wIiwieG1zX3N0Ijp7InN1YiI6InpoaEtya2NFVWJQdHVnVWlOSTFoSFprSW9UMFJWbV8wT3BueS1xUDNxV3MifSwieG1zX3RjZHQiOjE1ODc4Mjg0ODJ9.jAyGBSAhuz7Xx8bPhIG0ojoV2sXOANON8ckCxNJnX0_rz1ex5Bf9_n6YM3YHMcbS1F0GQtjk9jeLMFDjK4N2NTs5z3jfo2HAbRsA7eXp_2cBVUtXL1to-m26_cOfGh8yOCoTL71-Oe3TC2x7Trr9fwMIt-uhUjBGhZiRVNMdVyzUTFn8c8QZujtcPSuMJm3lBj_tOQhuNqToidW6fSs0uPcyNks5s3bHlhO6NGUrM0z4Ap9xcpHOWneH5eF99brhkQuhR03fu6e5In_3U1VfZbsJlVdxKxCaUHr2IyXATeByatsf5gKHdKem4q26TBu2FGHfGiDXDlYEH4p82lJ2WQ"
    );

    // const config = {
    //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    // };
    // const bodyParameters = {

    // };
    //   	axios.get("https://graph.microsoft.com/v1.0/groups/1661d94e-9dca-4f38-8e51-7dc96f063c83/onenote/notebooks/1-9e7210a1-77c7-4b10-8a1b-ab0fb4a9f4dd/sections",
    //   		{ params:{}, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    //   	).then( response => {
    //   		console.log(response);
    //   	})
  };

  render() {
    const { errors, formValid } = this.state;
    if (this.state.isSignedIn) {
      // redirect to home if signed up
      return <Redirect to={{ pathname: "/student" }} />;
    }
    return (
      <Fragment>
        <Header />
        <div className="container">
          <div className="row section-nav">
            <div className="col-12">
              <div className="alert alert-success">
                Please sign in using your Microsoft Work or School account.
              </div>
              <button
                className="btn btn-lg btn-submit btn-block"
                type="button"
                onClick={(e): void => {
                  e.preventDefault();
                  let stateNow = (new Date()).toISOString().replace(/[^0-9]/g, "").slice(0, -3);
                  let random   = Math.random().toString(36).substring(7);

                  window.location.href =
                    "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=" + process.env.REACT_APP_CLIENT_ID + "&response_type=id_token%20token&redirect_uri=" + process.env.REACT_APP_OAUTH_REDIRECT_URI + "&response_mode=fragment&scope=openid%20" + process.env.REACT_APP_OAUTH_SCOPES + "&prompt=consent&state=" + stateNow + "&nonce=" + random;
                }}
              >
                Login to the School App
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
