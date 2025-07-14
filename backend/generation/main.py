from manim import *

class HelloManim(Scene):
    def construct(self):
        text = Text("Hello, Manim!", font_size=72)
        self.play(Write(text))
        self.wait(1)
