import React, { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { ImZoomIn, ImZoomOut } from "react-icons/im";
import { MdPersonSearch } from "react-icons/md";
import { geneologyStructure } from "../../../api/user.api";

// Rank color map
const rankColors = {
  Silver: "#9CA3AF",
  Gold: "#FACC15",
  "Combo Package": "#3B82F6",
  "Freedom Package": "#10B981",
  Member: "#6366F1",
};

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const MyGenology = () => {
  const treeContainer = useRef(null);
  const treeRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const [treeData, setTreeData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartRef = useRef(0);

  // -----------------------
  // Convert binary tree (leftUser/rightUser) to react-d3-tree format
  const mapBinaryTreeToTree = (node) => {
    if (!node) return null;

    const children = [];
    if (node.leftUser) children.push(mapBinaryTreeToTree(node.leftUser));
    if (node.rightUser) children.push(mapBinaryTreeToTree(node.rightUser));

    return {
      name: node.name,
      id: node._id,
      attributes: {
        email: node.email,
        username: node.username,
        // Add rank, status, profilePic if available
      },
      children,
      fullChildren: children, // for toggle expansion
      isExpanded: false,
    };
  };

  const fetchAllDirectTreeMembers = async () => {
    try {
      const response = await geneologyStructure();
      if (response?.tree) {
        const treeRoot = mapBinaryTreeToTree(response.tree);
        setTreeData([treeRoot]);
      } else {
        console.error("No tree found in response");
      }
    } catch (error) {
      console.error("Error fetching genealogy tree:", error);
    }
  };

  useEffect(() => {
    fetchAllDirectTreeMembers();
  }, []);

  useEffect(() => {
    if (treeContainer.current) {
      const { width } = treeContainer.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 100 });
    }
  }, []);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleMouseEnter = (event, nodeDatum) => {
    if (isMobile) return;
    const bounds = event.target.getBoundingClientRect();
    setTooltipPosition({
      x: bounds.x + window.scrollX + 30,
      y: bounds.y + window.scrollY - 80,
    });
    setHoveredNode(nodeDatum);
  };

  const handleMouseLeave = () => setHoveredNode(null);

  const toggleNodeExpansion = (nodeId) => {
    const newTreeData = JSON.parse(JSON.stringify(treeData));

    const toggleHelper = (node) => {
      if (node.id === nodeId) {
        node.isExpanded = !node.isExpanded;
        node.children = node.isExpanded ? node.fullChildren : [];
      } else {
        node.children?.forEach(toggleHelper);
        node.fullChildren?.forEach(toggleHelper);
      }
    };

    toggleHelper(newTreeData[0]);
    setTreeData(newTreeData);
  };

  const renderCustomNode = ({ nodeDatum }) => {
    const imageUrl = nodeDatum.attributes?.image || defaultAvatar;
    const rank = nodeDatum.attributes?.rank;
    const status = nodeDatum.attributes?.status;
    const badgeColor = rankColors[rank] || "#E5E7EB";

    return (
      <g
        onTouchStart={() => {
          touchStartRef.current = Date.now();
        }}
        onClick={(e) => {
          if (isMobile && Date.now() - touchStartRef.current < 300) return;
          toggleNodeExpansion(nodeDatum.id);
        }}
        onMouseEnter={(e) => handleMouseEnter(e, nodeDatum)}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer" }}
      >
        <circle
          r={30}
          fill="#e0f2fe"
          stroke={highlightedNodeId === nodeDatum.id ? "#f59e0b" : "#3b82f6"}
          strokeWidth={2}
        />
        <clipPath id={`clip-${nodeDatum.id}`}>
          <circle r={26} cx={0} cy={0} />
        </clipPath>
        <image
          href={imageUrl}
          width={52}
          height={52}
          x={-26}
          y={-26}
          clipPath={`url(#clip-${nodeDatum.id})`}
        />
        <text textAnchor="middle" y={42} fontSize={12} fill="#1e3a8a">
          {nodeDatum.name}
        </text>
        <text textAnchor="middle" y={58} fontSize={10} fill={badgeColor}>
          {rank} ({status})
        </text>
      </g>
    );
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.2));
  const handleReset = () => {
    if (treeContainer.current) {
      const { width } = treeContainer.current.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 100 });
      setZoom(1);
    }
  };

  const handleSearch = () => {
    const match = findNodeByNameOrEmail(treeData[0], searchTerm);
    if (match) setHighlightedNodeId(match.id);
  };

  const findNodeByNameOrEmail = (node, term) => {
    if (!node) return null;
    if (
      node.name.toLowerCase().includes(term.toLowerCase()) ||
      node.attributes?.email?.toLowerCase().includes(term.toLowerCase())
    )
      return node;

    for (let child of node.fullChildren || []) {
      const result = findNodeByNameOrEmail(child, term);
      if (result) return result;
    }
    return null;
  };

  const countStats = (node) => {
    if (!node) return { total: 0, active: 0, directs: 0 };
    let total = 1;
    let active = node.attributes?.status === "Active" ? 1 : 0;
    let directs = node.fullChildren?.length || 0;
    for (let child of node.fullChildren || []) {
      const childStats = countStats(child);
      total += childStats.total;
      active += childStats.active;
    }
    return { total, active, directs };
  };

  const stats = treeData.length ? countStats(treeData[0]) : { total: 0, active: 0, directs: 0 };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }} ref={treeContainer}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between text-sm gap-2">
        <div className="sm:flex gap-2 items-center w-full lg:w-auto grid grid-cols-2">
          <div className="bg-green-500 text-white px-2 py-1 rounded shadow-lg flex-1 lg:flex-none">
            Total Users: {stats.total}
          </div>
          <div className="bg-yellow-500 text-white px-2 py-1 rounded shadow-lg flex-1 lg:flex-none">
            Directs: {stats.directs}
          </div>
          <div className="bg-blue-500 text-white px-2 py-1 rounded shadow-lg flex-1 lg:flex-none">
            Active: {stats.active}
          </div>
          <div className="bg-red-500 text-white px-2 py-1 rounded shadow-lg flex-1 lg:flex-none">
            Inactive: {stats.total - stats.active}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <input
              type="text"
              placeholder="Search name/email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 pr-8 w-full"
            />
            <button onClick={handleSearch}>
              <MdPersonSearch className="absolute top-1 right-2 text-xl cursor-pointer text-[var(--primary-color)]" />
            </button>
          </div>
          <button onClick={handleZoomIn}>
            <ImZoomIn className="text-xl cursor-pointer" />
          </button>
          <button onClick={handleZoomOut}>
            <ImZoomOut className="text-xl cursor-pointer" />
          </button>
          <button onClick={handleReset} className="!w-fit bg-gray-500 text-white !px-2 !py-1 rounded shadow-lg">
            Reset View
          </button>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          style={{
            position: "absolute",
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            zIndex: 999,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            width: "220px",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <img
              src={hoveredNode.attributes?.image || defaultAvatar}
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
              alt="profile"
            />
            <strong>{hoveredNode.name}</strong>
          </div>
          <div style={{ fontSize: "12px", marginTop: "5px" }}>
            📧 {hoveredNode.attributes?.email}
            <br />
            🏷️ {hoveredNode.attributes?.username}
          </div>
        </div>
      )}

      {/* Tree */}
      {treeData.length > 0 && treeData[0] && (
        <Tree
          ref={treeRef}
          data={treeData[0]}
          translate={translate}
          zoomable
          zoom={zoom}
          orientation="vertical"
          renderCustomNodeElement={renderCustomNode}
          pathFunc="step"
          separation={{ siblings: 1.5, nonSiblings: 2 }}
        />
      )}
    </div>
  );
};

export default MyGenology;
