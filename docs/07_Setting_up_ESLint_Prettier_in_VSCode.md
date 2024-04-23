# Setting up ESLint and Prettier in VSCode

To use the **ESLint** extension in VSCode, follow these steps:

1. Install the ESLint extension by navigating to the Extensions view (icon with four squares) and searching for "ESLint."
2. Once installed, press `Command + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows/Linux) to open the Command Palette.
3. Type "**Preferences: Open User Settings (JSON)**" in the Command Palette and select it. This opens the VSCode settings.json file.
4. Add the following configuration to enable ESLint to automatically fix code issues upon saving:

`"editor.codeActionsOnSave": {"source.fixAll.eslint": true},`

5. Save the settings.json file.

To install the **Prettier** extension in VSCode and configure it, do the following:

1. Install the "Prettier - Code formatter" extension from the Extensions view.
2. Press `Command + Shift + P` (Mac) or `Ctrl + Shift + P` (Windows/Linux) to open the Command Palette.
3. Type "**Preferences: Open User Settings (JSON)**" and select it to open the settings.json file.
4. Add the following configuration to enable Prettier to automatically format code upon saving:

`"editor.formatOnSave": true,`

5. Save the settings.json file.

Additionally, you can find the installed extensions listed in the `.vscode/extensions.json` file.
