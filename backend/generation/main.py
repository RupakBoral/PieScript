from manim import *

# Define custom theme colors
PRIMARY = "#3498db"
SECONDARY = "#f1c40f"
TEXT = "#2ecc71"
BACKGROUND = "#2c3e50"

class Main(Scene):
    def construct(self):
        # Set background color
        self.camera.background_color = BACKGROUND

        # Create title
        title = Text("Area of a Square", font_size=48, color=TEXT)
        self.play(Write(title))
        self.wait(1)

        # Create square
        square = Square(side_length=2, color=PRIMARY, fill_opacity=0.5)
        self.play(Create(square))
        self.wait(1)

        # Label square's side length
        side_length_label = MathTex("s = 2", color=TEXT).next_to(square, DOWN)
        self.play(Write(side_length_label))
        self.wait(1)

        # Calculate area
        area_label = MathTex("A = s^2", color=TEXT).next_to(square, UP)
        area_value = MathTex("A = 2^2 = 4", color=SECONDARY).next_to(area_label, DOWN)
        self.play(Write(area_label))
        self.wait(1)
        self.play(Write(area_value))
        self.wait(2)

        # Highlight area
        area_highlight = SurroundingRectangle(area_value, color=SECONDARY, buff=0.1)
        self.play(Create(area_highlight))
        self.wait(2)

        # Fade out
        self.play(FadeOut(title, square, side_length_label, area_label, area_value, area_highlight))
        self.wait(1)
