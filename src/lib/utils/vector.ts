export class Vector {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(other: Vector): Vector {
		return new Vector(this.x + other.x, this.y + other.y);
	}

	sub(other: Vector): Vector {
		return new Vector(this.x - other.x, this.y - other.y);
	}

	mult(n: number): Vector {
		return new Vector(this.x * n, this.y * n);
	}

	set(x: number, y: number): Vector {
		this.x = x;
		this.y = y;
		return this;
	}

	get angle(): number {
		return Math.atan2(this.y, this.x);
	}

	get mag(): number {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	rotate(angle: number): Vector {
		const [x0, y0]: [number, number] = [this.x, this.y];
		this.x = Math.cos(angle) * x0 - Math.sin(angle) * y0;
		this.y = Math.sin(angle) * x0 + Math.cos(angle) * y0;
		return this;
	}

	normalize(): Vector {
		const mag: number = this.mag;
		this.x /= mag;
		this.y /= mag;
		return this;
	}

	clone(): Vector {
		return new Vector(this.x, this.y);
	}
}
