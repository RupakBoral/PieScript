from manim import *

class Main(Scene):
    def construct(self):
        # Set the scene
        self.camera.background_color = "#ffffff"

        # Step 1: Show the 2D complex plane with real and imaginary axes labeled clearly
        real_axis = NumberLine(x_range=[-6, 6, 1], include_tip=True, color=BLUE).shift(0 * UP)
        imaginary_axis = NumberLine(x_range=[-6, 6, 1], include_tip=True, color=RED).rotate(90 * DEGREES).shift(0 * RIGHT)
        self.play(Create(real_axis), Create(imaginary_axis))
        self.wait(1)
        real_label = MathTex(r"\text{Re}", color=BLUE).next_to(real_axis, direction=DOWN)
        imaginary_label = MathTex(r"\text{Im}", color=RED).next_to(imaginary_axis, direction=LEFT)
        self.play(Write(real_label), Write(imaginary_label))
        self.wait(1)

        # Step 2: Plot a complex number z = 3 + 4i as a point
        z_point = Dot(np.array([3, 4, 0]), color=YELLOW)
        self.play(FadeIn(z_point))
        self.wait(1)

        # Step 3: Draw a vector (arrow) from the origin to the point z, and label it as "z = 3 + 4i"
        z_vector = Arrow(np.array([0, 0, 0]), np.array([3, 4, 0]), color=GREEN)
        z_label = MathTex(r"z = 3 + 4i", color=GREEN).next_to(z_vector, direction=UP + RIGHT)
        self.play(GrowArrow(z_vector), Write(z_label))
        self.wait(1)

        # Step 4: Show how the magnitude (modulus) of z is calculated using √(a² + b²), i.e., √(3² + 4²) = 5
        magnitude_equation = MathTex(r"|z| = \sqrt{3^2 + 4^2} = 5", color=ORANGE).to_edge(UP)
        self.play(Write(magnitude_equation))
        self.wait(1)

        # Step 5: Animate the modulus as the length of the vector using braces or labels
        magnitude_label = MathTex(r"|z| = 5", color=ORANGE).next_to(z_vector, direction=DOWN)
        self.play(Write(magnitude_label))
        self.wait(1)

        # Step 6: Rotate the vector counterclockwise by 90° to show multiplication by i
        rotated_z_vector = z_vector.copy().rotate(90 * DEGREES)
        rotated_z_label = MathTex(r"iz = -4 + 3i", color=PURPLE).next_to(rotated_z_vector, direction=UP + LEFT)
        self.play(Rotate(z_vector, 90 * DEGREES), Transform(z_label, rotated_z_label))
        self.wait(1)

        # Step 7: Label the new point and explain geometrically what multiplying by i does
        multiplication_by_i_explanation = MathTex(r"\text{Multiplying by } i \text{ rotates the vector 90°} \text{ counterclockwise}", color=PURPLE).to_edge(DOWN)
        self.play(Write(multiplication_by_i_explanation))
        self.wait(2)

        # Step 8: Optionally animate other operations like addition of complex numbers by parallelogram rule
        addition_example = MathTex(r"(3 + 4i) + (1 + 2i) = (3+1) + (4+2)i = 4 + 6i", color=TEAL).to_edge(UP)
        self.play(Write(addition_example))
        self.wait(1)
        addition_vector1 = Arrow(np.array([0, 0, 0]), np.array([3, 4, 0]), color=GREEN)
        addition_vector2 = Arrow(np.array([0, 0, 0]), np.array([1, 2, 0]), color=TEAL)
        addition_result_vector = Arrow(np.array([0, 0, 0]), np.array([4, 6, 0]), color=TEAL)
        self.play(GrowArrow(addition_vector1), GrowArrow(addition_vector2), GrowArrow(addition_result_vector))
        self.wait(2)

        self.wait(5)