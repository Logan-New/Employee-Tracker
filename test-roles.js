const { getRoles } = require('./lib/queries');

const testRoles = async () => {
    try {
        const roles = await getRoles();
        console.log('Roles:', roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
};

testRoles();
