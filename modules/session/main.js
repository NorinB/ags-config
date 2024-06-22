import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import SessionScreen from "./sessionscreen.js";
import PopupWindow from '../.widgethacks/popupwindow.js';
import { generateWindowName } from '../../utils/window-names.js';

export const SESSION_WINDOW_BASE_NAME = "session";

export default (id = 0) => PopupWindow({ // On-screen keyboard
    monitor: id,
    name: generateWindowName(SESSION_WINDOW_BASE_NAME, id),
    visible: false,
    keymode: 'on-demand',
    layer: 'overlay',
    exclusivity: 'ignore',
    anchor: ['top', 'bottom', 'left', 'right'],
    child: SessionScreen({ id: id }),
})
