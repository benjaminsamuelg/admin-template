// db url should come from env.

const nano = require('nano')({ url:'http://localhost:5984',cors: false });

const employee = nano.db.use('employee');

export const addEmployee = async (emp) => {
    const response = await employee.insert(emp)
    return response;
}

export const list = async () => {
    const response = await employee.list({include_docs: true});
    const filtered = response.rows.map(f => f.doc);
    return filtered;
}

export const getEmployees = async () => {
    return '';
}