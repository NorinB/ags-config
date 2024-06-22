import Widget from 'resource:///com/github/Aylur/ags/widget.js';

import WallpaperImage from './wallpaper.js';
import TimeAndLaunchesWidget from './timeandlaunches.js'
import SystemWidget from './system.js'
import { generateWindowName } from '../../utils/window-names.js';

export const DESKTOP_BACKGROUND_WINDOW_BASE_NAME = "desktopbackground";

export default (monitor) => Widget.Window({
    name: generateWindowName(DESKTOP_BACKGROUND_WINDOW_BASE_NAME, monitor),
    anchor: ['top', 'bottom', 'left', 'right'],
    layer: 'background',
    monitor: monitor,
    exclusivity: 'ignore',
    visible: true,
    child: Widget.Overlay({
        // child: WallpaperImage(monitor),
        child: Widget.Box({}),
        overlays: [
            TimeAndLaunchesWidget(),
            // SystemWidget(),
        ],
        setup: (self) => {
            self.set_overlay_pass_through(self.get_children()[1], true);
        },
    }),
});
