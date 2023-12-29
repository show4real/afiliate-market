import React from "react";
import { Card, Typography, Divider, Image } from "antd";
import { InfoOutlined, CheckCircleFilled } from "@ant-design/icons";

const { Meta } = Card;

const WelcomeTerm = () => {
  return (
    <Card className="affiliate-card2">
      <div className="header">
        <Typography.Title level={4} className="title">
          JOIN OUR AFFILIATE PROGRAM
        </Typography.Title>
        {/* Replace 'YourLogo.png' with the path to your logo image */}
        <Image
          src="https://hayzeeonline.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo5.4f8e477d.png&w=128&q=100"
          alt="Logo"
          className="logo"
        />
      </div>
      <Divider className="divider" />
      <div className="benefits">
        <Typography.Title level={5} className="subtitle">
          Benefits
        </Typography.Title>

        <Typography>
          <strong>Commission Type:</strong> &nbsp; &nbsp;
          <CheckCircleFilled className="check-icon" />
          &nbsp;Percent Of Sale
        </Typography>
        <Typography>
          <strong>Commission Amount:</strong> &nbsp; &nbsp;
          <CheckCircleFilled className="check-icon" /> 3%
        </Typography>
        <Typography>
          <strong>Additional Terms:</strong> &nbsp; &nbsp;
          <CheckCircleFilled className="check-icon" /> You will get as high as 3% commission on
          total referral sales when a customer makes a purchase through uses your coupon code.
        </Typography>
      </div>
      <Divider className="divider" />
      <div className="footer">
        <InfoOutlined className="info-icon" />
        <Typography.Text>
          For more details, please contact our support. 08037586863, hayzee@hayzeeonline.com
        </Typography.Text>
      </div>
    </Card>
  );
};

export default WelcomeTerm;
