#!/usr/bin/env bash
set -e

echo "📦 Updating system..."
apt-get update

echo "🐍 Installing Python & pip..."
apt-get install -y python3 python3-pip

echo "🎬 Installing FFmpeg..."
apt-get install -y ffmpeg

echo "📝 Installing LaTeX (required by Manim for text rendering)..."
apt-get install -y texlive-latex-base texlive-fonts-recommended texlive-fonts-extra texlive-latex-extra

echo "📦 Installing Manim..."
pip3 install manim

echo "✅ System dependencies installed successfully."
