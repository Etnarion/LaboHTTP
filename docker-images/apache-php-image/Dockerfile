FROM php:7.0-apache

RUN apt-get update && \
    apt-get install -y vim
COPY src/ /var/www/html/
COPY apache2-foreground /usr/local/bin/
