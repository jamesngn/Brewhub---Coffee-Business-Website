import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { Box, Modal } from "@mui/material";

// parent Card

const Card = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "50vh",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <CompactCard param={props} setOpened={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ExpandedCard param={props} />
        </Box>
      </Modal>
    </div>
  );
};

// Compact Card
function CompactCard({ param, setOpened }) {
  const Png = param.png;
  const data = {
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false, // This will hide the toolbar
        },
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        enabled: false, // This will hide the tooltips
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: false, // This will hide the x-axis line
        },
        labels: {
          show: false, // This will hide the x-axis labels
        },
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      yaxis: {
        show: false, // This will hide the y-axis
      },
    },
  };

  return (
    <div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        display: "flex", // Set to flex
        flexDirection: "column", // Column direction
      }}
      layoutId="expandableCard"
      onClick={setOpened}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div
            style={{ color: "black", fontWeight: "bold", fontSize: "0.9rem" }}
          >
            {param.title}
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            {param.value}
          </div>
        </div>
        <Png />
      </div>
      <div className="chartCtn" style={{ flex: 1 }}>
        <Chart
          options={data.options}
          series={param.series}
          type="area"
          height={"100"}
        />
      </div>
    </div>
  );
}

// Expanded Card
function ExpandedCard({ param }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["black"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  };

  return (
    <div className="ExpandedCard">
      {/* <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div> */}
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={param.series} type="area" />
      </div>
      <span>Last 24 hours</span>
    </div>
  );
}

export default Card;
