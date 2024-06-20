# AGS Config (Desktop Oberfläche)

## Config von [end-4](https://github.com/end-4/dots-hyprland)
### Installation
- Auf die Seite von von den dots gehen: https://github.com/end-4/dots-hyprland
- im [Wiki](https://end-4.github.io/dots-hyprland-wiki/en/i-i/01setup/#manual-installation-basically-any-distro) den Anweisungen folgen für die manuelle Installation
- repo in "~/.cache/dots-hyprland" packen
#### zusätzlich benötigte Packages(die nicht schon in [packages.md](./packages.md) sind oder durch base Installation schon vorhanden sind):
##### Base
    - axel
    - bc
    - coreutils
    - fuzzel
    - jq
    - gojq
    - npm
    - typescript
    - rsync
    - gjs
##### Make dependencies of MicroTeX
    - tinyxml2 
    - gtkmm3
    - gtksourceviewmm
    - cairomm
##### Python
    - python-build
    - python-pillow
    - python-pywal
    - python-setuptools-scm
    - python-wheel
##### Player and Audio
    - libdusmenu-gtk3
    - plasma-browser-integration
##### GTK
    - webp-pixbuf-loader
    - gtk-layer-shell
    - gtk3
    - gtksourceview3 gobject-introspection
    - upower
    - yad
    - ydotool
    - xdg-user-dirs-gtk
##### Gnome
    - polkit-gnome
    - gnome-control-center
    - gammastep
##### Widgets
    - dart-sass
    - python-pywayland
    - python-psutil
    - hypridle-git
    - hyprlock-git
    - hyprpicker-git
    - anyrun-git
##### Fonts and Themes
    - fontconfig
    - qt5-wayland
    - ttf-readex-pro
    - ttf-jetbrains-mono-nerd
    - ttf-material-symbols-variable-git
    - ttf-space-mono-nerd
    - starhsip
##### Screenshot and Recorder
    - tesseract
    - tesseract-data-eng

### Update
- den Anweisungen im [Wiki](https://end-4.github.io/dots-hyprland-wiki/en/i-i/01setup/) folgen, Abschnitt "3 Updating"
- also basically:
    - git pull in Repo (~/.cache/dots-hyprland/)
    - ags config rüberholen ins eigene ags-repo (und dann updaten je nachdem, was ich verändert hab bei mir selbst)
        - dabei achten, dass `user_options.js` im root von ags bleibt, weil das die eigenen Options sind
    - im Repo update-ags.sh ausführen

### Eigene Anpassungen
- Custom Options gesetzt in `user_options.js`
- Brave Browser hiden in `ìsRealPlayer` Funktion in `musiccontrols.js`
- Brightness gefixt in `services/brightness.js`
- Utilities (Screenshot, Color Picker und Screen Kayboard) aktiviert in `modules/bar/normal/system.js`
- Pastel Yellow colors in `scss/_material.scss`
- Popup Volume on Volume change in `modules/indicators/indicatorvalues.js` mit `hook` Methode

## Config von [Aylur](https://github.com/Aylur/dotfiles)
### AGS (neue config)
- für ags in .config
  - eigenes ags clonen: `git clone git@github.com:NorinB/ags-config.git`
  - ordner umbennen zu "ags"
  - dann remote add original ags repo: `git remote add upstream git@github.com:Aylur/dotfiles.git`
  - dann `git fetch upstream`
  - dann checkout einmal auf upstream-ags: `git checkout upstream-ags`
  - bei Upstream update:
    - `git checkout upstream/main`
    - `git pull`
    - `git subtree split --prefix=ags --onto upstream-ags -b upstream-ags`
    - `git checkout upstream-ags`
    - `git push`
    - `git checkout main`
    - `git merge upstream-ags`
    - `git push`
    - dann wenn alles funktioniert: `git checkout old_config && git merge main && git push`
- needed packages:
    - aylurs-gtk-shell-git
    - gvfs
    - bun
    - dart-sass
    - fd
    - brightnessctl
    - swww
    - matugen
    - gnome-blueooth-3
    - fzf
    - hyprpicker
    - slurp
    - wf-recorder
    - wf-clipboard
    - wayshot
    - swappy
    - maybe: asusctl supergfxctl

### AGS (alte config)
- für ags in .config
  - ags original clonen: `git clone git@github.com:Aylur/dotfiles.git`
  - dann in den alten branch checkouten: `git checkout ags-pre-ts`
  - ordner umbennen zu "ags"
  - remote name ändern: `git remote rename origin upstream`
  - upstream branch name ändern: `git branch -m upstream-main`
  - dann remote add mein ags repo: `git remote add origin git@github.com:NorinB/ags-config.git`
  - dann `git fetch origin`
  - dann im idealfall auf main checkout
  - bei Upstream update:
    - `git checkout upstream-main`
    - `git pull`
    - `git subtree split --prefix=ags --onto upstream-ags -b upstream-ags`
    - `git checkout upstream-ags`
    - `git push`
    - `git checkout main`
    - `git merge upstream-ags`
    - `git push`
    - dann wenn alles funktioniert: `git checkout old_config && git merge main && git push`
- needed packages:
    - bun
    - gvfs
    - sassc
    - brightnessctl
    - swww
    - gnome-blueooth-3
    - hyprpicker
    - slurp
    - imagemagick
    - pavucontrol
    - wl-gammactl
    - wf-recorder
    - wf-clipboard
    - wayshot
    - swappy
    - python
    - python-pam
