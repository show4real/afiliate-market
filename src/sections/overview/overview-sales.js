import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import LockOpenIcon from "@heroicons/react/24/solid/LockOpenIcon";

export const OverviewSales = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Account Status
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          {value == "pending" ? (
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <LockClosedIcon />
              </SvgIcon>
            </Avatar>
          ) : (
            <Avatar
              sx={{
                backgroundColor: "green",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <LockOpenIcon />
              </SvgIcon>
            </Avatar>
          )}
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            {/* <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Since last month
            </Typography> */}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewSales.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
