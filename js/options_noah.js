/**
 * An object holding Options that are Variables with cached values.
 *
 * to update an option at runtime simply run
 * ags -r "options.path.to.option.setValue('value')"
 *
 * resetting:
 * ags -r "options.reset()"
 */

import {
  Option,
  resetOptions,
  getValues,
  apply,
  getOptions,
} from "./settings/option.js";
import { USER } from "resource:///com/github/Aylur/ags/utils.js";
import themes from "./themes.js";

export default {
  reset: resetOptions,
  values: getValues,
  apply: apply,
  list: getOptions,

  spacing: Option(9),
  padding: Option(8),
  radii: Option(9),

  popover_padding_multiplier: Option(1.4, {
    category: "General",
    note: "popover-padding: padding × this",
    type: "float",
    unit: "",
  }),

  color: {
    red: Option("#e55f86", { scss: "red" }),
    green: Option("#00D787", { scss: "green" }),
    yellow: Option("#EBFF71", { scss: "yellow" }),
    blue: Option("#51a4e7", { scss: "blue" }),
    magenta: Option("#9077e7", { scss: "magenta" }),
    teal: Option("#51e6e6", { scss: "teal" }),
    orange: Option("#E79E64", { scss: "orange" }),
  },

  theme: {
    name: Option(themes[0].name, {
      category: "exclude",
      note: "Name to show as active in quicktoggles",
    }),

    icon: Option(themes[0].icon, {
      category: "exclude",
      note: "Icon to show as active in quicktoggles",
    }),

    scheme: Option(themes[0]["theme.scheme"], {
      enums: ["dark", "light"],
      type: "enum",
      note: "Color scheme to set on Gtk apps: 'ligth' or 'dark'",
      title: "Color Scheme",
      scss: "color-scheme",
    }),
    bg: Option(themes[0]["theme.bg"], {
      title: "Background Color",
      scss: "bg-color",
    }),
    fg: Option(themes[0]["theme.fg"], {
      title: "Foreground Color",
      scss: "fg-color",
    }),

    accent: {
      accent: Option(themes[0]["theme.accent.accent"], {
        category: "Theme",
        title: "Accent Color",
        scss: "accent",
      }),
      fg: Option(themes[0]["theme.accent.fg"], {
        category: "Theme",
        title: "Accent Foreground Color",
        scss: "accent-fg",
      }),
      gradient: Option(themes[0]["theme.accent.gradient"], {
        category: "Theme",
        title: "Accent Linear Gradient",
        scss: "accent-gradient",
      }),
    },

    widget: {
      bg: Option(themes[0]["theme.widget.bg"], {
        category: "Theme",
        title: "Widget Background Color",
        scss: "_widget-bg",
      }),
      opacity: Option(themes[0]["theme.widget.opacity"], {
        category: "Theme",
        title: "Widget Background Opacity",
        unit: "",
        scss: "widget-opacity",
      }),
    },
  },

  border: {
    color: Option(themes[0]["border.color"], {
      category: "Border",
      title: "Border Color",
      scss: "_border-color",
    }),
    opacity: Option(themes[0]["border.opacity"], {
      category: "Border",
      title: "Border Opacity",
      unit: "",
    }),
    width: Option(themes[0]["border.width"], {
      category: "Border",
      title: "Border Width",
    }),
  },

  hypr: {
    inactive_border: Option(themes[0]["hypr.inactive_border"], {
      category: "Border",
      title: "Border on Inactive Windows",
      scss: "exclude",
    }),
    wm_gaps_multiplier: Option(themes[0]["hypr.wm_gaps_multiplier"], {
      category: "General",
      scss: "wm-gaps-multiplier",
      note: "wm-gaps: padding × this",
      type: "float",
      unit: "",
    }),
  },

  // TODO: use this on revealers
  transition: Option(200, {
    category: "exclude",
    note: "Transition time on aminations in ms, e.g on hover",
    unit: "ms",
  }),

  font: {
    font: Option(themes[0]["font.font"], {
      type: "font",
      title: "Font",
      scss: "font",
    }),
    mono: Option(themes[0]["font.mono"], {
      title: "Monospaced Font",
      scss: "mono-font",
    }),
    size: Option(themes[0]["font.size"], {
      scss: "font-size",
      unit: "pt",
    }),
  },

  applauncher: {
    width: Option(themes[0]["applauncher.width"]),
    height: Option(themes[0]["applauncher.height"]),
    icon_size: Option(themes[0]["applauncher.icon_size"]),
  },

  bar: {
    position: Option(themes[0]["bar.position"], {
      enums: ["top", "bottom"],
      type: "enum",
    }),
    style: Option(themes[0]["bar.style"], {
      enums: ["floating", "normal", "separated"],
      type: "enum",
    }),
    flat_buttons: Option(themes[0]["bar.flat_buttons"], {
      scss: "bar-flat-buttons",
    }),
    separators: Option(themes[0]["bar.separators"]),
    icon: Option(themes[0]["bar.icon"], {
      note: '"distro-icon" or a single font',
    }),
  },

  battery: {
    show_percentage: Option(themes[0]["battery.show_percentage"], {
      persist: true,
      noReload: false,
      category: "exclude",
    }),
    bar: {
      width: Option(themes[0]["battery.bar.width"], { category: "Bar" }),
      height: Option(themes[0]["battery.bar.height"], { category: "Bar" }),
      full: Option(themes[0]["battery.bar.full"], { category: "Bar" }),
    },
    low: Option(themes[0]["battery.low"], { category: "Bar" }),
    medium: Option(themes[0]["battery.medium"], { category: "Bar" }),
  },

  desktop: {
    wallpaper: {
      fg: Option(themes[0]["desktop.wallpaper.fg"], { scss: "wallpaper-fg" }),
      img: Option(themes[0].options["desktop.wallpaper.img"], {
        scssFormat: (v) => `"${v}"`,
        type: "img",
      }),
    },
    avatar: Option(themes[0]["desktop.avatar"], {
      scssFormat: (v) => `"${v}"`,
      type: "img",
      note: "displayed in quicksettings and locksreen",
    }),
    screen_corners: Option(themes[0]["desktop.screen_corners"], {
      scss: "screen-corners",
    }),
    clock: {
      enable: Option(themes[0]["desktop.clock.enable"]),
      position: Option(themes[0]["desktop.clock.position"], {
        note: "halign valign",
      }),
    },
    drop_shadow: Option(themes[0]["desktop.drop_shadow"], {
      scss: "drop-shadow",
    }),
    shadow: Option(themes[0]["desktop.shadow"], { scss: "shadow" }),
    dock: {
      icon_size: Option(themes[0]["desktop.dock.icon_size"]),
      pinned_apps: Option(themes[0]["desktop.dock.pinned_apps"], {
        scss: "exclude",
      }),
    },
  },

  notifications: {
    black_list: Option(themes[0]["notifications.black_list"], {
      note: "app-name | entry",
    }),
    position: Option(themes[0]["notifications.position"], { note: "anchor" }),
    width: Option(themes[0]["notifications.width"]),
  },

  dashboard: {
    sys_info_size: Option(themes[0]["dashboard.sys_info_size"], {
      category: "Desktop",
      scss: "sys-info-size",
    }),
  },

  mpris: {
    black_list: Option(themes[0]["mpris.black_list"], {
      category: "Bar",
      title: "List of blacklisted mpris players",
      note: "filters for bus-name, name, identity, entry",
    }),
    preferred: Option(themes[0]["mpris.preferred"], {
      category: "Bar",
      title: "Preferred player",
    }),
  },

  workspaces: Option(themes[0]["workspaces"], {
    category: "Bar",
    title: "No. workspaces on bar and overview",
    note: "Set it to 0 to make it dynamic",
  }),

  temperature: "/sys/class/thermal/thermal_zone0/temp",
  systemFetchInterval: 5000,
  brightnessctlKBD: "asus::kbd_backlight",
  substitutions: {
    icons: [
      ["transmission-gtk", "transmission"],
      ["blueberry.py", "bluetooth"],
      ["Caprine", "facebook-messenger"],
      ["", "preferences-desktop-display"],
    ],
    titles: [
      ["com.github.Aylur.ags", "AGS"],
      ["transmission-gtk", "Transmission"],
      ["com.obsproject.Studio", "OBS"],
      ["com.usebottles.bottles", "Bottles"],
      ["com.github.wwmm.easyeffects", "Easy Effects"],
      ["org.gnome.TextEditor", "Text Editor"],
      ["org.gnome.design.IconLibrary", "Icon Library"],
      ["blueberry.py", "Blueberry"],
      ["org.wezfurlong.wezterm", "Wezterm"],
      ["com.raggesilver.BlackBox", "BlackBox"],
      ["firefox", "Firefox"],
      ["org.gnome.Nautilus", "Files"],
      ["libreoffice-writer", "Writer"],
      ["", "Desktop"],
    ],
  },
};
