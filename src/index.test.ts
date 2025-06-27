import {describe, it} from "node:test";
import { strict as assert } from "node:assert";
import {renderRecharts} from "./index.ts";

describe("renderRecharts", () => {
	it("returns an svg", async () => {
		const res = await renderRecharts(`
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

<LineChart width={400} height={400} data={data}>
  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
</LineChart>
																 `);
		console.log(res);
		assert.match(res, /^<svg.*<\/svg>$/);
	});
});
