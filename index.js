const { Plugin } = require('powercord/entities');
const { React, getModuleByDisplayName } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const WindowIcons = require('./components/WindowIcons');

module.exports = class NoBar extends Plugin {
  async startPlugin () {
    const HeaderBarContainer = await getModuleByDisplayName('HeaderBarContainer');

    this.loadStylesheet('style.css');

    inject('no-linux-frame', HeaderBarContainer.prototype, 'renderLoggedIn', (args, res) => {
      if (!res.props.toolbar) {
        res.props.toolbar = React.createElement(React.Fragment, { children: [] });
      }

      res.props.toolbar.props.children.push(React.createElement(WindowIcons));

      return res;
    });
  }

  pluginWillUnload () {
    uninject('no-linux-frame');
  }
};
