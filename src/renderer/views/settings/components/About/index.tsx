import * as React from 'react';

import { Header, Row, Title, Control } from '../App/style';
import { Button } from '~/renderer/components/Button';
import store from '../../store';
import { APP_ICON } from '~/renderer/constants/imgs';
import { observer } from 'mobx-react-lite';

import { ElectronVer, ChromiumVer, V8Ver, NodeVer, AppVer } from '~/renderer/constants/versions';
    
export const About = () => {
  return (
    <>
    <a id="about">
      <Header>About LunarWolf</Header>
      <Row>
       <Title>
       LunarWolf is a fork of <a rel="noopener" target="_blank" href="https://github.com/wexond">Wexond Browser</a> by <a rel="noopener" target="_blank" href="https://github.com/IroniumStudios">Damon Smith</a>.
       </Title>
     </Row>
     <Row>
       <p>
         <br/>
         It uses <a rel="noopener" target="_blank" href="https://www.electronjs.org">Electron</a> as a base, and combines <a rel="noopener" target="_blank" href="https://react.dev">React.js</a> with <a rel="noopener" target="_blank" href="https://m1.material.io">Material Design</a> principles, and icons from <a rel="noopener" target="_blank" href="https://fonts.google.com/icons">Google's Library</a>.
         <br/>
         Wexond was originally developed by <a rel="noopener" target="_blank" href="https://github.com/sentialx">Eryk Rakowski</a>.
       </p>
     </Row>
     <Row>
       <p>&nbsp;&nbsp;
         <a rel="noopener" target="_blank" href="https://github.com/LunarWolf-Browser-Projects/LunarWolf-Browser">
         <img width="64px" title="lunarwolf Logo (Click Me!)" alt="app_icon.png" className="appicon" src={APP_ICON}></img></a>
       </p>
     </Row>
     <Row>
       <p>
         <a href="https://www.electronjs.org/" target="_blank" rel="noopener">Electron</a>:&nbsp;<span id="electron-version">{ElectronVer}</span>
         <br/>
         <a href="https://www.chromium.org/" target="_blank" rel="noopener">Chromium</a>:&nbsp;<span id="chrome-version">{ChromiumVer}</span>
         <br/>
         <a href="https://nodejs.org/" target="_blank" rel="noopener">Node.js</a>:&nbsp;<span id="node-version">{NodeVer}</span>
         <br/>
         <a href="https://v8.dev/" target="_blank" rel="noopener">V8</a>:&nbsp;<span id="v8-version">{V8Ver}</span>
       </p>
     </Row>
     <Row>
       <p>
         <a rel="noopener" target="_blank" href="https://github.com/lunarwolf-project/lunarwolf-browser">App Version</a>: {AppVer}
         <br/>
         <br/>
         <small>Copyright © <a href="https://thorium.rocks/about" target="_blank" rel="noopener">Alexander D. Frick</a></small>
       </p>
     </Row>
    </a>
    </>
  );
};
