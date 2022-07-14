export class Vector {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(other: Vector) {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	sub(other: Vector) {
		return new Vector(this.x - other.x, this.y - other.y);
	}

	mult(n: number) {
		return new Vector(this.x * n, this.y * n);
	}

	set(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	angle(deg: boolean = false) {
		if (deg) return (Math.atan2(this.y, this.x) * 180) / Math.PI;
		return Math.atan2(this.y, this.x);
	}
	mag() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	rotate(angle: number) {
		const [x0, y0]: [number, number] = [this.x, this.y];
		this.x = Math.cos(angle) * x0 - Math.sin(angle) * y0;
		this.y = Math.cos(angle) * x0 + Math.sin(angle) * y0;
		return this;
	}

	normalize() {
		this.x /= this.mag();
		this.y /= this.mag();
		return this;
	}
}
