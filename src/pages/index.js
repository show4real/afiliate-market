import Head from "next/head";
import { useState, useEffect } from "react";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";

import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { getDashboard } from "src/services/referrerService";

const now = new Date();

const Page = () => {
  const [earnings, setEarnings] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = () => {
    setLoading(true);
    getDashboard({})
      .then((res) => {
        setTransactions(res.total_transactions);
        setEarnings(res.total_earnings);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
          py: 8,
        }}
      >
        <Container maxWidth="xl">
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
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
