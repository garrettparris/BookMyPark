
# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:3.8

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# create root directory for our project in the container
RUN mkdir /covidweb

# Set the working directory to /music_service
WORKDIR /covidweb
COPY requirements.txt /covidweb/

# Copy the current directory contents into the container at /music_service
COPY . /covidweb/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt
# RUN python manage.py makemigrations && python manage.py migrate
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
EXPOSE 8000/tcp 8000