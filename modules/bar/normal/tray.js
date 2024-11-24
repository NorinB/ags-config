import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';
import userOptions from '../../.configuration/user_options.js';
const { Box, Icon, Button, Revealer } = Widget;
const { Gravity } = imports.gi.Gdk;

function substituteTrayIcon(iconName) {
  for (const [key, value] of Object.entries(userOptions.icons.trayIconSubstitutions)) {
    if (iconName === key) {
      return value;
    }
  }
  return iconName;
}

const SysTrayItem = (item) => {
    if (item.id === null) {
      return null;
    }
    // item.icon = substituteTrayIcon(item.icon);
    return Button({
        className: 'bar-systray-item',
        child: Icon({ hpack: 'center' }).bind('icon', item, 'icon'),
        setup: (self) => self
            .hook(item, (self) => self.tooltipMarkup = item['tooltip-markup'])
        ,
        onPrimaryClick: (_, event) => item.activate(event),
        onSecondaryClick: (btn, event) => item.menu.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null),
    });
};

export const Tray = (props = {}) => {
    const trayContent = Box({
        className: 'margin-right-5 spacing-h-15',
        setup: (self) => self
            .hook(SystemTray, (self) => {
                self.children = SystemTray.items.map(SysTrayItem);
                self.show_all();
            })
        ,
    });
    const trayRevealer = Widget.Revealer({
        revealChild: true,
        transition: 'slide_left',
        transitionDuration: userOptions.animations.durationLarge,
        child: trayContent,
    });
    return Box({
        ...props,
        children: [trayRevealer],
    });
}
