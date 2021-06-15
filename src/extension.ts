import * as vscode from "vscode";
import { ExtensionContext, window, commands, StatusBarAlignment } from "vscode";
import { create as createBin } from "sourcebin";
import linguist from "@sourcebin/linguist/dist/linguist.json";
import { write as copy } from "clipboardy";
import { sep } from "path";

export function activate(context: ExtensionContext) {
    const commandId = "bin.upload";

    // register command "bin.upload" to upload selection to sourcebin
    const disposable = commands.registerCommand(commandId, async () => {
        const editor = window.activeTextEditor;

        const fileName = editor?.document.fileName.split(sep).reverse()[0];
        const ext = fileName?.split(".").reverse()[0];

        const selection = editor?.selection;

        const selected =
            editor?.document.getText(selection) || editor?.document.getText();

        if (!selected) {
            window.showErrorMessage("Cannot create Empty Bin.");
            return;
        }

        let langId: number | undefined;
        for (const id in linguist) {
            if ((linguist as any)[id].extension === ext) {
                langId = parseInt(id);
                break;
            }
        }

        let url: string;

        try {
            const { short } = await createBin(
                [
                    {
                        content: selected,
                        language: langId || "text",
                    },
                ],
                {
                    title: fileName,
                }
            );
            url = short;
        } catch (e) {
            window.showErrorMessage(
                `Uploading to Bin Failed. Error: ${e.message}`
            );
            return;
        }

        const openURL = "Open URL";
        const copyURL = "Copy URL";
        const message = `Successfully uploaded to Sourcebin. Link: ${url}`;

        window.showInformationMessage(message, ...[openURL, copyURL]).then(selection => {
            if (selection === openURL) {
                vscode.env.openExternal(vscode.Uri.parse(`${url}`));
            }
            else if (selection === copyURL) {
                try {
                    copy(url);
                    window.showInformationMessage(`Successfully copied the URL to your clipboard.`);
                } catch (e) {
                    window.showErrorMessage(`Failed to copy the url. ${e}`);
                }
            }
        });
    });

    // create status bar button as a shortcut
    const statusBarItem = window.createStatusBarItem(
        StatusBarAlignment.Right,
        1000
    );
    statusBarItem.command = commandId;
    statusBarItem.text = "Upload to Bin";
    statusBarItem.tooltip = "Upload selection/file to SourceBin";
    statusBarItem.show();

    // push command and button to VSCode
    context.subscriptions.push(disposable);
    context.subscriptions.push(statusBarItem);
}
