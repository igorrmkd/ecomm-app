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

    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRecords);
    }

    async update(id, attrs) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id}, not found`)
        }
        // add the new attrs(new mail, pass, or..) to the existing record we found by id
        Object.assign(record, attrs);
        await this.writeAll(records);
    }

    async getOneBy(filters) {
        const records = await this.getAll();

        for (let record of records) {
            let found = true;

            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }

            if (found) {
                return record;
            }
        }
    }

}

module.exports = new UsersRepository('users.json');

// const test = async () => {
//     const repo = new UsersRepository('users.json');

    /// getOneBy / search -> filter by.. search by..
    // const user = await repo.getOneBy({ name: "igor", id: "329ed598" });
    // console.log(user);

    ///update user
    // await repo.update("329ed598", { name: "igor" });

    /// delete(filter) by id
    // await repo.delete('983ae18c');

    /// getOne by id
    // const user = await repo.getOne("05a81524");

    //// create
    // await repo.create({ email: 'somemail@mail.com', password: 'somepassword' });
    // const users = await repo.getAll();
    // console.log(user);

// };

// test();