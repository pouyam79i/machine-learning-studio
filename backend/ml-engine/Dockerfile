# Use the official Python 3.8 slim image as the base image
FROM python:3.9-slim

RUN apt-get update && \
    apt-get install -y iputils-ping && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory within the container
WORKDIR /app

# Copy the necessary files and directories into the container
COPY . .

# Upgrade pip and install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5000 for the Flask application
EXPOSE 5000

# Define the command to run the Flask application using Gunicorn
CMD ["python", "server.py"]

