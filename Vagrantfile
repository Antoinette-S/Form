# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  
  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty32"

  # Setting up SSH Username/Password
  config.ssh.username = "vagrant"
  config.ssh.password = "vagrant"

  # Setting hostname of vm
  config.vm.hostname = "intranet.vm"

  # config.landrush.enabled = false # Enable the Landrush plugin.
  # config.landrush.tld = 'vm' # Set a custom TLD to use for this VM.

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  config.vm.network "public_network"

  # Share an additional folder to the guest VM.
  config.vm.synced_folder "./", "/var/www/html", create: true, group: "www-data", owner: "www-data"

  # Provisioning with script.sh to install necessary packages to mimic 
  config.vm.provision :shell, path: "script.sh"
  
end
