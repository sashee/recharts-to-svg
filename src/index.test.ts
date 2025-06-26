import {describe, it} from "node:test";
import { strict as assert } from "node:assert";
import {renderRecharts} from "./index.ts";

describe("renderRecharts", () => {
	it("returns an svg", async () => {
		const res = await renderRecharts(`
const data = [0, 1, 2, 3].map((r) => ({ia: 1.25 + r * 1}));

<LineChart data={data} width={400} height={300}
	margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
	<CartesianGrid strokeDasharray="3 3" />
	<YAxis width={40}>
		<Label angle={-90} position="insideLeft">$/month/GB</Label>
	</YAxis>
	<XAxis label="Retrievals/month" position="insideBottom" height={60}/>
	<Line type="monotone" dataKey="ia" stroke="red"/>
	<ReferenceLine y={2.3} label={<Label value="S3 Standard" position="insideBottomRight"/>} stroke="orange" strokeDasharray="3 3" strokeWidth={2}/>
</LineChart>
																 `);
		console.log(res);
		assert.match(res, /^<svg.*<\/svg>$/);
	});
});
