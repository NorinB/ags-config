packages=(
  "gjs"
  "glib2"
  "glib2-devel"
  "glibc"
  "gtk3"
  "gtk-layer-shell"
  "libpulse"
  "pam"
  "gnome-blueooth-3.0"
  "greetd"
  "libdmusmenu-gtk3"
  "libsoup3"
  "power-profiles-daemon"
  "upower"
  "axel"
  "bc"
  "fuzzel"
  "npm"
  "typescript"
  "libdmusmenu-gtk3"
  "fontconfig"
  "ttf-readex-pro"
  "ttf-jetbrains-mono-nerd"
  "ttf-material-symbols-variable-git"
  "ttf-space-mono-nerd"
  "ttf-rubik-vf"
  "ttf-gabarito-git"
  "foot"
  "gnome-keyring"
  "gnome-control-center"
  "gammastep"
  "webp-pixbuf-loader"
  "gtksourceview3"
  "gobject-introspection"
  "yad"
  "ydotool"
  "tinyxml2"
  "gtkmm3"
  "gtksourceviewmm"
  "cairomm"
  "python-materialyoucolor-git"
  "gradience"
  "python-libsass"
  "python-material-color-utilities"
  "python-build"
  "python-pillow"
  "python-pywal"
  "python-setuptools-scm"
  "python-wheel"
  "tesseract"
  "tesseract-data-eng"
  "dart-sass"
  "python-pywayland"
  "python-psutil"
)

print() {
  echo $1
}

ask_user() {
  while true; do
    read -p "$1 [Y/n] " yns
    case $yns in
    "" | [Yy]*)
      return 0
      ;;
    [Nn]*)
      return 1
      ;;
    *) echo "Please answer with Y/y/N/n or press enter to confirm." ;;
    esac
  done
}

install_yay() {
  set +e
  ask_user "Install yay as your AUR helper?"
  user_confirmed=$?
  set -e
  if [ "$user_confirmed" -eq 0 ]; then
    sudo pacman -S --needed git base-devel && git clone https://aur.archlinux.org/yay.git && cd yay && makepkg -si
    print "✅ Set up yay"
  else
    print "ℹ️ Skipped installing yay"
    if command -v yay >/dev/null 2>&1; then
      print "✅ yay is available, setup can continue..."
    else
      print "❗ yay must be installed to continue this setup!"
      print "Exiting..."
      exit 1
    fi
  fi
}

if [ -x "$(command -v yay)" ]; then
  print "✅ yay already installed. Skipping installation"
else
  install_yay
fi
print ""

action_selection=""

while ! [ "$action_selection" = "q" ]; do
  print "Select action:"
  print "0) install custom ags needed for this config"
  print "1) install needed packages"
  print "2) uninstall needed packages"
  read -p "Choose an action via number or enter 'q' to exit this menu: " action_selection

  if [ "$action_selection" = "0" ]; then
    cd ./illogical-impulse-agsv1-git
    source ./PKGBUILD
    yay -S --needed --asdeps "${depends[@]}"
    makepkg -Asi
    cd ..
  fi

  if [ "$action_selection" = "1" ]; then
    yay -S --needed "${packages[@]}"
  fi

  if [ "$action_selection" = "2" ]; then
    yay -Rsu "${packages[@]}"
  fi
done

print ""
print "✅ AGS install script complete"
