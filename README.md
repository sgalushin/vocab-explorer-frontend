## Vocab Explorer

A tool for language learners. Watch YouTube videos with clickable subtitles. A click pauses the video and shows a translation.
Written in React, Typescript.

Currently, works only with videos in **German** and uses [Linguee](https://www.linguee.com/) dictionary.

## Demo

![Demo GIF](./docs/vocab-explorer-demo.gif)

## Environment Variables

The following environment variables must be set when running (`npm start`) or building (`npm run build`).



| Variable Name                      | Example                                                      | Description |
|------------------------------------|--------------------------------------------------------------|-------------|
| `REACT_APP_SUBTITLES_URL`           | https://36czxa52an.execute-api.eu-west-2.amazonaws.com/Prod/ | HTTP endpoint that returns subtitles in VTT format. See [youtube-subtitle-downloader-in-lambda](https://github.com/sgalushin/youtube-subtitle-downloader-in-lambda). |


## License

This project is licensed under the terms of the MIT license. See the [LICENSE](./LICENSE.txt) file.