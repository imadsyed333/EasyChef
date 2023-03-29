python3 -m virtualenv -p `which python3` venv
source venv/bin/activate
pip install -r requirements.txt
python3 ./manage.py makemigrations
python3 ./manage.py migrate



