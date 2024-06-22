import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Dock from './dock.js';
import { generateWindowName } from '../../utils/window-names.js';

export const DOCK_WINDOW_BASE_NAME = "dock";

export default (monitor = 0) => Widget.Window({
    monitor,
    name: generateWindowName(DOCK_WINDOW_BASE_NAME, monitor),
    layer: userOptions.dock.layer,
    anchor: ['bottom'],
    exclusivity: 'normal',
    visible: true,
    child: Dock(monitor),
});
