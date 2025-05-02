FROM python:3.13.3-slim


ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY requirements.txt .

RUN python -m venv appvenv

RUN /bin/bash -c "source appvenv/bin/activate && \
    pip install --upgrade pip && \
    pip install -r requirements.txt"
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]