import Head from "next/head";
import { useState, useEffect } from "react";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";

import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { getDashboard, getReferrer } from "src/services/referrerService";
import { OverviewSales } from "src/sections/overview/overview-sales";
import Coupon from "src/components/Coupon";

const now = new Date();

const Page = () => {
  const [earnings, setEarnings] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [referrer, setReferrer] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    fetchDashboard();
    fetchReferrer();
  }, []);

  const fetchDashboard = () => {
    setLoading(true);
    getDashboard({})
      .then((res) => {
        setTransactions(res.total_transactions);
        setEarnings(res.total_earnings);
        setStatus(res.status);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const fetchReferrer = () => {
    setLoading(true);
    getReferrer()
      .then((res) => {
        setReferrer(res.referrer);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Head>
        <title>Overview | Hayzee Computer Resources</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <div class="notification-card" style={{ marginBottom: 50 }}>
            <h2>Welcome onboard!</h2>
            <p style={{ color: "darkblue" }}>
              You are encouraged to share your referrer/Coupon code with family and friends for them
              to get a discount and also earn 5% on each order they make. All they need to do is
              tender your referrer code at the point of purchase.
            </p>
            <p>
              {referrer && referrer.status == 1 && (
                <>
                  Code:{" "}
                  <span class="referrer-code" style={{ textTransform: "uppercase" }}>
                    {referrer.referral_code}
                  </span>
                </>
              )}
            </p>
          </div>
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={`${transactions}`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={`${earnings}`}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewSales difference={12} positive sx={{ height: "100%" }} value={`${status}`} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}></Grid>
            {referrer && referrer.status == 1 && (
              <Grid xs={12} sm={6} lg={3}>
                <Coupon referrer={referrer} />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
