module.exports = {
    getError(errors, prop) {
        // prop === 'email' || 'password' || 'passwordConfirmation'
        try {
            return errors.mapped()[prop].msg;
        } catch (err) {
            return '';
        }

        //errors.mapped() === {
        // email: {
        //   msg: "Invalid Email"
        // },
        // password: {
        //   msg: "Invalid pass"
        // },
        // passwordConfirmation: {
        //   msg: "pass dont match"
        // }
        // }
    }
};