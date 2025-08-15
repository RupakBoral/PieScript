# ---------- Base image with Node.js ----------
    FROM node:18-bullseye

    # ---------- Install Python, pip, ffmpeg, and system deps ----------
    RUN apt-get update && \
        apt-get install -y python3 python3-pip ffmpeg libcairo2-dev libpango1.0-dev && \
        rm -rf /var/lib/apt/lists/*
    
    # ---------- Set working directory ----------
    WORKDIR /app
    
    # ---------- Copy package files and install Node deps ----------
    COPY package*.json ./
    RUN npm install
    
    # ---------- Install Python deps (Manim + others) ----------
    RUN pip3 install manim numpy pillow requests
    
    # ---------- Copy the rest of the app ----------
    COPY . .
    
    # ---------- Environment variables ----------
    # (Render will override PORT if needed)
    ENV PORT=10000
    ENV PYTHONUNBUFFERED=1
    
    # ---------- Start server ----------
    CMD ["npm", "start"]
    