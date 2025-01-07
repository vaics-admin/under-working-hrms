import React from "react";
import Tree from "react-d3-tree";
import "./orgtree.css";

// Sample Data
const orgData = {
  name: "CEO",
  attributes: {
    title: "Chief Executive Officer",
    image: "https://via.placeholder.com/100",
  },
  children: [
    {
      name: "CTO",
      attributes: {
        title: "Chief Technology Officer",
        image: "https://via.placeholder.com/100",
      },
    },
    {
      name: "CFO",
      attributes: {
        title: "Chief Financial Officer",
        image: "https://via.placeholder.com/100",
      },
    },
  ],
};

const renderCustomNode = ({ nodeDatum }) => (
  <g>
    {/* Node Image */}
    <foreignObject
      x={-30}
      y={-60}
      width={60}
      height={60}
      style={{ borderRadius: "50%" }}
    >
      <img
        src={nodeDatum.attributes.image}
        alt={nodeDatum.name}
        width="60"
        height="60"
        style={{ borderRadius: "50%" }}
      />
    </foreignObject>

    {/* Node Name */}
    <text fill="black" x={0} y={10} textAnchor="middle" fontSize="14px">
      {nodeDatum.name}
    </text>

    {/* Node Title */}
    <text fill="gray" x={0} y={30} textAnchor="middle" fontSize="12px">
      {nodeDatum.attributes?.title || ""}
    </text>
  </g>
);

const CustomPath = ({ source, target }) => {
  const midX = source.x; // Keep the vertical line centered
  const midY = (source.y + target.y) / 2; // Middle point between source and target

  return `
    M${source.x},${source.y} 
    L${midX},${midY} 
    L${target.x},${midY} 
    L${target.x},${target.y}
  `;
};

const OrgChart = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Tree
        data={orgData}
        translate={{ x: 200, y: 100 }}
        renderCustomNodeElement={renderCustomNode}
        pathFunc={CustomPath} // Custom path for 90-degree lines
        orientation="vertical"
      />
    </div>
  );
};

export default OrgChart;
