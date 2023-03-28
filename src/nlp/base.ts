export interface ITranslateResult {
	text: string;
}

export interface INlpEngineConstructor {
	new (): INlpEngine;
}

export interface INlpEngine {
	translate(text: string): Promise<ITranslateResult>;
	init(): void;
	destroy(): void;
}

export type OnTranslate = (text: string) => string;
export type OnError = (message: string) => void;
