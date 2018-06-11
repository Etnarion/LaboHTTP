## Labo HTTP
Samuel Mayor et Alexandra Korukova

### Etape 1
Les sources du site web statique sont situées dans le dossier src au même niveau que le Dockerfile. Ce dernier crée une image à partir de php:7.0-apache, copie le dossier src dans /var/www/html/ et lance le serveur apache.  

Avec le flag -p 8080:80, le container écoute sur le port 8080 et redirige les données sur le port 80 dans le container.  

Une fois le container lancé, il suffit d'accèder à la page web avec localhost:8080.

### Etape 2
Dans cette étape, nous avons installé un serveur livrant du contenu dynamique. Pour ce faire, la librairie Chance a été utilisée. Dans le cadre de notre application, un script javascript utilisant le framework Express écoute sur le port 3000 et accepte des requêtes HTTP. Lorsque qu'elle reçoit une requête GET sur '/', elle retourne un payload JSON contenant une liste d'animaux générés aléatoirement par la librairie Chance.  

Pour mettre en place tout cela, il s'agit de "builder" l'image basée sur node:4.4. Grace au Dockerfile, cela copie le script javascript et ses dépendances dans le container puis lance le script en question. Il faut ensuite lancer le container sans oublier de mapper les ports comme suit : docker run -d -p 3000:3000 nom_image.

### Etape 3
Dans cette étape, nous utiliserons l'image de l'étape 1 pour lancer un container tournant un serveur apache et proposant du contenu statique. Nous utiliserons également celle de l'étape 2 qui propose du contenu dynamique.  

L'addresse ip des deux containers doit être obtenue par la commande docker inspect nom_container puis ajoutée dans le fichier de configuration du reverse proxy nommé 001-reverse-proxy.conf.  

Lors de la création de l'image, le fichier de configuration contenant les adresses ip des deux containers est copié dans le dossier /etc/apache2/sites-available/ du container du reverse proxy. Le Dockerfile demande ensuite au container de lancer les commandes a2enmod proxy et enmod proxy_http, ce qui a pour effet d'activer la fonctionnalité de reverse proxy du serveur apache. Il lance ensuite la commande a2ensite 001-reverse-proxy.conf qui active le reverse proxy et le rend disponible.  

Le ficher de configuration 001-reverse-proxy.conf contient 5 lignes notables décrites ci-dessous:  
ServerName animals.res.ch  
-> indique le nom du serveur. Permet d'accèder au site par ce nom.  
ProxyPass "/api/animals/" "http://172.17.0.3:3000/"  
ProxyPassReverse "/api/animals/" "http://172.17.0.3:3000/"  
-> définit l'adresse pour accèder au contenu dynamique. L'adresse ip indiquée ci-dessus est celle du container Express.  

ProxyPass "/" "http://172.17.0.2:80/"  
ProxyPassReverse "/" "http://172.17.0.2:80/"  
-> définit l'adresse pour accèder au contenu statique. L'adresse ip indiquée ci-dessus est celle du container apache_static.  

On peut finalement constater qu'une fois les containers lancés dans le bon ordre et en mappant les port 8080:80 sur le container reverse, on peut accèder au contenu statique en tapant l'adresse animals.res.ch:8080 et à celui dynamique avec animals.re.ch:8080/api/animals/

### Etape 4
Dans cette étape, la configuration du reverse proxy ainsi que celle de l'application Express n'ont pas été touchées.  

Nous avons écrit un script javascript mettant à jour dynamiquement la page jusqu'à lors statique offerte par l'image apache_static. Celui-ci est ajouté lors du build de l'image dans le dossier /var/www/html/js/ et inclu dans le fichier index.html.  

Il a pour but de générer une string contenant les informations d'un animal généré aléatoirement et l'afficher toutes les 2 secondes à la place d'un texte sur le site web.  

AJAX permet modifier le contenu d'une page sans devoir la recharger entièrement. 

### Etape 5
Durant cette étape, nous avons configuré le serveur reverse proxy afin de pouvoir lui passer les adresses ip des containers apache_static et express lors du run du container. Cela nous évite de devoir modifier le fichier 001-reverse-proxy.conf en y modifiant les adresses et build à nouveau l'image à chaque fois que celles-ci changent.  

Pour ce faire, nous avons utilisé des variables d'environnement. En effet, Docker permet, avec le flag -e sur la commande run, de définir des variables d'environnement à l'intérieur du container. Puis, par le biais de PHP, on peut générer le fichier de configuration avec des valeurs en fonction de ces variables d'environnement.  

Nous avons donc simplement inscrit les valeurs des variables d'environnement dans le fichier de configuration par un print de PHP.

### Management UI
Pour gérer notre environnement Docker, nous avons utilisé portainer.io, un outil de gestion de docker hosts.
On peut y accéder par localhost:9000 une fois la machine lancée. Cela nous permet ensuite de gérer les images et les containers afin de, par exemple, tuer des machines, voir l'état actuel des containers et autres.  

Nous constatons qu'il aurait été très utile d'avoir cet outil à disposition pour la réalisation de ce laboratoire.
