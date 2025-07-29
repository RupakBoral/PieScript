from manim import *

class Main(Scene):
    def construct(self):
        axes = Axes(
            x_range=[-PI, PI, PI/2],
            y_range=[-1.5, 1.5, 1],
            color=WHITE,
            axis_config={"include_tip": False}
        )

        sine_wave = axes.plot(lambda x: np.sin(x), x_range=[-PI, PI], color=BLUE)

        self.play(Create(axes))
        self.play(Create(sine_wave))
        self.wait(0.5)