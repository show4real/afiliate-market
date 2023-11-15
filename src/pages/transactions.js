import React, { useState, useEffect } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { getTransactions } from "src/services/referrerService";
import { Pagination, Input } from "antd";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import moment from "moment";
import ReactDatetime from "react-datetime";

import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datetime/css/react-datetime.css";

const Page = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const [fromdate, setFromDate] = useState(moment().startOf("month"));
  const [todate, setToDate] = useState(moment().endOf("day"));

  useEffect(() => {
    fetchTransactions();
  }, [page, rows, search, fromdate, todate]);

  const onFilter = async (e, filter) => {
    await setFiltering(false);
    await (filter === "fromdate" ? setFromDate(e) : setToDate(e));
    await fetchTransactions();
  };

  const fetchTransactions = () => {
    setLoading(true);
    getTransactions({
      page,
      rows,
      search,
      fromdate,
      todate,
    })
      .then((res) => {
        setTransactions(res.transactions.data);
        setPage(res.transactions.current_page);
        setTotal(res.transactions.total);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const onPageChange = (page, pageSize) => {
    setPage(page);
    setRows(pageSize);
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <Head>
        <title>Customers | Hayzee Computer Resources</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Transactions ({total})</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>

              {/* <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div> */}
            </Stack>
            <Row>
              <Col md={3}>
                <ReactDatetime
                  value={filtering === false ? fromdate : todate}
                  dateFormat={"MMM D, YYYY"}
                  closeOnSelect
                  onChange={(e) => onFilter(e, "fromdate")}
                  inputProps={{
                    disabled: filtering,
                    className: "form-control date-filter",
                  }}
                  isValidDate={(current) =>
                    (current.isBefore(todate) || current.isSame(todate)) &&
                    current.isBefore(moment())
                  }
                  timeFormat={false}
                />
              </Col>
              {"-"}
              <Col md={3}>
                <ReactDatetime
                  value={todate}
                  dateFormat={"MMM D, YYYY"}
                  closeOnSelect
                  onChange={(e) => onFilter(e, "todate")}
                  inputProps={{
                    required: true,
                    className: "form-control date-filter",
                  }}
                  isValidDate={(current) =>
                    (current.isAfter(fromdate) || current.isSame(fromdate)) &&
                    current.isBefore(moment())
                  }
                  timeFormat={false}
                />
              </Col>
            </Row>
            <Card>
              <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>Name</TableCell> */}
                        <TableCell>Item Bought Cost</TableCell>
                        <TableCell>Percentage</TableCell>
                        <TableCell>Amount Received</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.length > 0 &&
                        transactions.map((transaction) => {
                          // const createdAt = format(transaction.created_at, "dd/MM/yyyy");
                          const createdAt = moment(transaction.created_at).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          );
                          return (
                            <TableRow hover key={transaction.id}>
                              {/* <TableCell>{transaction.name}</TableCell> */}
                              <TableCell>
                                {" "}
                                &#8358;{formatNumber(transaction.product_cost)}
                              </TableCell>
                              <TableCell>{transaction.percentage}%</TableCell>
                              <TableCell> &#8358;{formatNumber(transaction.paid)}</TableCell>
                              <TableCell>
                                {transaction.status == 1 ? "Approved" : "Pending"}
                              </TableCell>
                              <TableCell>{createdAt}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                  {transactions.length == 0 && (
                    <div className="text-gray-200 font-md p-16 justify-center">
                      <i className="fa fa-ban" style={{ marginRight: 5 }} />
                      No Transactions Found
                    </div>
                  )}
                  {transactions.length > 0 && (
                    <Pagination
                      total={total}
                      showTotal={(total) => `Total ${total} transactions`}
                      onChange={onPageChange}
                      pageSize={rows}
                      current={page}
                    />
                  )}
                </Box>
              </Scrollbar>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
