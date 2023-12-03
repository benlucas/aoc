let
  pkgs = import <nixpkgs> {};
in

pkgs.mkShell {
  packages = with pkgs; [
    git
    neovim
    nodejs
    nodejs.pkgs.pnpm
  ];
}
