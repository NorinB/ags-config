// For every option, see ~/.config/ags/modules/.configuration/user_options.js
// (vscode users ctrl+click this: file://./modules/.configuration/user_options.js)
// (vim users: `:vsp` to split window, move cursor to this path, press `gf`. `Ctrl-w` twice to switch between)
//   options listed in this file will override the default ones in the above file

const userConfigOptions = {
    appearance: {
        fakeScreenRounding: 2, // 0: None | 1: Always | 2: When not fullscreen
    },
    apps: {
        bluetooth: 'blueman-manager',
        imageViewer: 'gwenview',
        network: 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center wifi',
        settings: 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center wifi',
        taskManager: 'btop',
        terminal: 'alacritty', // This is only for shell actions
    },
    brightness: {
        // Object of controller names for each monitor, either "brightnessctl" or "ddcutil" or "auto"
        // 'default' one will be used if unspecified
        // Examples
        // 'eDP-1': "brightnessctl",
        // 'DP-1': "ddcutil",
        controllers: {
            default: 'ddcutil',
        },
    },
    cheatsheet: {
        keybinds: {
            configPath: '~/.config/hypr/configs/keybinds.conf', // Path to hyprland keybind config file. Leave empty for default (~/.config/hypr/hyprland/keybinds.conf)
        },
    },
    dock: {
        enabled: true,
        hiddenThickness: 5,
        pinnedApps: ['kitty', 'dolphin', 'spotify', 'firefox'],
        layer: 'top',
        monitorExclusivity: true, // Dock will move to other monitor along with focus if enabled
        searchPinnedAppIcons: false, // Try to search for the correct icon if the app class isn't an icon name
        trigger: [], // client_added, client_move, workspace_active, client_active, client_removed
        // Automatically hide dock after `interval` ms since trigger
        autoHide: [
            // {
            //     trigger: 'client-added',
            //     interval: 500,
            // },
            // {
            //     trigger: 'client-removed',
            //     interval: 500,
            // },
        ],
    },
    icons: {
        'trayIconSubstitutions': {
            "state-ok": "checkmark",
        },
        // Find the window's icon by its class with levenshteinDistance
        // The file names are processed at startup, so if there
        // are too many files in the search path it'll affect performance
        // Example: ['/usr/share/icons/Tela-nord/scalable/apps']
        searchPaths: [''],
        symbolicIconTheme: {
            dark: 'Adwaita',
            light: 'Adwaita',
        },
        substitutions: {
            'blueman-manager': 'bluetooth',
            'code-url-handler': 'visual-studio-code',
            Code: 'visual-studio-code',
            'GitHub Desktop': 'github-desktop',
            'Minecraft* 1.20.1': 'minecraft',
            'gnome-tweaks': 'org.gnome.tweaks',
            'pavucontrol-qt': 'pavucontrol',
            wps: 'wps-office2019-kprometheus',
            wpsoffice: 'wps-office2019-kprometheus',
            '': 'image-missing',
        },
        regexSubstitutions: [
            {
                regex: /^steam_app_(\d+)$/,
                replace: 'steam_icon_$1',
            },
        ],
    },
    music: {
        preferredPlayer: 'spotify',
    },
    keybinds: {
        sidebar: {
            pin: 'Ctrl+p',
            nextTab: 'Ctrl+Page_Down',
            prevTab: 'Ctrl+Page_Up',
        },
    },
    overview: {
        scale: 0.1, // Relative to screen size
        numOfRows: 2,
        numOfCols: 5,
        wsNumScale: 0.09,
        wsNumMarginScale: 0.07,
    },
    time: {
        // See https://docs.gtk.org/glib/method.DateTime.format.html
        // Here's the 12h format: "%I:%M%P"
        // For seconds, add "%S" and set interval to 1000
        format: '%H:%M',
        interval: 5000,
        dateFormatLong: '%a, %d. %B', // On bar
        dateInterval: 5000,
        dateFormat: '%d. %B', // On notif time
    },
};

export default userConfigOptions;
