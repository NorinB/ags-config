'use strict';
// Import
import Gdk from 'gi://Gdk';
import GLib from 'gi://GLib';
import App from 'resource:///com/github/Aylur/ags/app.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
// Stuff
import userOptions from './modules/.configuration/user_options.js';
import { firstRunWelcome, startBatteryWarningService } from './services/messages.js';
import { startAutoDarkModeService } from './services/darkmode.js';
// Widgets
import { Bar, BarCornerTopleft, BarCornerTopright } from './modules/bar/main.js';
import Cheatsheet from './modules/cheatsheet/main.js';
import DesktopBackground from './modules/desktopbackground/main.js';
import Dock from './modules/dock/main.js';
import Corner from './modules/screencorners/main.js';
import Crosshair from './modules/crosshair/main.js';
import Indicator from './modules/indicators/main.js';
import Osk from './modules/onscreenkeyboard/main.js';
import Overview from './modules/overview/main.js';
import Session from './modules/session/main.js';
import SideLeft from './modules/sideleft/main.js';
import SideRight from './modules/sideright/main.js';
import { COMPILED_STYLE_DIR } from './init.js';
import { setupMonitorAttached } from './services/monitor.js';

const range = (length, start = 1) => Array.from({ length }, (_, i) => i + start);
function forMonitors(widget) {
    const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
    return range(n, 0).map(widget).flat(1);
}

async function forMonitorsAsync(widget) {
    const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
    let bars = [];
    for (let index = 0; index < n; index++) {
        bars.push(await widget(index).catch(print));
    }
    return bars;
}

export const CLOSE_ANIM_TIME = 210; // Longer than actual anim time to make sure widgets animate fully

class AGS {
  windows;   
  closeWindowDelays = {}; // For animations

  constructor() {
    this.init();
  }

  async getWindows() {
    return [
      setupMonitorAttached(),
      forMonitors(DesktopBackground),
      forMonitors(Crosshair),
      Overview(),
      forMonitors(Indicator),
      forMonitors(Cheatsheet),
      SideLeft(),
      SideRight(),
      forMonitors(Osk),
      forMonitors(Session),
      ...(userOptions.dock.enabled ? [forMonitors(Dock)] : []),
      ...(userOptions.appearance.fakeScreenRounding !== 0 ? [
        forMonitors((id) => Corner(id, 'top left', true)),
        forMonitors((id) => Corner(id, 'top right', true)),
      ] : []),
      forMonitors((id) => Corner(id, 'bottom left', true)),
      forMonitors((id) => Corner(id, 'bottom right', true)),
      ...(await forMonitorsAsync(Bar).catch(print)),
      ...(userOptions.appearance.barRoundCorners ? [forMonitors(BarCornerTopleft), forMonitors(BarCornerTopright)] : []),
    ];
  }

  async init() {
    // Start stuff
    handleStyles(true);
    startAutoDarkModeService().catch(print);
    firstRunWelcome().catch(print);
    startBatteryWarningService().catch(print)

    this.windows = await this.getWindows().catch(print);

    for (let i = 0; i < (Gdk.Display.get_default()?.get_n_monitors() || 1); i++) {
      this.closeWindowDelays[`osk${i}`] = CLOSE_ANIM_TIME;
    }

    App.config({
      css: `${COMPILED_STYLE_DIR}/style.css`,
      stackTraceOnError: true,
      closeWindowDelay: this.closeWindowDelays,
      windows: this.windows.flat(1),
    });
  }
}


export const agsInstance = new AGS();
// Stuff that don't need to be toggled. And they're async so ugh...
// const bars = forMonitorsAsync(Bar);
// Bar().catch(print); // Use this to debug the bar. Single monitor only.

