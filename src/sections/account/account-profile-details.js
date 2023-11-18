import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import settings from "src/services/settings";
import { authService } from "src/services/authService";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { notification, Input, Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { getReferrer } from "src/services/referrerService";
import SpinDiv from "src/components/SpinDiv";

export const AccountProfileDetails = () => {
  const [referrer, setReferrer] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account_number, setAccountNumber] = useState(0);
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    email: "",
    account_name: "",
    account_type: "",
    bank_name: "",
  });
  const [errors, setErrors] = useState({
    name: "",
  });

  const [referral_code, setReferralCode] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(referral_code);
    notification.success({
      message: "Referrer Code Copied!",
      description: "Code copied to the clipboard.",
      style: { marginTop: 30 },
    });
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setAccountNumber(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const validate = (name, value) => {
    switch (name) {
      case "phone":
        return !value ? "Phone is required" : "";
      case "account_number":
        return !value ? "Account Number is required" : "";
      case "account_name":
        return !value ? "Account name is required" : "";
      case "bank_name":
        return !value ? "Bank Name is required" : "";
      case "account_type":
        return !value ? "Account Type is required" : "";
      default:
        return "";
    }
  };

  useEffect(() => {
    fetchReferrer();
  }, []);

  const fetchReferrer = () => {
    setLoading(true);
    getReferrer()
      .then((res) => {
        setReferrer(res.referrer);
        setFields({
          name: res.referrer.name,
          phone: res.referrer.phone,
          email: res.referrer.email,
          account_name: res.referrer.account_name,
          account_type: res.referrer.account_type,
          bank_name: res.referrer.bank_name,
        });

        setAccountNumber(res.referrer.account_number);
        setReferralCode(res.referrer.referral_code);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(fields).forEach((name) => {
      const error = validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });

    console.log(account_number);

    if (account_number == ("" || null)) {
      validationErrors.account_number = "Account Number is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    const data = new FormData();
    data.set("account_name", fields.account_name);
    data.set("bank_name", fields.bank_name);
    data.set("account_type", fields.account_type);
    data.set("phone", fields.phone);
    data.set("account_number", account_number);

    return axios
      .post(
        `${settings.API_URL}referrer/update/profile`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        },
        authService.handleResponse
      )
      .then((res) => {
        setSaving(false);
        notification.success({
          message: "Account Settings Saved",
          description: "Your Profile has been updated.",
          style: {
            marginTop: "50px", // Adjust the value as needed
          },
        });
      })
      .catch((err) => {
        console.error(err);
        setSaving(false);
      });
  };

  return (
    <>
      {loading && <SpinDiv />}
      {!loading && referrer && (
        <form autoComplete="off">
          <Card>
            <CardHeader subheader="The information can be edited" title="Profile" />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ m: -1.5 }}>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <Input
                      placeholder="Enter a value"
                      value={referrer.status == 1 ? referral_code : "Pending approval"}
                      onChange={(e) => setReferralCode(e.target.value)}
                      disabled
                      suffix={
                        referrer.status == 1 && (
                          <Button icon={<CopyOutlined />} onClick={handleCopy} />
                        )
                      }
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      // onChange={handleChange}
                      // required
                      value={fields.name}
                      disabled
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      // onChange={handleChange}
                      // required
                      value={referrer.email}
                      disabled
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      onChange={handleChange}
                      type="number"
                      value={fields.phone}
                    />
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {errors.phone}
                      </span>
                    </div>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      name="account_number"
                      onChange={handleAccountChange}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={account_number}
                    />
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {errors.account_number}
                      </span>
                    </div>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Account Name"
                      name="account_name"
                      onChange={handleChange}
                      type="text"
                      value={fields.account_name}
                    />
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {errors.account_name}
                      </span>
                    </div>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Account Type"
                      helperText="Please specify Account Type either Savings or Current"
                      name="account_type"
                      onChange={handleChange}
                      type="text"
                      value={fields.account_type}
                    />
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {errors.account_type}
                      </span>
                    </div>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Bank Name"
                      name="bank_name"
                      onChange={handleChange}
                      type="text"
                      value={fields.bank_name}
                    />
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {errors.bank_name}
                      </span>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                size={"large"}
                style={{
                  backgroundColor: "#694DE0",
                  borderColor: "#694DE0",

                  color: "#fff",
                  fontWeight: "bold",
                }}
                onClick={handleSubmit}
              >
                {saving ? (
                  <>
                    {" "}
                    <div className="mr-2 border-t-transparent border-solid animate-spin rounded-full border-white border-8 h-5 w-5" />
                    <span>saving...</span>
                  </>
                ) : (
                  <span className="text-lg font-bold"> Save details</span>
                )}
              </Button>
            </CardActions>
          </Card>
        </form>
      )}
    </>
  );
};
