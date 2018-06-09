FROM php:7.0-apache
COPY conf/ /etc/apache2/sites-available/
COPY conf/ /etc/apache2/sites-enabled/
CMD ["a2enmod", "proxy"]
CMD ["a2enmod", "proxy_http"]
CMD ["a2ensite", "001-reverse-proxy.conf"]
CMD ["service", "apache2", "restart"]
CMD ["service", "apache2", "reload"]
