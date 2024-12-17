# gbg-rental

skapa en .env fil som innehåller dessa variabler för att appen ska fungera

.env
VITE_JSONBIN_API_KEY=\$2a\$10\$u9Dkz1rrLt7W1VCZM3YfZeChI2LriHPIIruPPkGj77fYIbHqZoDcq
VITE_JSONBIN_BIN_URL_ITEMS=https://api.jsonbin.io/v3/b/675193d5e41b4d34e4604981
VITE_JSONBIN_BIN_URL_USERS=https://api.jsonbin.io/v3/b/6756e4dde41b4d34e4626570
VITE_JSONBIN_BIN_URL_ORDERS=https://api.jsonbin.io/v3/b/675193d5e41b4d34e4604981

Om ni inte pallar göra ett eget konto kan ni logga in med jens@gmail.com lösen 123

DEV:

Prio:
[x] När man skapar en produkt ska namnet komma med coumputed
[x] Flytta ut isLoggedIn + LocalStorage-logiken till en store
[ ] Lägga till computes för state-variabler
[ ] Lägga till start och slutdatum samt totalpris i bokningsformuläret(istället för i lägg till produkt formuläret)

Not prio:
[ ] Check för att man inte ska kunna registrera samma email flera gånger
[ ] är man inte inloggad så ska "boka" knappen finnas på startsidan, klickar man på "boka" så ska man länkas till logginsidan.
[ ] Lägga till så att man bara kan se tillgängliga datum vid bokning?
[ ] Fixa private routes för att inte kunna komma åt my-items m.m. om man inte är inloggad(https://router.vuejs.org/guide/advanced/navigation-guards.html)
[ ] Slå ihop services till en fil och skicka med URL från composable-filerna

Toleen jobbar på det:
[ ] Alla ordrar visas för alla användare i historiken

Optional:
[ ] Lägga till så att man kan ladda upp en fil som bild vid upläggning av produkt?
[ ] Logik för att skicka anvvändaren till sidan deen avr på innan log in


Slå ihop services till en fil och skicka med URL från composable-filerna
Flytta ut isLogged in + localstorage-logiken till en store
Lägga till computes för state-variabler
(Logik för att skicka anvvändaren till sidan deen avr på innan log in)