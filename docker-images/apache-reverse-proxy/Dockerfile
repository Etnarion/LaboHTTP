FROM php:7.0-apache
COPY conf/ /etc/apache2/sites-available/
RUN ["a2enmod", "proxy"]
RUN ["a2enmod", "proxy_http"]
RUN ["a2ensite", "001-reverse-proxy.conf"]
