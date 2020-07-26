
## Development

### Database option 1:

Requires Docker and docker-compose

Start the postgres database: `docker-compose up -d`

Add the database to the .env file:
```
DATABASE_URL=postgres://user:pass@localhost:5432/db
```

### Database option 2:

Create an app on heroku.com and add the free postgres database addon.


