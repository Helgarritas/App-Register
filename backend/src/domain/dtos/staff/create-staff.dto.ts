export class CreateStaffDto {
  constructor(
    public name: string,
    public email: string,
    public img: string,
    public departament: string,
    public cellphone: string,
    public status: string,
  ) {}

  static create(option: {[key: string]: any}): [string?, CreateStaffDto?] {
    const { _id, name, email, img, departament, cellphone, status} = option;

    if (!name) return ['Name dto is required', undefined];
    if (!email) return ['Email dto is required', undefined];
    if (!departament) return ['Departament dto is required', undefined];
    if (!cellphone) return ['Cellphone dto is required', undefined];

    return [undefined, new CreateStaffDto(  name, email, img, departament, cellphone, status )];
  }
}
