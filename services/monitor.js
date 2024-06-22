import userOptions from '../modules/.configuration/user_options.js';
import Gdk from 'gi://Gdk';
import App from 'resource:///com/github/Aylur/ags/app.js'
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { BAR_CORNER_TOP_LEFT_WINDOW_BASE_NAME, BAR_CORNER_TOP_RIGHT_WINDOW_BASE_NAME, BAR_WINDOW_BASE_NAME, Bar, BarCornerTopleft, BarCornerTopright } from '../modules/bar/main.js';
import Cheatsheet, { CHEATSHEET_WINDOW_BASE_NAME } from '../modules/cheatsheet/main.js';
import DesktopBackground, { DESKTOP_BACKGROUND_WINDOW_BASE_NAME } from '../modules/desktopbackground/main.js';
import Dock, { DOCK_WINDOW_BASE_NAME } from '../modules/dock/main.js';
import Corner, { CORNER_WINDOW_BASE_NAME } from '../modules/screencorners/main.js';
import Crosshair, { CROSSHAIR_WINDOW_BASE_NAME } from '../modules/crosshair/main.js';
import Indicator, { INDICATOR_WINDOW_BASE_NAME } from '../modules/indicators/main.js';
import Osk, { OSK_WINDOW_BASE_NAME } from '../modules/onscreenkeyboard/main.js';
import Session, { SESSION_WINDOW_BASE_NAME } from '../modules/session/main.js';
import { generateWindowName } from '../utils/window-names.js';
import { CLOSE_ANIM_TIME } from '../config.js';

export function setupMonitorAttached() {
    return Widget.Window({
        name: `new-monitor`,
        setup: self => self.hook(Hyprland, (_, monitorName) => {
            if (!monitorName) {
                return;
            }
            const monitor = Hyprland.monitors.find(monitor => monitor.name === monitorName);
            if (!monitor) {
              return;
            }
            const n = Gdk.Display.get_default()?.get_n_monitors() || 1;
            const range = (length, start = 1) => Array.from({ length }, (_, i) => i + start);
            range(n, 0).forEach((n) => {
                removeWindows(n).then(() => {
                    addWindowsToMonitor(n).catch(print);
                }).catch(error => {
                    print(error);
                    addWindowsToMonitor(n).catch(print);
                });
            });
        }, 'monitor-added'),
        visible: false,
    });
}

async function removeWindows(monitorId) {
    App.removeWindow(generateWindowName(DESKTOP_BACKGROUND_WINDOW_BASE_NAME, monitorId));
    App.removeWindow(generateWindowName(CROSSHAIR_WINDOW_BASE_NAME, monitorId));
    App.removeWindow(generateWindowName(INDICATOR_WINDOW_BASE_NAME, monitorId));
    App.removeWindow(generateWindowName(CHEATSHEET_WINDOW_BASE_NAME, monitorId));
    App.removeWindow(generateWindowName(OSK_WINDOW_BASE_NAME, monitorId));
    App.removeWindow(generateWindowName(SESSION_WINDOW_BASE_NAME, monitorId));
    if (userOptions.dock.enabled) {
        App.removeWindow(generateWindowName(DOCK_WINDOW_BASE_NAME, monitorId));
    }
    const generatePositionString = (position) => position.replace(/\s/, "");
    if (userOptions.appearance.fakeScreenRounding !== 0) {
        App.removeWindow(generateWindowName(`${CORNER_WINDOW_BASE_NAME}${generatePositionString("top left")}`, monitorId));
        App.removeWindow(generateWindowName(`${CORNER_WINDOW_BASE_NAME}${generatePositionString("top right")}`, monitorId));
    }
    App.removeWindow(generateWindowName(`${CORNER_WINDOW_BASE_NAME}${generatePositionString("bottom left")}`, monitorId));
    App.removeWindow(generateWindowName(`${CORNER_WINDOW_BASE_NAME}${generatePositionString("bottom right")}`, monitorId));
    App.removeWindow(generateWindowName(BAR_CORNER_TOP_LEFT_WINDOW_BASE_NAME, monitorId));
    App.removeWindow(generateWindowName(BAR_CORNER_TOP_RIGHT_WINDOW_BASE_NAME, monitorId));
    App.removeWindow(generateWindowName(BAR_WINDOW_BASE_NAME, monitorId));
    const closeWindowDelays = {}; // For animations
    for (let i = 0; i < (Gdk.Display.get_default()?.get_n_monitors() || 1); i++) {
      closeWindowDelays[`osk${i}`] = CLOSE_ANIM_TIME;
    }
    App.closeWindowDelay = closeWindowDelays;
}

async function addWindowsToMonitor(monitorId) {
    App.addWindow(DesktopBackground(monitorId));
    App.addWindow(Crosshair(monitorId));
    App.addWindow(Indicator(monitorId));
    App.addWindow(Cheatsheet(monitorId));
    App.addWindow(Osk(monitorId));
    App.addWindow(Session(monitorId));
    if (userOptions.dock.enabled) {
        App.addWindow(Dock(monitorId));
    }
    if (userOptions.appearance.fakeScreenRounding !== 0) {
        App.addWindow(Corner(monitorId, 'top left', true));
        App.addWindow(Corner(monitorId, 'top right', true));
    }
    App.addWindow(Corner(monitorId, 'bottom left', userOptions.appearance.fakeScreenRounding !== 0));
    App.addWindow(Corner(monitorId, 'bottom right', userOptions.appearance.fakeScreenRounding !== 0));
    App.addWindow(BarCornerTopleft(monitorId));
    App.addWindow(BarCornerTopright(monitorId));
    App.addWindow(await Bar(monitorId));
    const closeWindowDelays = {}; // For animations
    for (let i = 0; i < (Gdk.Display.get_default()?.get_n_monitors() || 1); i++) {
        closeWindowDelays[`osk${i}`] = CLOSE_ANIM_TIME;
    }

    App.closeWindowDelay = closeWindowDelays;
}
