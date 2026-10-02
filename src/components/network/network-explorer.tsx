"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import type { PositionedSiteGraph } from "../../graph/layout";

interface NetworkNodeData extends Record<string, unknown> {
  readonly label: string;
  readonly title: string;
  readonly status: string;
  readonly type: string;
  readonly route: string;
  readonly active: boolean;
}

type NetworkFlowNode = Node<NetworkNodeData, "network">;

function NetworkNode({ data, selected }: NodeProps<NetworkFlowNode>) {
  const state = data.active ? "active" : selected ? "selected" : "idle";

  return (
    <div
      className={[
        "network-node",
        "network-node--" + state,
        "network-node--status-" + data.status,
      ].join(" ")}
      title={data.title}
    >
      <Handle
        className="network-node__handle"
        position={Position.Top}
        type="target"
      />
      <span className="network-node__type">{data.type}</span>
      <strong>{data.label}</strong>
      <span className="network-node__status">{data.status}</span>
      <Handle
        className="network-node__handle"
        position={Position.Bottom}
        type="source"
      />
    </div>
  );
}

const nodeTypes = {
  network: NetworkNode,
};

interface NetworkExplorerProps {
  graph: PositionedSiteGraph;
  activeNodeId: string;
}

export function NetworkExplorer({
  graph,
  activeNodeId,
}: NetworkExplorerProps) {
  const nodes: NetworkFlowNode[] = graph.nodes.map((node) => ({
    id: node.id,
    type: "network",
    position: node.position,
    width: node.width,
    height: node.height,
    data: {
      label: node.label,
      title: node.title,
      status: node.status,
      type: node.type,
      route: node.route,
      active: node.id === activeNodeId,
    },
  }));

  const edges: Edge[] = graph.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    type: edge.kind === "hierarchy" ? "smoothstep" : "default",
    className:
      edge.kind === "hierarchy"
        ? "network-edge network-edge--hierarchy"
        : "network-edge network-edge--relationship",
    selectable: false,
  }));

  return (
    <div className="network-explorer" aria-label="Superior MI network explorer">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        fitView
        fitViewOptions={{ padding: 0.18, maxZoom: 1.08 }}
        minZoom={0.18}
        maxZoom={1.8}
        panOnDrag
        zoomOnDoubleClick={false}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={26}
          size={1}
          className="network-background"
        />
        <Controls
          showInteractive={false}
          position="bottom-left"
          className="network-controls"
        />
      </ReactFlow>
    </div>
  );
}
