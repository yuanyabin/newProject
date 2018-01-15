export class User {
    constructor(
        public _id: number,
        public first_name: string = '',
        public last_name: string = '',
        public email: string = '',
        public password?: string,
        public index?: number,
    ) { }
}
