import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AveRenderer, Grid, Window, getAppContext, IIconResource, IWindowComponentProps, Button, IButtonComponentProps, TextBox, Label } from "ave-react";
import { App, ThemePredefined_Dark } from "ave-ui";
import { HelsinkiNlpEngine } from "./nlp";
import { containerLayout, controlLayout } from "./layout";
import { iconResource } from "./resource";
import axios from "axios";
import { translate } from "./srt";
import { useDragDrop } from "./hooks";
import { SysDialogFilter } from "ave-ui";
import { safe } from "./common";

function onInit(app: App) {
	const context = getAppContext();
	context.setIconResource(iconResource as unknown as IIconResource);
}

function initTheme() {
	const context = getAppContext();
	const themeImage = context.getThemeImage();
	const themeDark = new ThemePredefined_Dark();
	themeDark.SetStyle(themeImage, 0);
}

enum ButtonText {
	Measure = "生成字幕",
	Translate = "开始翻译",
}

export enum ProgressType {
	None,
	Start,
	Wip,
	End,
	Error,
}

export function Srt2Srt() {
	const nlpEngine = useMemo(() => new HelsinkiNlpEngine(), []);
	const onClose = useCallback<IWindowComponentProps["onClose"]>(() => {
		nlpEngine.destroy();
	}, []);

	const [title, setTitle] = useState("SRT^2");
	const [nlpReady, setNlpReady] = useState(false);

	const [src, setSrc] = useState<string>("");
	useDragDrop((path) => setSrc(path));

	const [progressText, setProgressText] = useState<string>("");
	const [progress, setProgress] = useState<ProgressType>(ProgressType.None);

	const onOpenFile = useCallback<IButtonComponentProps["onClick"]>(
		safe(async () => {
			const context = getAppContext();
			const window = context.getWindow();

			const filePath = await window.GetCommonUi().OpenFile([new SysDialogFilter("Subtitle Files", "*.srt")], "srt", "", "");
			if (filePath) {
				setSrc(filePath);
			}
		}),
		[]
	);

	const onTranslate = useCallback<IButtonComponentProps["onClick"]>(
		safe(async () => {
			setProgress(ProgressType.Start);
			console.log(`translate: ${src}`);
			translate(src, nlpEngine, (current, total, input, output) => {
				const progressText = `[${current}/${total}] ${output}`;
				console.log(progressText);

				if (current === total || current === -1) {
					setProgress(ProgressType.End);
				}

				setProgressText(progressText);
			});
		}),
		[src]
	);

	useEffect(
		safe(() => {
			initTheme();

			nlpEngine.init().then(
				safe(async () => {
					setNlpReady(true);

					const response = await axios.get("http://localhost:8100/gpu");
					if (response.data.gpu === "True") {
						console.log("great! use gpu");
						setTitle("SRT^2 (GPU)");
					} else {
						console.log("gpu is not available");
					}
				})
			);
		}),
		[]
	);

	return (
		<Window title={title} size={{ width: 260, height: 350 }} onInit={onInit} onClose={onClose}>
			<Grid style={{ layout: containerLayout }}>
				<Grid style={{ area: containerLayout.areas.control, layout: controlLayout }}>
					<Grid style={{ area: controlLayout.areas.openFile }}>
						<Button text="选择文件" langKey="OpenFile" iconInfo={{ name: "open-file" }} onClick={onOpenFile}></Button>
					</Grid>
					{nlpReady ? (
						<>
							<Grid style={{ area: controlLayout.areas.translate }}>
								<Button enable={progress === ProgressType.None || progress === ProgressType.End} text={ButtonText.Translate} iconInfo={{ name: "translate", size: 16 }} onClick={onTranslate}></Button>
							</Grid>
							<Grid style={{ area: controlLayout.areas.filePath, margin: "12dpx 0 0 0" }}>
								<TextBox readonly border={false} text={src}></TextBox>
							</Grid>
							<Grid style={{ area: controlLayout.areas.progressLabel }}>
								<Label text="进度"></Label>
							</Grid>
							<Grid style={{ area: controlLayout.areas.progress }}>
								<TextBox readonly border={false} text={progressText}></TextBox>
							</Grid>
						</>
					) : (
						<Grid style={{ area: controlLayout.areas.translate }}>
							<Label text="初始化中..."></Label>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Window>
	);
}

AveRenderer.render(<Srt2Srt />);
