# Directus Backend Deployment Guide

## Fly.io Deployment

This backend deploys Directus CMS to Fly.io with a persistent volume for uploads.

### Prerequisites

- [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/) installed
- Fly.io account
- External PostgreSQL database (Fly Postgres, Supabase, etc.)

### Initial Setup

1. **Create the Fly app** (if not already created):
   ```bash
   fly apps create green-careers-map-demo
   ```

2. **Create a persistent volume** for uploads:
   ```bash
   fly volumes create directus_data --region iad --size 1
   ```

3. **Set database secrets** (replace with your actual DB credentials):
   ```bash
   fly secrets set \
     DB_CLIENT=pg \
     DB_HOST=your-db-host.fly.dev \
     DB_PORT=5432 \
     DB_DATABASE=your_database \
     DB_USER=your_user \
     DB_PASSWORD=your_password \
     SECRET=$(openssl rand -base64 32) \
     ADMIN_EMAIL=admin@example.com \
     ADMIN_PASSWORD=your_secure_password
   ```

4. **Deploy**:
   ```bash
   fly deploy
   ```

### Environment Variables

**Required secrets** (set via `fly secrets set`):
- `DB_CLIENT` - Database client (should be `pg` for PostgreSQL)
- `DB_HOST` - Database hostname
- `DB_PORT` - Database port (usually `5432`)
- `DB_DATABASE` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `SECRET` - Random secret key for Directus (generate with `openssl rand -base64 32`)
- `ADMIN_EMAIL` - Admin user email
- `ADMIN_PASSWORD` - Admin user password

**Public environment variables** (already set in fly.toml):
- `WEBSOCKETS_ENABLED=true`
- `CORS_ENABLED=true`
- `PUBLIC_URL=https://green-careers-map-demo.fly.dev`

### Useful Commands

```bash
# Check deployment status
fly status

# View logs
fly logs

# SSH into the machine
fly ssh console

# Scale resources
fly scale memory 2048
fly scale vm shared-cpu-2x

# View secrets (values hidden)
fly secrets list

# Update a secret
fly secrets set DB_PASSWORD=new_password
```

### Accessing Directus

Once deployed, access your Directus instance at:
```
https://green-careers-map-demo.fly.dev
```

Log in with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you set in the secrets.

### Database Setup

For a new Fly Postgres database:

```bash
# Create a Postgres cluster
fly postgres create --name green-careers-db --region iad

# Attach it to your app (this sets DB secrets automatically)
fly postgres attach green-careers-db -a green-careers-map-demo
```

Alternatively, use any external PostgreSQL provider (Supabase, Railway, etc.) and manually set the DB secrets as shown above.

### Troubleshooting

- **App not starting**: Check logs with `fly logs` and ensure all required secrets are set
- **Database connection errors**: Verify DB credentials with `fly secrets list` and test connection
- **Volume issues**: Ensure volume is created and mounted in the correct region with `fly volumes list`
- **Port conflicts**: Directus runs on port 8055 internally (configured in fly.toml)
