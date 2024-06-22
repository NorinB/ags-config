import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { enableClickthrough } from "../.widgetutils/clickthrough.js";
import { RoundedCorner } from "../.commonwidgets/cairo_roundedcorner.js";
import { generateWindowName } from '../../utils/window-names.js';

export const CROSSHAIR_WINDOW_BASE_NAME = "crosshair";

export default (monitor = 0, ) => {
    return Widget.Window({
        monitor,
        name: generateWindowName(CROSSHAIR_WINDOW_BASE_NAME, monitor),
        layer: 'overlay',
        exclusivity: 'ignore',
        visible: false,
        child: Widget.Icon({
            icon: 'crosshair-symbolic',
            css: `
                font-size: ${userOptions.gaming.crosshair.size}px;
                color: ${userOptions.gaming.crosshair.color};
            `,
        }),
        setup: enableClickthrough,
    });
}

