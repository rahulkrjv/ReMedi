# ReMedi: Secure Surplus Medication Redistribution Platform

_ReMedi_ is a secure, compliance-focused platform for redistributing surplus medications among hospitals, pharmacies (as donors), and NGOs, clinics (as claimants). Features include strict audit trailing, regulatory license handling, user/org role management, rich dashboards, and (optionally) AI-powered license/verification.

---

## 🛠️ Tech Stack

- **Backend:** Django 5, Django REST Framework (DRF), PostgreSQL, JWT (SimpleJWT), Celery
- **Frontend:** React (Vite), Tailwind CSS, Heroicons, React Router, Axios
- **Containerization:** Docker, docker-compose
- **CI/CD & Monitoring:** GitHub Actions, Sentry ready
- **AI Integration:** OpenRouter-hosted LLM (optional)
- **Storage:** Local/default, S3 (optional)
- **Auth:** Custom user/org system, roles, JWT, context-aware APIs

---

## 🚀 Features

- Auth, role-based routing (Hospitals, Pharmacies, NGOs, Admins)
- Medication inventory (CRUD), request management, real-time dashboard
- License submission, compliance, file uploads, admin toggles
- Full audit log, org & user management, API docs (Swagger/OpenAPI)
- Responsive, modern UI/UX with dark mode & dashboard widgets
- Extensible for AI-powered license verification or chatbot

---

## ⚡ Quick Start

### 1. Clone & Install (Dev Environment)

```bash
git clone https://github.com/your-org/ReMedi.git
cd ReMedi

# Python venv (backend)
python -m venv venv
venv\Scripts\activate   # On Windows
pip install -r backend/requirements.txt

# Node (frontend)
cd frontend
npm install
cd ..
```

### 2. Environment Variables

Copy & edit `.env.example` for both backend and (optionally) frontend:

```bash
cp backend/.env.example backend/.env
# Edit with DB credentials, SECRET_KEY, etc.
```

### 3. Database & Migrations

```bash
python backend/manage.py makemigrations
python backend/manage.py migrate
```

### 4. Seed Sample Data

**Automatic:**  
```bash
python backend/manage.py loaddata sample_data.json
```
*(see `/backend/sample_data.json` for loading demo users/orgs/medications)*

**Manual script:**  
```bash
python backend/manage.py create_test_accounts
```

### 5. Run in Development

**Backend:**
```bash
python backend/manage.py runserver 0.0.0.0:8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

Visit:  
- [http://localhost:8000/admin](http://localhost:8000/admin) (Django Admin)
- [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/) (API docs)
- [http://localhost:5173/](http://localhost:5173/) (Frontend)

---

## 🧪 Test Accounts

| Username      | Password   | Role          |
|---------------|------------|--------------|
| admin@demo.com| admin123   | Admin        |
| hosp1@demo.com| pass123    | Hospital     |
| ngo1@demo.com | pass123    | NGO/Clinic   |
| pharm1@demo.com| pass123   | Pharmacy     |

_Edit or extend these in `sample_data.json` or `/backend/management/commands/create_test_accounts.py`._

---

## 🐳 Docker/Prod

```bash
docker-compose up --build
```
Edit `docker-compose.yml` and env files as required.

---

## ⚙️ Environment Variables

See `/backend/.env.example` for all vars:  
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `ALLOWED_HOSTS`
- (optionally) S3, email, 3rd party credentials

---

## 🤖 Optional: AI/OCR Integration via OpenRouter

Add an `.env` key:  
```
OPENROUTER_API_KEY=your_apikey
```
Example backend Python usage:
```python
from openai import OpenAI
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="your-OPENROUTER_API_KEY",
)
completion = client.chat.completions.create(
    model="meta-llama/llama-4-maverick:free",
    messages=[{
        "role": "user",
        "content": "Please help me verify this license document:"
    }]
)
print(completion.choices[0].message.content)
```
You can add this to a management command or a DRF endpoint for advanced license/ID verification or add a chatbot to the app.

---

## 🤝 Contributing & License

MIT License. PRs welcome for new modules, translations, or AI integrations!