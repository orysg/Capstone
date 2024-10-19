FROM python:3.13-alpine3.20

WORKDIR /app

COPY requirements.txt ./

COPY templates /app/templates

RUN pip install -r requirements.txt

COPY *.py .

EXPOSE 5000

CMD ["python", "app.py"]