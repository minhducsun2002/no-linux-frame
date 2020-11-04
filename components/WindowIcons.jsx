const { React, getModule, getModuleByDisplayName } = require('powercord/webpack');
const { Icon } = require('powercord/components');
const { Minimize, Maximize } = require('./Icons');

const { ipcRenderer } = require('electron');
const HeaderBarContainer = getModuleByDisplayName('HeaderBarContainer', false);

module.exports = class WindowIcons extends React.PureComponent {
  constructor () {
    super();

    this.classes = getModule([ 'iconWrapper', 'clickable' ], false);
    this.state = {
      isMaximized: ipcRenderer.invoke('POWERCORD_WINDOW_IS_MAXIMIZED')
    };

    ipcRenderer.on('POWERCORD_WINDOW_MAXIMIZE', () => this.setState({ isMaximized: true }));
    ipcRenderer.on('POWERCORD_WINDOW_UNMAXIMIZE', () => this.setState({ isMaximized: false }));
  }

  render () {
    return [ React.createElement(HeaderBarContainer.Icon, {
      onClick: () => DiscordNative.window.minimize(),
      icon: () => React.createElement(Icon, {
        className: this.classes.icon,
        name: 'Subtract'
      })
    }),
    React.createElement(HeaderBarContainer.Icon, {
      onClick: () => {
        if (this.state.isMaximized) {
          DiscordNative.window.restore();
        } else {
          DiscordNative.window.maximize();
        }
      },
      icon: () => React.createElement(this.state.isMaximized ? Minimize : Maximize, {
        className: this.classes.icon
      })
    }),
    React.createElement(HeaderBarContainer.Icon, {
      onClick: () => DiscordNative.window.close(),
      icon: () => React.createElement(Icon, {
        className: this.classes.icon,
        name: 'Close'
      })
    }) ];
  }
};
