import { PackCircle } from "@/pack/index";
import data from "@/pack/data";

export interface RouteRecord {
	name: string;
	executor: () => void;
}

export const router = [
	{
		name: "pack 布局",
		executor: function (): void {
			new PackCircle(data);
		},
	},
];
