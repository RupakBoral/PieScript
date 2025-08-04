from manim import *

class Main(Scene):
 def construct(self):
  axes = Axes(x_range=[0, 4 * PI, PI], y_range=[-1.5, 1.5, 1], color=BLUE)
  self.play(Create(axes))

  sine_wave = axes.plot(lambda x: np.sin(x), x_range=[0, 4 * PI], color=YELLOW)
  self.play(Create(sine_wave))

  dot = Dot().move_to(axes.coords_to_point(0, np.sin(0)))
  self.play(FadeIn(dot))

  self.play(dot.animate.move_to(axes.coords_to_point(2 * PI, np.sin(2 * PI))), run_time=2)
  self.wait(0.5)