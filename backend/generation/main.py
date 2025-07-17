from manim import *

class Main(Scene):
    def construct(self):
        text = Text("Chat Manim", font_size=64, color=BLUE)
        self.play(Write(text), run_time=2)
        self.wait(3)