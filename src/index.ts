import React from "react";
import babel from "@babel/core";
import * as ReactDOMServer from "react-dom/server";
import recharts from "recharts";
import {JSDOM} from "jsdom";

export const renderRecharts = async (code: string) => {
	if (React){
		const transformedCode = (await babel.transformAsync(`
		const {${Object.keys(recharts).join(",")}} = recharts;
		${code}
			`, {presets: ["@babel/preset-react"]}))?.code;
		if (typeof transformedCode !== "string") {
			throw new Error("Whops: " + transformedCode);
		}
		const res = ReactDOMServer.renderToString(eval(transformedCode));

		const frag = JSDOM.fragment(res);
		// recharts does not add an xmlns attribute to the output svg
		// this makes Chrome show a broken image when added as an inline src
		const svgElem = frag.querySelector("svg");
		if (svgElem === null) {
			throw new Error("svgElem is null");
		}
		svgElem.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		const svg = svgElem.outerHTML;
		return svg;
	}else {
		throw new Error("No React...");
	}
}
