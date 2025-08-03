from manim import *

class Main(Scene):
    def construct(self):
        axes = VGroup()
        axes.add(Line((-PI, 0, 0), (PI, 0, 0)))
        axes.add(Line((0, -1.5, 0), (0, 1.5, 0)))
        self.add(axes)

        sine_wave = FunctionGraph(lambda x: np.sin(x), x_range=[-PI, PI])
        self.play(Create(sine_wave))
        self.wait(0.5)