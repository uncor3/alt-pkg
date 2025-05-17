<div align="center">
    <img width='100px' src="assets/icon.png" alt="AltPkg showcase" >
    <div style='font-size:2rem'>AltPkg</div>
</div>

## What is this?

This is a browser extension that allows you to customize the `npm install` command on npmjs.com

<div>
    <img src="repo/showcase-gh.jpg" alt="AltPkg showcase" >
</div>

### Check out a 2 min video covering the project

<div align="center">
    <a href="https://www.youtube.com/watch?v=qM9O3n39gVM">
        <img src="https://img.youtube.com/vi/qM9O3n39gVM/0.jpg" width="500px" />
    </a>
</div>

## Features

- Override the default `npm install` script.
- Use multiple package managers (npm, yarn, pnpm, bun or a custom command)
- Super lightweight and easy to use.

## Please consider donating

Donations are greatly appreciated and help me to keep this project alive.

[Click here to donate](https://uncore.me/donate)

## Installation

Available on major browsers:

<div style="display: flex; flex-direction: column; gap: 10px;">

  <a href="https://chromewebstore.google.com/detail/altpkg/cgjeekneffphannbnehljdbbbfepojcl" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
    <img src="repo/gc.png" width="50px" alt="Chrome">
    Chrome Web Store
  </a>

  <a href="https://addons.mozilla.org/en-US/firefox/addon/altpkg" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
    <img src="repo/firefox.png" width="50px" alt="Firefox">
    Firefox Add-ons
  </a>

  <a href="https://microsoftedge.microsoft.com/addons/detail/altpkg/nlfbmcffgfpeojcemamhifjoaaihdoki" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
    <img src="repo/edge.png" width="50px" alt="Edge">
    Microsoft Edge Add-ons
  </a>
</div>

<br/>
<br/>

**Do not forget to rate the extension !! Helps a ton to get more visibility and feedback.**

## Build from source:

This extension is built using WXT, a lightweight framework for building browser extensions. To build the extension from source, follow these steps:

```bash
# Clone the repository
git clone https://github.com/uncor3/alt-pkg.git
cd alt-pkg
# Install dependencies
bun install
# Build the extension
# Will default to chrome if no argument is provided
bun run build
```

Then on your browser, go to the extensions page and enable developer mode. Click on "Load unpacked" and select the correct browser folder from `.output` folder inside the cloned repository.

You can also build the extension for a specific browser by providing the browser name as an argument:

```bash
# Build for Firefox
bun wxt build -b firefox
```

## Development

To start the development server, run:

```bash
## Defaults to chrome
bun dev
```

## Contributing

If you want to contribute to this project, feel free to open an issue or a pull request.

### Things that this project needs:

- Tests for the extension, currently there are no tests for the extension.

- A workflow to push the extension to the Chrome Web Store and Firefox Add-ons and etc

- A workflow for versioning and making releases

- Content script can be optimized more to avoid layout shifts
- There is currently no way to edit a custom command after it has been added. It can only be deleted
