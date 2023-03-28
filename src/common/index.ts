import path from "path";

export function assetsPath(name: string) {
	const root = path.resolve(__dirname, "../../assets");
	return path.resolve(root, `./${name}`);
}

export async function sleep(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

export function safe(callback: Function) {
	return (...args: any[]) => {
		try {
			return callback(...args);
		} catch (error) {
			console.error(error);
		}
	};
}