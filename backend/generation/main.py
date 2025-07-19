from manim import *

class Main(Scene):
    def construct(self):
        self.camera.background_color = WHITE

        # Create the right triangle
        triangle = Polygon(ORIGIN, 3 * RIGHT, 4 * UP, color=BLUE, stroke_width=4)

        # Add side labels
        a_label = MathTex("a = 3", color=RED).next_to(triangle, DOWN).shift(1.5 * RIGHT)
        b_label = MathTex("b = 4", color=RED).next_to(triangle, LEFT).shift(2 * UP)
        c_label = MathTex("c = ?", color=RED).next_to(triangle, RIGHT).shift(2 * UP)

        # Create the formula
        formula = MathTex("a^2 + b^2 = c^2", color=BLUE).to_edge(UP)

        # Animate the substitution step
        substitution = MathTex("3^2 + 4^2 = ?", color=BLUE).next_to(formula, DOWN, buff=0.5)

        # Animate the calculation
        calculation = MathTex("9 + 16 = 25", color=BLUE).next_to(substitution, DOWN, buff=0.5)

        # Animate the equation
        equation = MathTex("25 = c^2", color=BLUE).next_to(calculation, DOWN, buff=0.5)

        # Animate the final result
        result = MathTex("c = 5", color=BLUE).next_to(equation, DOWN, buff=0.5)

        # Create the scene
        self.play(Create(triangle), Write(a_label), Write(b_label), Write(c_label), Write(formula), run_time=2)
        self.wait()
        self.play(Write(substitution), run_time=1.5)
        self.wait(0.5)
        self.play(Write(calculation), run_time=1.5)
        self.wait(0.5)
        self.play(Write(equation), run_time=1.5)
        self.wait(0.5)
        self.play(Write(result), run_time=1.5)
        self.wait(0.5)
        self.play(Transform(c_label, MathTex("c = 5", color=RED).next_to(triangle, RIGHT).shift(2 * UP)), run_time=1)
        self.wait(2)