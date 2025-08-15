from manim import *

class Main(Scene):
    def construct(self):
        # Create the triangle
        triangle = Polygon([-2.5, -1.5, 0], [0, 1.5, 0], [2.5, -1.5, 0])
        
        # Label the sides
        side1 = MathTex("5").next_to(Line([-2.5, -1.5, 0], [0, 1.5, 0]), LEFT)
        side2 = MathTex("5").next_to(Line([0, 1.5, 0], [2.5, -1.5, 0]), RIGHT)
        side3 = MathTex("3").next_to(Line([-2.5, -1.5, 0], [2.5, -1.5, 0]), DOWN)
        
        # Create the objects
        self.play(Create(triangle))
        self.play(Write(VGroup(side1, side2, side3)))
        self.wait(0.5)