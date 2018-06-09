<?php
    $dynamic_app = getenv("DYNAMIC_APP");
	$static_app = getenv("STATIC_APP");
?>

<VirtualHost *:80>
    ServerName animals.res.ch

    ProxyPass '/api/animals/' 'http://<?php print "$dynamic_app"?>/'
    ProxyPassReverse '/api/animals/' "http://<?php print "$dynamic_app"?>/'

    ProxyPass '/' 'http://<?php print "$static_app"?>/'
    ProxyPassReverse '/' 'http://<?php print "$static_app"?>/'
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
