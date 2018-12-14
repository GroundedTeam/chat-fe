export class Client {
    id?: number;
    username?: string;
    avatar?: string;
    status?: number;

    constructor(client: Partial<Client> = {}) {
        if (Object.keys(client).length > 0) {
            const { id, username, avatar, status } = client;

            this.id = id;
            this.username = username;
            this.avatar = avatar;
            this.status = status;
        }
    }

    public isEmpty() {
        return this === undefined || Object.keys(this).length === 0;
        // for (const key in this) {
        //     if (this.hasOwnProperty(key)) {
        //         return false;
        //     }
        // }
        // return true;
    }
}
