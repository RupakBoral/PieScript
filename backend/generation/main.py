from manim import *

class HelloMessage(Scene):
    def construct(self):
        text = Text("Hello", font_size=96)
        self.play(Write(text))
        self.wait(2)

