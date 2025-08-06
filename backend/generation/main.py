from manim import *

class Main(Scene):
    def construct(self):
        axes = Axes(
            x_range=[0, 10, 2],
            y_range=[0, 100, 20],
            x_axis_config={"include_tip": False},
            y_axis_config={"include_tip": False},
        )

        labels = VGroup(
            axes.get_x_axis_label("Input Size (n)"),
            axes.get_y_axis_label("Time Complexity")
        )

        self.play(Create(axes), Create(labels))

        # O(1)
        o1 = axes.plot(lambda x: 1, x_range=[0, 10], color=RED)
        o1_label = MathTex("O(1)", color=RED).next_to(o1, RIGHT).shift(UP * 3)
        self.play(Create(o1), Write(o1_label))

        # O(log n)
        ologn = axes.plot(lambda x: np.log(x) * 10, x_range=[1, 10], color=ORANGE)
        ologn_label = MathTex("O(\log n)", color=ORANGE).next_to(ologn, RIGHT).shift(UP * 2)
        self.play(Create(ologn), Write(ologn_label))

        # O(n)
        on = axes.plot(lambda x: x * 10, x_range=[0, 10], color=YELLOW)
        on_label = MathTex("O(n)", color=YELLOW).next_to(on, RIGHT).shift(UP * 1)
        self.play(Create(on), Write(on_label))

        # O(n log n)
        onlogn = axes.plot(lambda x: x * np.log(x) * 3, x_range=[1, 10], color=GREEN)
        onlogn_label = MathTex("O(n \log n)", color=GREEN).next_to(onlogn, RIGHT).shift(UP * 0)
        self.play(Create(onlogn), Write(onlogn_label))

        # O(n²)
        on2 = axes.plot(lambda x: x**2 * 2, x_range=[0, 7], color=BLUE)
        on2_label = MathTex("O(n^2)", color=BLUE).next_to(on2, RIGHT).shift(DOWN * 1)
        self.play(Create(on2), Write(on2_label))

        self.wait(0.5)