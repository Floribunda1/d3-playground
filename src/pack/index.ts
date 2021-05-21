import { Selection, ZoomView } from "d3";

import { colorFn } from "@/pack/utils";
import { HierarchyRaw, PackData } from "@/pack/types";

export class PackCircle {
	private width = document.documentElement.clientHeight;
	private height = document.documentElement.clientHeight;

	private raw: HierarchyRaw;

	private app: Selection<HTMLElement, null, HTMLElement, null>;
	private svg: Selection<SVGSVGElement, null, HTMLElement, null>;
	private nodes: Selection<SVGCircleElement, PackData, SVGGElement, null>;

	private view: ZoomView;
	private focusing: PackData;

	constructor(data: HierarchyRaw) {
		this.raw = data;
		this.app = d3.select("#app");
		this.main();
	}

	private main() {
		this.createContainer();
		const rootNode = this.processLayoutData();
		console.log(rootNode);
		this.render(rootNode);
		this.zoomTo([rootNode.x, rootNode.y, rootNode.r * 2]);
	}

	private createContainer(): void {
		const { width, height } = this;
		this.svg = this.app
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
			.style("background", colorFn(0));
	}

	private processLayoutData() {
		const { raw, width, height } = this;
		const rootNode = d3
			.hierarchy<HierarchyRaw>(raw)
			.sum((d) => d.value ?? 0)
			// 注： 这里已经调用过 sum 了，所以 value 是一定存在的
			.sort((a, b) => b.value! - a.value!);

		const packFn = d3.pack<HierarchyRaw>().size([width, height]).padding(4);

		// 对 rootNode 进行加工
		return packFn(rootNode);
	}

	private zoom(event: MouseEvent, data: PackData) {
		this.focusing = data;
		const transition = this.svg
			.transition()
			.duration(event.altKey ? 7500 : 750)
			.tween("zoom", (d) => {
				const i = d3.interpolateZoom(this.view, [
					this.focusing.x,
					this.focusing.y,
					this.focusing.r * 2,
				]);
				return (t) => this.zoomTo(i(t));
			});
		return transition;
	}

	public zoomTo(view: ZoomView): void {
		const scale = this.width / view[2];
		this.view = view;

		this.nodes
			.attr(
				"transform",
				(d) =>
					`translate(${(d.x - view[0]) * scale},${(d.y - view[1]) * scale})`
			)
			.attr("r", (d) => d.r * scale);
	}

	private render(data: PackData) {
		this.nodes = this.svg
			.append("g")
			.attr("class", "node-group")
			.selectAll<SVGCircleElement, PackData>("circle")
			.data(data.descendants().slice(1))
			.join("circle");

		this.nodes
			.style("cursor", "pointer")
			.attr("fill", (d) => (d.children ? colorFn(d.depth) : "#fff"))
			.attr("pointer-events", (d) => (!d.children ? "none" : null))
			.attr("r", (d) => d.r);

		this.nodes.on("mouseover", function () {
			d3.select(this).attr("stroke", "#000");
		});
		this.nodes.on("mouseout", function () {
			d3.select(this).attr("stroke", "none");
		});
		this.nodes.on("click", (event: MouseEvent, data) => {
			// 防止向上冒泡阻断事件
			event.stopPropagation();
			this.zoom(event, data);
		});

		this.svg.on("click", (event: MouseEvent) => this.zoom(event, data));
	}
}
