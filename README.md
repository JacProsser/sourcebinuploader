# Sourcebin Uploader

![version](https://img.shields.io/github/package-json/v/dheerajpv/srcbin?style=for-the-badge)
![license](https://img.shields.io/github/license/dheerajpv/srcbin?style=for-the-badge)
![installs](https://img.shields.io/visual-studio-marketplace/i/dheerajpv.srcbin?style=for-the-badge)
![rating](https://img.shields.io/visual-studio-marketplace/r/dheerajpv.srcbin?style=for-the-badge)
![TS](https://img.shields.io/static/v1?label=Built+With&message=TypeScript&color=blue&style=for-the-badge)

This extension uploads the current selection or the entire file text to [SourceBin](https://srcb.in/).

## Behavior

When some code is selected in the active editor, the command will only upload the selection to SourceBin.
If there is no selection, the entirety of the file's text will be uploaded.

## Usage

This extension exposes 2 ways to run the command to upload code to sourcebin.

### Status Bar

By default, a status bar item will be created that says `Upload to Bin`.
Clicking on it will trigger the command.

### Upload to Bin command

This extension also has a command that can be accessed using the command palette (cmd/ctrl - shift - P).
Running the `Upload to Bin` command will also trigger the command.

<p align="center"> --- <small>Built with ♥ by <a href="https://github.com/dheerajpv">dheerajpv</a></small> --- </p>
