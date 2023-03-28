import { parseSync, stringifySync, Cue } from "subtitle";
import fs from "fs";
import path from "path";
import { INlpEngine } from "../nlp/base";

export type OnTranslateProgress = (current: number, total: number, input: string, output: string) => void;

export async function translate(filePath: string, nlpEngine: INlpEngine, onProgress: OnTranslateProgress) {
	try {
		const fileContent = fs.readFileSync(filePath, "utf8");
		const nodes = parseSync(fileContent);

		for (let i = 0; i < nodes.length; ++i) {
			const current = nodes[i];
			if (current.type === "cue") {
				const input = (nodes[i].data as Cue).text;
				const { text: output } = await nlpEngine.translate(input);
				console.log("translate result", { input, output });
				(nodes[i].data as Cue).text = `${input}\n${output}`;
				onProgress(i + 1, nodes.length, input, output);
			}
		}

		const output = stringifySync(nodes, { format: "SRT" });
		const dirName = path.dirname(filePath);
		const fileName = path.parse(filePath).name;
		const outPath = path.resolve(dirName, `./${fileName}-out.srt`);
		fs.writeFileSync(outPath, output, "utf8");
	} catch (error) {
		console.error(error);
		onProgress(-1, -1, "", "翻译字幕失败! 原因请查看 error.log。");
		fs.writeFileSync("./error.log", error?.message || "", "utf8");
	}
}
