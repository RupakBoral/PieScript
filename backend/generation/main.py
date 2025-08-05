from manim import *

class Main(Scene):
 def construct(self):
  axes = Axes(x_range=[-4*PI, 4*PI, PI], y_range=[-1.5, 1.5, 1], color=WHITE)
  graph = axes.plot(lambda x: np.sin(x), x_range=[-4*PI, 4*PI], color=BLUE)
  self.play(Create(axes))
  self.play(Create(graph))
  self.wait(0.5)