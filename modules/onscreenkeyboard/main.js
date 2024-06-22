import { generateWindowName } from '../../utils/window-names.js';
import PopupWindow from '../.widgethacks/popupwindow.js';
import OnScreenKeyboard from "./onscreenkeyboard.js";

export const OSK_WINDOW_BASE_NAME = "osk";

export default (id) => PopupWindow({
    monitor: id,
    anchor: ['bottom'],
    name: generateWindowName(OSK_WINDOW_BASE_NAME, id),
    showClassName: 'osk-show',
    hideClassName: 'osk-hide',
    child: OnScreenKeyboard({ id: id }),
});
