import { router, RouteRecord } from "./router";

const app = d3.select("#app");

export function initRouter(): void {
	const nav = app
		.html("")
		.append("nav")
		.classed("nav", true)
		.classed("flex-column", true);

	const links = nav
		.selectAll<HTMLElement, RouteRecord[]>("a")
		.data(router)
		.join("a");

	links
		.text((d) => d.name)
		.attr("href", "#")
		.classed("nav-link", true);

	links.on("click", (e, d) => {
		app.html("");
		d.executor();
		addResetButton();
	});
}

function addResetButton() {
	const button = app.append("button");

	button
		.text("reset")
		.classed("reset-button", true)
		.classed("btn", true)
		.classed("btn-primary", true);

	button.on("click", () => {
		initRouter();
	});
}
