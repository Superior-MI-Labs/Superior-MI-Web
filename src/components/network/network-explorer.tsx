"use client";

import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  ReactFlow,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getFocusNodeIds } from "../../graph/focus";
import type { PositionedSiteGraph } from "../../graph/layout";
import { useActivateRoute } from "./use-activate-route";

interface NetworkNodeData extends Record<string, unknown> {
  readonly label: string;
  readonly title: string;
  readonly summary: string;
  readonly status: string;
  readonly type: string;
  readonly route: string;
  readonly active: boolean;
  readonly focused: boolean;
}

type NetworkFlowNode = Node<NetworkNodeData, "network">;

function NetworkNode({ data, selected }: NodeProps<NetworkFlowNode>) {
  const activateRoute = useActivateRoute();
  const state = data.active ? "active" : selected ? "selected" : "idle";

  return (
    <div
      className={[
        "network-node",
        "network-node--" + state,
        data.focused ? "network-node--context" : "network-node--distant",
        "network-node--status-" + data.status,
      ].join(" ")}
      title={data.title}
    >
      <Handle
        className="network-node__handle"
        position={Position.Top}
        type="target"
      />
      <button
        type="button"
        className="network-node__button nodrag nopan"
        onClick={() => activateRoute(data.route)}
        aria-label={"Open " + data.title}
        aria-current={data.active ? "page" : undefined}
      >
        <span className="network-node__type">{data.type}</span>
        <strong>{data.label}</strong>
        <span className="network-node__status">{data.status}</span>
      </button>
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

function ViewportFocus({
  nodeIds,
}: {
  readonly nodeIds: readonly string[];
}) {
  const { fitView } = useReactFlow<NetworkFlowNode>();

  useEffect(() => {
    if (nodeIds.length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    void fitView({
      nodes: nodeIds.map((id) => ({ id })),
      padding: 0.3,
      minZoom: 0.28,
      maxZoom: 1.14,
      duration: reduceMotion ? 0 : 520,
    });
  }, [fitView, nodeIds]);

  return null;
}

interface NetworkExplorerProps {
  graph: PositionedSiteGraph;
  activeNodeId: string;
}

export function NetworkExplorer({
  graph,
  activeNodeId,
}: NetworkExplorerProps) {
  const activateRoute = useActivateRoute();
  const searchInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const focusNodeIds = useMemo(
    () => getFocusNodeIds(graph, activeNodeId),
    [graph, activeNodeId],
  );
  const focused = useMemo(() => new Set(focusNodeIds), [focusNodeIds]);

  const nodes: NetworkFlowNode[] = useMemo(
    () =>
      graph.nodes.map((node) => ({
        id: node.id,
        type: "network",
        position: node.position,
        width: node.width,
        height: node.height,
        data: {
          label: node.label,
          title: node.title,
          summary: node.summary,
          status: node.status,
          type: node.type,
          route: node.route,
          active: node.id === activeNodeId,
          focused: focused.has(node.id),
        },
      })),
    [activeNodeId, focused, graph.nodes],
  );

  const edges: Edge[] = useMemo(
    () =>
      graph.edges.map((edge) => {
        const inContext =
          focused.has(edge.source) && focused.has(edge.target);

        return {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: edge.kind === "hierarchy" ? "smoothstep" : "default",
          className: [
            "network-edge",
            edge.kind === "hierarchy"
              ? "network-edge--hierarchy"
              : "network-edge--relationship",
            inContext ? "network-edge--context" : "network-edge--distant",
          ].join(" "),
          selectable: false,
        };
      }),
    [focused, graph.edges],
  );

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) {
      return [];
    }

    return graph.nodes
      .filter((node) =>
        [node.label, node.title, node.summary, node.type]
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalized),
      )
      .slice(0, 8);
  }, [graph.nodes, query]);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if (
        event.key.toLocaleLowerCase() === "k" &&
        (event.ctrlKey || event.metaKey)
      ) {
        event.preventDefault();
        searchInput.current?.focus();
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <div className="network-explorer" aria-label="Superior MI network explorer">
      <div className="network-search">
        <label className="network-search__label" htmlFor="network-search-input">
          Explore network
        </label>
        <div className="network-search__input-row">
          <input
            id="network-search-input"
            ref={searchInput}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Superior MI"
            autoComplete="off"
          />
          <kbd>⌘/Ctrl K</kbd>
        </div>

        {query.trim() ? (
          <div className="network-search__results" role="listbox">
            {searchResults.length > 0 ? (
              searchResults.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  role="option"
                  aria-selected={node.id === activeNodeId}
                  onClick={() => {
                    setQuery("");
                    activateRoute(node.route);
                  }}
                >
                  <span>{node.type}</span>
                  <strong>{node.label}</strong>
                  <small>{node.status}</small>
                </button>
              ))
            ) : (
              <p>No matching public nodes.</p>
            )}
          </div>
        ) : null}
      </div>

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
        <ViewportFocus nodeIds={focusNodeIds} />
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
