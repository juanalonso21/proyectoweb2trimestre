export interface IUser {
    id:            number;
    username:      string;
    email:         string;
    password:      string;
    nombre:        string;
    estado:        string;
    rol:           string;
    fechaCreacion: null;
    ultimoLogin:   null;
    token:         string;
    intentosLogin: number;
    avatarUrl:     string;
}
