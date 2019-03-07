package abstractfactory;

import abstractfactory.color.Color;
import abstractfactory.shape.Shape;

public abstract class AbstractFactory {
	abstract Color getColor(String color);
	abstract Shape getShape(String shape);
}
