from manim import *

class Main(Scene):
    def construct(self):
        axes = Axes(
            x_range=[-2*PI, 2*PI, PI],
            y_range=[-1.5, 1.5, 1],
            x_length=8,
            y_length=4,
            color=WHITE
        )
        graph = axes.plot(lambda x: np.sin(x), color=BLUE)
        self.play(Create(axes), Create(graph))
        self.wait(0.5)