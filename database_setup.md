# Postgres macOS setup
This is a guide for macOS 
## Database initialisation
Make sure folder specified is empty
```bash
initdb -D /usr/local/var/postgres
```
If successful then run the following command
```bash
pg_ctl -D /usr/local/var/postgres -l logfile start
```
After this run the <b style="color: orange">psql</b> command to connect to db server
```bash
psql -U <username> -d <databasename>
```
Change <b>\<username\></b> and <b>\<databasename\> </b>to your username and databasename respectively
For more information about how to use the <b style="color: orange">psql</b> tool
visit <a href="https://www.postgresql.org/docs/9.3/app-psql.html" style="color: blue">postgresql.org/psql</a>

<br/>
<br/>
<br/>



# Ware Ware Game


