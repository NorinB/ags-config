// For every option, see ~/.config/ags/modules/.configuration/user_options.js
// (vscode users ctrl+click this: file://./modules/.configuration/user_options.js)
// (vim users: `:vsp` to split window, move cursor to this path, press `gf`. `Ctrl-w` twice to switch between)
//   options listed in this file will override the default ones in the above file

const userConfigOptions = {
  apps: {
    bluetooth: "blueman-manager",
    imageViewer: "gwenview",
    network: 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center wifi',
    settings: 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center wifi',
    taskManager: "btop",
    terminal: "alacritty", // This is only for shell actions
  },
  brightness: {
    // Object of controller names for each monitor, either "brightnessctl" or "ddcutil" or "auto"
    // 'default' one will be used if unspecified
    // Examples
    // 'eDP-1': "brightnessctl",
    // 'DP-1': "ddcutil",
    controllers: {
      default: "ddcutil",
      "DP-2": "ddcutil",
      "HDMI-A-4": "ddcutil",
      "DP-4": "ddcutil",
    },
  },
  music: {
    preferredPlayer: "spotify",
  },
  keybinds: {
    sidebar: {
      pin: "Ctrl+p",
      nextTab: "Ctrl+Page_Down",
      prevTab: "Ctrl+Page_Up",
    },
  },
  overview: {
    scale: 0.1, // Relative to screen size
    numOfRows: 2,
    numOfCols: 5,
    wsNumScale: 0.09,
    wsNumMarginScale: 0.07,
  },
};

export default userConfigOptions;
