import React, { useState } from "react";
import { Card, Tooltip, Input, notification } from "antd";
import { InfoCircleOutlined, CopyOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Coupon = ({ referrer }) => {
  const [couponCode, setCouponCode] = useState("oladayoshowole");

  const handleCopyClick = () => {
    navigator.clipboard.writeText(couponCode);
    notification.success({
      message: "Coupon Code Copied",
      description: "You have successfully copied the coupon code!",
      style: { marginTop: 25 },
    });
  };

  return (
    <Card className="affiliate-card">
      <Meta
        title={
          <div>
            <Tooltip
              title="Earn commission when customer makes a purchase with your code"
              placement="right"
            >
              <InfoCircleOutlined className="info-icon" />
            </Tooltip>
            <span>Referrer/Coupon Code</span>
          </div>
        }
      />
      <Input
        style={{ marginTop: 15, textTransform: "capitalize" }}
        value={referrer.referral_code}
        readOnly
        addonAfter={
          <Tooltip title="Copy Code ">
            <CopyOutlined className="copy-icon" onClick={handleCopyClick} />
          </Tooltip>
        }
      />
    </Card>
  );
};

export default Coupon;
