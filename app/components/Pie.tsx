"use client";
import React, { useState } from "react";

// Tooltip component
interface TooltipProps {
  position: {
    x: number;
    y: number;
  };
  title: string;
}
interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  size: number;
  pieid: number;
  data: {
    image: string;
    value: number;
    title: string;
  }[];
}
const Tooltip = ({ position, title }: TooltipProps) => {
  return (
    <div
      className="tooltip"
      style={{
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        padding: "5px",
        borderRadius: "5px",
        pointerEvents: "none",
        left: position.x + "px",
        top: position.y + "px",
        textAlign: "center",
      }}
    >
      {title.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index !== title.split("\n").length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};
const PieChart = (props: PieChartProps) => {
  const { size, data, ...DivProps } = { ...props };
  const radius = size / 2; // Radius of the pie chart
  const strokeWidth = 0; // Stroke width of each slice

  // Calculate total value
  const totalValues = data.reduce((acc, curr) => acc + curr.value, 0);

  // State to keep track of which slice is hovered and tooltip position
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Handler for hover over a slice
  const handleSliceHover = (index: number | null, e: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    setHoveredSlice(index);
    setTooltipPosition({ x: e.pageX + 10, y: e.pageY + 10 });
  };

  // Handler for mouse leave
  const handleMouseLeave = () => {
    setHoveredSlice(null);
  };

  // Calculate angles for each slice based on the percentage of the value
  let startAngle = 0;
  const slices = data.map((item, index) => {
    const angle = (item.value / totalValues) * 360;
    const endAngle = startAngle + angle;

    // Calculate slice path
    const x1 = radius + radius * Math.cos(startAngle * (Math.PI / 180) - Math.PI / 2); // Subtracting Math.PI / 2 to start from top
    const y1 = radius + radius * Math.sin(startAngle * (Math.PI / 180) - Math.PI / 2);
    const x2 = radius + radius * Math.cos(endAngle * (Math.PI / 180) - Math.PI / 2);
    const y2 = radius + radius * Math.sin(endAngle * (Math.PI / 180) - Math.PI / 2);
    const minX = Math.min(radius, x1, x2);
    const minY = Math.min(radius, y1, y2);
    const maxX = Math.max(radius, x1, x2);
    const maxY = Math.max(radius, y1, y2);
    let width = maxX - minX;
    let height = maxY - minY;
    const angleMidPoint = (endAngle + startAngle) / 2;
    const angulaDistance = endAngle - startAngle;
    if ((startAngle + endAngle) % 360 === 180) {
      width = radius;
    }
    if ((startAngle + endAngle) % 360 === 0) {
      height = radius;
    }
    if (item.value / totalValues > 0.5) {
      height = radius * 2;
    }
    let x = 0;
    let y = 0;
    if (height > width) {
      x = (width - height) / 2;
    }

    if (endAngle <= 180) {
      if (height > width) {
        x = (width - height) / 2;
      }
    }
    if (endAngle > 180) {
      if (height > width) {
        x = (width - height) / 3.5;
      }
    }
    if (startAngle >= 180 / 2 && endAngle < 5.1 && width != radius) {
      if (height < width) {
        y = (height - width) / 2;
      }
    }
    if (angulaDistance > 180) {
      width = size;
      x = 0;
      y = 0;
    }
    if (angulaDistance > 90 && angulaDistance <= 180) {
      x = 0;
    }
    if (startAngle <= 180 && endAngle >= 180)
      if (angulaDistance <= 90) {
        if (angleMidPoint > 0 && angleMidPoint <= 90) {
          if (height > width) {
            let lol = (angleMidPoint - 270) / 45;
            x = (height - width) / lol;
          }
        } else if (angleMidPoint > 90 && angleMidPoint <= 180) {
          if (height > width) {
            let lol = (angleMidPoint - 270) / 45;
            width += angleMidPoint;
            x = -angleMidPoint;
          } else {
            let lol = 2 - (angleMidPoint - 180) / (315 - 290);
            const move = (height - width) / lol;
            width -= move;
            x = move;
          }
        } else if (angleMidPoint > 180 && angleMidPoint <= 270) {
          if (height > width) {
            if (item.title.includes("Sky")) {
              console.log(angleMidPoint);
            }
            let lol = (angleMidPoint - 270) / 45;
            x = (height - width) / lol;
          }
        } else if (angleMidPoint > 270) {
          if (height > width) {
            let lol = (angleMidPoint - 270) / 45;
            x = (width - height) / lol;
          } else {
            let lol = 2 - (angleMidPoint - 290) / (315 - 290);
            const move = (height - width) / lol;
            width -= move;
            x = move;
          }
        }
      }
    const path = (
      <path
        key={index}
        d={`M ${radius},${radius} L ${x1},${y1} A ${radius},${radius} 0 ${angle > 180 ? 1 : 0} 1 ${x2},${y2} Z`}
        fill={`url(#pattern${index}${props.pieid}${item.title.replace(/ /g, "").replace(/\n/g, "")})`}
        fillOpacity={hoveredSlice === index ? "0.7" : "1"}
        stroke="white"
        x={"100"}
        strokeWidth={strokeWidth}
        onMouseEnter={(e) => handleSliceHover(index, e)} // Handle hover
        onMouseLeave={handleMouseLeave} // Reset hover
      />
    );
    const pattern = (
      <pattern
        key={index}
        id={`pattern${index}${props.pieid}${item.title.replace(/ /g, "").replace(/\n/g, "")}`}
        patternUnits="objectBoundingBox"
        width="100%"
        height="100%"
      >
        <image href={item.image} width={Math.max(width, height)} height={Math.max(width, height)} x={x} y={y} />
      </pattern>
    );
    startAngle = endAngle;
    return { path, pattern };
  });

  return (
    <>
      <div {...DivProps} style={{ width: size, height: size }}>
        <svg
          width="100%"
          height="100%"
          onMouseMove={(e) => {
            if (hoveredSlice !== null) {
              setTooltipPosition({ x: e.pageX + 10, y: e.pageY + 10 });
            }
          }}
        >
          <defs>{slices.map((slice) => slice.pattern)}</defs>
          <g transform={`translate(${strokeWidth / 2},${strokeWidth / 2})`}>{slices.map((slice) => slice.path)}</g>
        </svg>
        {/* Render Tooltip */}
      </div>
      {hoveredSlice !== null && <Tooltip position={tooltipPosition} title={data[hoveredSlice].title} />}
    </>
  );
};

export default PieChart;
