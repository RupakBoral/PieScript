from manim import *

class Main(Scene):
    def construct(self):
        # Display Title
        title = Text("Pythagorean Theorem", font_size=48, weight=BOLD).to_edge(UP)
        self.play(Write(title))
        self.wait(1)

        # Draw Triangle
        triangle = VGroup(
            Line(LEFT, RIGHT, color=WHITE),
            Line(LEFT, LEFT + UP * np.sqrt(3), color=WHITE),
            Line(RIGHT, LEFT + UP * np.sqrt(3), color=WHITE)
        ).scale(2).move_to(ORIGIN)
        self.play(Create(triangle))

        # Label Sides
        a_label = MathTex("a").next_to(triangle[0], DOWN)
        b_label = MathTex("b").next_to(triangle[1], LEFT)
        c_label = MathTex("c").next_to(triangle[2], RIGHT + UP/2)
        self.play(Write(a_label), Write(b_label), Write(c_label))

        # Show Formula
        formula = MathTex("a^2 + b^2 = c^2").next_to(triangle, DOWN * 2)
        self.play(Write(formula))

        # Hold Scene
        self.wait(3)