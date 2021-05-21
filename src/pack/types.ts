import { HierarchyCircularNode, HierarchyNode } from "d3";

export interface HierarchyRaw {
	name: string;
	children?: HierarchyRaw[];
	value?: number;
}

export type PackData = HierarchyCircularNode<HierarchyRaw>;

export type HierarchyData = HierarchyNode<HierarchyRaw>;
