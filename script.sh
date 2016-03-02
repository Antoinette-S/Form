#! /bin/bash
 
# Vagrantfile script to setup development environment.
# Last Updated - 3/21/2015 (Alex Bard)
 
# Update and upgrade system.
sudo apt-get -y update > /dev/null
 
# Installing Apache
sudo apt-get -y install apache2 > /dev/null

# Installing MySQL and it's dependencies, Also, setting up root password for MySQL as it will prompt to enter the password during installation
# MySQL password -> rootpass
 
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password rootpass'
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password rootpass'
sudo apt-get -y install mysql-server > /dev/null
sudo apt-get -y install libapache2-mod-auth-mysql > /dev/null 
 
# Installing PHP and it's dependencies
sudo apt-get -y install php5 > /dev/null
sudo apt-get -y install libapache2-mod-php5 > /dev/null
sudo apt-get -y install php5-mysql > /dev/null
sudo apt-get -y install php5-mcrypt > /dev/null
sudo apt-get -y install php5-xdebug > /dev/null
sudo apt-get -y install php5-fpm > /dev/null

# Installing basic tools
sudo apt-get -y install git > /dev/null

# Add ServerName to httpd.conf
echo "ServerName localhost" > /etc/apache2/httpd.conf

# Setup hosts file
VHOST=$(cat <<EOF
<VirtualHost *:80>
  DocumentRoot "/var/www/html"
  ServerName localhost
  <Directory "/var/www/html">
     AllowOverride All
  </Directory>
</VirtualHost>
EOF
)
echo "${VHOST}" > /etc/apache2/sites-enabled/000-default.conf

# Setup xdebug.ini
XDEBUG=$(cat <<EOF
zend_extension=xdebug.so
xdebug.remote_enable = on
xdebug.remote_connect_back = on
xdebug.idekey = "vagrant"
EOF
)
echo "${XDEBUG}" > /etc/php5/mods-available/xdebug.ini

# Loading needed modules to make apache and php-xdebug work
a2enmod actions fastcgi rewrite
service apache2 reload
sudo service php5-fpm restart

# removing index.html
sudo rm /var/www/html/index.html