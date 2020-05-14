const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requieres a filename');
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }
    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
    }

    async create(attrs) {
        attrs.id = this.randomId();
        //get the current existing data{email: 'dsdass@dsfds.com', password: 'sdfds5435f'}
        const records = await this.getAll();
        // push the new data back to records
        records.push(attrs);

        await this.writeAll(records);
    }

    async writeAll(records) {
        // write the updated 'records' array, back to this.filename (users.json)
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

}

const test = async () => {
    const repo = new UsersRepository('users.json');

    const user = await repo.getOne("05a81524");

    // await repo.create({ email: 'somemail@mail.com', password: 'somepassword' });

    // const users = await repo.getAll();
    console.log(user);

};

test();