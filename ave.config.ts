import { IPackConfig } from "ave-pack";

const config: IPackConfig = {
  build: {
    projectRoot: __dirname,
    target: "node14-win-x64",
    input: "./dist/_/_/app.js",
    output: "./bin/srt2srt.exe",
    // set DEBUG_PKG=1
    debug: false, 
    edit: false
  },
  resource: {
    icon: "./assets/srt2srt.ico",
    productVersion: "1.0.0",
    productName: "SRT^2",
    fileVersion: "1.0.0",
    companyName: "QberSoft",
    fileDescription: "A simple srt translator powered by avernakis react.",
    LegalCopyright: `© ${new Date().getFullYear()} QberSoft Copyright.`,
  },
};

export default config;
