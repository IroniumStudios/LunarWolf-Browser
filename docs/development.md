# Development

## IPC

Now, the preferred way to communicate between processes is to use [`@wexond/rpc-electron`](https://github.com/IroniumStudios/base-rpc/tree/master/packages/rpc-electron) package.

Example:

Handling the IPC message in the main process:

[`src/main/network/network-service-handler.ts`](../src/main/network/network-service-handler.ts)


Sending the IPC message to the main process:

```ts
const { data } = await networkMainChannel.getInvoker().request('http://localhost');
```

Common RPC interface

[`src/common/rpc/network.ts`](../src/common/rpc/network.ts)

## Remote module

As Electron has deprecated the `remote` module, i have migrated to RPC solution aka (base-rpc)

## BrowserView Class

electron has deprecated the BrowserView class and plans on fully replacing it with WebContentsView so we are currently in the proceess of migrating our BrowserView usage to WebContentsView.

## Node integration

We are going to turn off `nodeIntegration`, enable `contextIsolation` and `sandbox` in the UI webContents,
therefore we prefer not having requires to node.js built-in modules in renderers.

## Project structure

Common interfaces, constants etc. should land into the `common` directory.
