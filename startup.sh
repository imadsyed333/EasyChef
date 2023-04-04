python3 -m virtualenv -p `which python3` venv
source venv/bin/activate
pip install -r backend/requirements.txt
python3 backend/./manage.py makemigrations
python3 backend/./manage.py migrate
npm install --prefix ./frontend/


