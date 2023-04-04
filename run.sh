#!/bin/bash
cd backend
python3 ./manage.py runserver &
cd ..
npm start --prefix ./frontend/


#python3 backend/./manage.py runserver
#npm start --prefix ./frontend/



