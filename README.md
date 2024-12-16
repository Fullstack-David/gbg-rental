# gbg-rental

skapa en .env fil som innehåller dessa variabler för att appen ska fungera

.env
VITE_JSONBIN_API_KEY=\$2a\$10\$u9Dkz1rrLt7W1VCZM3YfZeChI2LriHPIIruPPkGj77fYIbHqZoDcq
VITE_JSONBIN_BIN_URL_ITEMS=https://api.jsonbin.io/v3/b/675193d5e41b4d34e4604981
VITE_JSONBIN_BIN_URL_USERS=https://api.jsonbin.io/v3/b/6756e4dde41b4d34e4626570
VITE_JSONBIN_BIN_URL_ORDERS=https://api.jsonbin.io/v3/b/675193d5e41b4d34e4604981

Om ni inte pallar göra ett eget konto kan ni logga in med jens@gmail.com lösen 123



DEV:

[ ] Bort med "ta bort annons" från startsidan och lägg istället till den under "mina produkter"
[ ] är man inte inloggad så ska "boka" knappen finnas på startsidan, klickar man på "boka" så ska man länkas till logginsidan.
[ ] Nu har vi två navbars, en med produktgrejer och en med logga ut, slå ihop dessa?
[ ] I ItemsView ligger det två identiska BookingFormView, vi kanske nöjer oss med en?
[ ] Lägga till start och slutdatum samt totalpris i bokningsformuläret(istället för i lägg till produkt formuläret)

[ ] Lägga till så att man bara kan se tillgängliga datum vid bokning?
[ ] Lägga till så att man kan ladda upp en fil som bild vid upläggning av produkt?
[ ] Bokningar som görs läggs inte till i kundvagnen utan bokas direkt(ska vi behålla det så och ta bort kundvagnen eller vill vi göra så att [ ] alla bokningar hamnar i kundvagnen?)

[ ] När man loggar ut är bokningsknappen och "ta bort annons" kvar
[ ] Alla ordrar visas för alla användare i historiken
[ ] Ordrar sparas inte (Spara på användarobjektet och hämta från item-ref eller spara i egen JSONBin och hämta efter användar id?)

[ ] Komma överens om vi ska spara hela item-objekt i orders eller om i nöjer oss med ID för att sedan hämta informationen från items

[ ] Check för att man inte ska kunna registrera samma email flera gånger
[ ] Det finns både /items och /-routen visar identiska grejer, ta bort en a dem.
[ ] Fixa private routes för att inte kunna komma åt my-items m.m. om man inte är inloggad(https://router.vuejs.org/guide/advanced/navigation-guards.html)

Slå ihop services till en fil och skicka med URL från composable-filerna
Flytta ut isLogged in + localstorage-logiken till en store
Lägga till computes för state-variabler
(Logik för att skicka anvvändaren till sidan deen avr på innan log in)