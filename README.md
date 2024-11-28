<p align="center">
  <a href="[https://lunarwolf.net](https://damonicproducts.wixsite.com/smithcloud/support)"><img src="static/icons/icon.png" width="256"></a>
</p>

<div align="center">
  <h1>LunarWolf Browser</h1>

> Looking for help, as of now there is only one person {me} doing everything, it would be nice to have some help, if you would like to help, pleasee email me.

a modern web browser built with react.js, electron, and node.js

This Browser is a fork of the Wexond Browser Basse project, which can be found [`here`](https://github.com/wexond/browser-base)

</div>

# Table of Contents:
- [Motivation](#motivation)
- [Features](#features)
- [Screenshots](#screenshots)
- [Downloads](#downloads)
- [Contributing](#contributing)
- [Development](#development)
  - [Running](#running)
- [Documentation](#documentation)
- [License](#license)

# my motivation
If your looking for the perfect Framework for your next web browser build, then look no further because your search is over, i have been in your situation of searching for a electron browser base project that isent old or depricated, so i took the time to re create a browser-base project we all know and loved

# Motivation
Compiling and editing Chromium directly may be challenging and time consuming, so i decided to fork the once active Wexond project and fix it with modern web technologies. Hence, the development effort and time is greatly reduced. Either way Firefox is based on Web Components and Chrome implements new dialogs in WebUI (which essentially is hosted in WebContents).

# Features


- **LunarWolf Shield** - Browse the web without any ads and don't let websites to track you. Thanks to the LunarWolf Shield powered by [Cliqz](https://github.com/cliqz-oss/adblocker), websites can load even 8 times faster! --NOTE: this feature is currently not working properly and i am working to fix it.
- **Chromium without Google services and low resources usage** - Since lunarwolf uses Electron under the hood which is based on only several and the most important Chromium components, it's not bloated with redundant Google tracking services and others.
- **Fast and fluent UI** - The animations are really smooth and their timings are perfectly balanced.
- **Highly customizable new tab page** - Customize almost an every aspect of the new tab page!
- **Customizable browser UI** - Choose whether LunarWolf should have compact or normal UI.
- **Tab groups** - Easily group tabs, so it's hard to get lost.
- **Scrollable tabs**
- **LunarWolf supports Chrome extensions** - so far, only a select few extensions work properly, partly to do with the electron extension support in WebContentsView

## Other basic features


- Downloads popup with currently downloaded items (download manager WebUI page is WIP)
- History manager
- Bookmarks bar & manager
- Settings
- Find in page
- Dark and light theme
- Omnibox with autocomplete algorithm similar to Chromium
- State of the art tab system



### Instructions for setting up your build environment for windows, Linux and mac os





+ if your starting on linux or mac os this is the following command below before installing npm



```bash
sudo apt update # Checks for the latest version
```


+ Now for installing npm on mac os and linux run the following command in your terminal



```bash
sudo apt install npm # this command will install npm for linux and mac os
```


+ To Help you keep track of all your versions and make things a little easier for you, Download nvm (Node Version Manegar) from [`here`](https://github.com/coreybutler/nvm-windows)


  
+ after installing NVM Run your terminal or Command Prompt, then type the following command


  
```bash
nvm install 23.3.0 # this installed the compatible version of node.js for this project
```



after installing the correct version of node.js we want the nvm to use this version as its main defalt version slot, you can do this by running



```bash
nvm use 23.3.0 # sets the version you specified as defalt if your on windows but this command is also required to be ran on linux and mac os as well
```



and if your using linux or mac os run this command alongsize the other one



```bash
nvm alias default 23.3.0 # Sets the node version as the main defalt alias on linux and mac os
```



make sure you have the latest version of electron installed, you can do so by running this command in your terminal or command prompt


```bash
npm install -g electron@latest
```


+ Next up is installing yarn package manegar, which you can find from [`here`](https://yarnpkg.com/getting-started/install)



#### Note: New Versions of Node.js No Longer Need Windows Build Tools Alongside it, because node already includes them out of the box



### Building and Running Commands for Linux, mac os, and windows





#### Now in the main LunarWolf-Browser-main folder run the commands below

```bash
 yarn install # Install needed depedencies.
 yarn run build # Builds native modules using Electron headers.
 yarn run rebuild # Rebuilds native modules using Electron headers.
 yarn run start # Starts the LunarWolf App
```

### Compiling and yarn lint Commands for Windows



```bash
 yarn compile-win32 # Package LunarWolf for Windows
 yarn lint # Runs linter
 yarn lint-fix # Runs linter and automatically applies fixes
```


### Compiling and yarn lint Commands for Linux and mac os



```bash
$ yarn compile-linux # Package LunarWolf for Linux
$ yarn compile-darwin # Package LunarWolf for macOS
```


More commands can be found in [`package.json`](package.json).


# Documentation

Guides and the API reference are located in [`docs`](docs) directory.


# License

this is the code of the project before it became closed sourcee, this is also the version of the code that used the GPL 3.0 license
now that i learned more about there name and liceensing as a whole i am taking procossion to ensure i am not doing anything wrong
all i am doing is preserving the project and more, if you want to know more about my intensions read the intensions file for that 
which can be found here: https://github.com/LunarWolf-Browser-Projects/LunarWolf-Browser/blob/main/intensions.md so for the company reading this
my intensions where to never claim credit for your work, i just wanted to expand on it because i loved this project
