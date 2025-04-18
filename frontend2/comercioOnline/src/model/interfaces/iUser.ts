export default interface IUser {
    id:            number;
    username:      string;
    email:         string;
    password:      string;
    nombre:        string;
    estado:        string;
    rol:           string;
    fechaCreacion: Date;
    ultimoLogin:   null;
    token:         string;
    intentosLogin: number;
    avatarUrl:     string;
}
