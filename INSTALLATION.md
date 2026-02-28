# JoyMatcher Rails 8 - Installation Guide

## Prerequisites

- **Ruby:** 3.3.10 (see below for installation)
- **PostgreSQL:** 14+ (database)
- **Node.js:** 18+ (for JavaScript tooling)
- **Git:** For version control

---

## Step 1: Install Ruby 3.3.10 (Windows)

### Using RubyInstaller (Recommended)

1. Download **Ruby+Devkit 3.3.10-1 (x64)** from:
   https://rubyinstaller.org/downloads/

2. Run the installer:
   - ✅ Add Ruby executables to PATH
   - ✅ Run 'ridk install' for MSYS2
   - Install to: `C:\Ruby33-x64`

3. Complete MSYS2 setup:
   - Press `Enter` to install default toolchain (option 1)

4. Verify installation:
   ```bash
   ruby --version
   # Expected: ruby 3.3.10

   gem --version
   # Expected: gem 3.x.x
   ```

---

## Step 2: Install PostgreSQL

1. Download from: https://www.postgresql.org/download/windows/

2. Install PostgreSQL 14+ with:
   - Port: 5432 (default)
   - Set a password for `postgres` user
   - Remember this password for database setup

3. Verify installation:
   ```bash
   psql --version
   # Expected: psql (PostgreSQL) 14.x or higher
   ```

---

## Step 3: Install Node.js (for JavaScript tooling)

1. Download from: https://nodejs.org/

2. Install **Node.js 18+ LTS**

3. Verify installation:
   ```bash
   node --version
   # Expected: v18.x.x or higher

   npm --version
   # Expected: 9.x.x or higher
   ```

---

## Step 4: Setup Rails Application

1. **Install Bundler:**
   ```bash
   gem install bundler
   ```

2. **Install Rails dependencies:**
   ```bash
   cd "C:\Users\FisayoAnimashaun\OneDrive - Reliance HMO Limited\Desktop\JoyMatcher"
   bundle install
   ```

3. **Configure database:**
   - Copy `config/database.yml.example` if it exists
   - Or edit `config/database.yml`:
   ```yaml
   default: &default
     adapter: postgresql
     encoding: unicode
     pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
     username: postgres
     password: YOUR_PASSWORD_HERE  # Replace with your PostgreSQL password
     host: localhost

   development:
     <<: *default
     database: joymatcher_development

   test:
     <<: *default
     database: joymatcher_test

   production:
     <<: *default
     database: joymatcher_production
   ```

4. **Create databases:**
   ```bash
   rails db:create
   rails db:migrate
   ```

5. **Install JavaScript dependencies:**
   ```bash
   npm install
   ```

6. **Build assets:**
   ```bash
   rails tailwindcss:build
   ```

---

## Step 5: Run the Application

1. **Start Rails server:**
   ```bash
   rails server
   ```

2. **In a separate terminal, watch Tailwind CSS:**
   ```bash
   rails tailwindcss:watch
   ```

3. **Open browser:**
   - Navigate to: http://localhost:3000
   - You should see the JoyMatcher homepage

---

## Troubleshooting

### Ruby Not Found After Installation

**Fix:**
1. Restart your terminal/VSCode
2. Or manually add to PATH:
   - System Environment Variables → Path → Add: `C:\Ruby33-x64\bin`

### PostgreSQL Connection Error

**Fix:**
1. Ensure PostgreSQL service is running:
   ```bash
   # Open Services (Windows + R → services.msc)
   # Find "postgresql-x64-14" and start it
   ```

2. Verify credentials in `config/database.yml`

### Bundle Install Fails (pg gem error)

**Fix:**
1. Ensure PostgreSQL bin directory is in PATH:
   - Add: `C:\Program Files\PostgreSQL\14\bin`

2. Install pg gem manually:
   ```bash
   gem install pg -- --with-pg-config="C:\Program Files\PostgreSQL\14\bin\pg_config.exe"
   ```

### Tailwind CSS Not Compiling

**Fix:**
1. Reinstall Tailwind standalone executable:
   ```bash
   rails tailwindcss:install
   ```

2. Manually run build:
   ```bash
   rails tailwindcss:build
   ```

---

## Development Workflow

1. **Start development servers:**
   ```bash
   # Terminal 1: Rails server
   rails server

   # Terminal 2: Tailwind CSS watcher
   rails tailwindcss:watch

   # Terminal 3: (Optional) Solid Queue background jobs
   rails solid_queue:start
   ```

2. **Access application:**
   - Frontend: http://localhost:3000
   - Rails console: `rails console`
   - Database console: `rails db`

3. **Run tests:**
   ```bash
   rails test
   ```

4. **Code quality checks:**
   ```bash
   rubocop
   brakeman
   bundler-audit
   ```

---

## Docker Alternative (Optional)

If you prefer containerized development:

```bash
# Build Docker image
docker build -t joymatcher .

# Run with Docker Compose
docker-compose up
```

See [Dockerfile](./Dockerfile) and `.devcontainer/` for configuration.

---

## Next Steps

1. ✅ Read [CLAUDE.md](./CLAUDE.md) for system architecture
2. ✅ Read [docs/](./docs/) for product specifications
3. ✅ Read [rails_components/README.md](./rails_components/README.md) for UI components
4. ✅ Check [brain/state/](./brain/state/) for development progress

---

## Support

For issues or questions:
- GitHub Issues: [Create an issue](https://github.com/joymatcher/joymatcher/issues)
- Documentation: [docs/](./docs/)
- Rails Guides: https://guides.rubyonrails.org/

---

**Version:** 1.0.0
**Last Updated:** 2026-02-28
