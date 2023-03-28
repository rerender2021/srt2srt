<p align="center">
    <img width="325" src="./docs/images/logo.png">
</p>

<div align="center">

[![build](https://github.com/rerender2021/srt2srt/actions/workflows/build.yml/badge.svg?branch=main&event=push)](https://github.com/rerender2021/srt2srt/actions/workflows/build.yml) [![pack](https://github.com/rerender2021/srt2srt/actions/workflows/pack.yml/badge.svg?branch=main&event=push)](https://github.com/rerender2021/srt2srt/actions/workflows/pack.yml)

 </div>
 
# 简介

SRT to SRT (SRT^2) 是一个简单的翻译器，原理：

-   使用本地离线翻译服务器，逐行读取字幕文件进行翻译。目前支持离线情况下，英文翻译成中文。
-   GUI 部分则是使用 [Ave React](https://qber-soft.github.io/Ave-React-Docs/) 开发的。

![srt2srt-usage](./docs/images/srt2srt-usage.png)

<!-- 演示视频见:

- [回声：实时英语语音翻译](https://www.bilibili.com/video/BV11L411d7HE/) -->

# 使用说明

-   软件首页：https://rerender2021.github.io/products/srt2srt/

# 开发者向

## 本地开发

```bash
> npm install
> npm run dev
```

开发过程中需要确保本机启动了翻译服务器。可以使用 CPU 的，也可以使用支持 GPU 的。

### CPU

-   CPU 翻译服务器：https://github.com/rerender2021/NLP-API/releases/tag/1.0.1

下载后，解压到项目下，确保项目目录结构如下：

```
- nlp-server
    - NLP-API.exe
    - ...
- src
- ...
- package.json
```

### GPU

#### 环境

-  使用 GPU 需要安装 cuda 环境，注意版本：11.7：https://developer.nvidia.com/cuda-11-7-0-download-archive?target_os=Windows&target_arch=x86_64

验证 cuda 安装成功：命令行输入 `nvcc -V`，看输出：

```bash
  Copyright (c) 2005-2022 NVIDIA Corporation
  Built on Tue_May__3_19:00:59_Pacific_Daylight_Time_2022
  Cuda compilation tools, release 11.7, V11.7.64
  Build cuda_11.7.r11.7/compiler.31294372_0
```

#### 安装

-   GPU 翻译服务器：https://github.com/rerender2021/NLP-GPU-API/releases/tag/1.0.0
   
下载后，解压到项目下，确保项目目录结构如下：

```
- nlp-gpu-server
    - NLP-GPU-API.exe
    - ...
- src
- ...
- package.json
```

## 打包发布

-   生成 exe

```bash
> npm run release
```

# 开源协议

[MIT](./LICENSE)

# 赞赏

`:)` 如果此软件值得赞赏，可以请作者看小说，一元足足可看八章呢。

<p align="left">
    <img width="300" src="https://rerender2021.github.io/assets/donate.jpg">
</p>
