export const colorFn = d3
	.scaleLinear<string>()
	.domain([0, 5])
	.range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
	.interpolate(d3.interpolateHcl);
