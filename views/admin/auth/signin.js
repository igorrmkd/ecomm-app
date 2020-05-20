const layout = require('../layout');

const getError = (errors, prop) => {
    // prop === 'email' || 'password' || 'passwordConfirmation'
    try {
        return errors.mapped()[prop].msg
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
};

module.exports = ({ errors }) => {
    return layout({
        content: `
        <div>
        <form method="Post">
                <input name="email" placeholder="email" /><br>
                ${getError(errors, 'email')}
                <input name="password" placeholder="password" /><br>
                ${getError(errors, 'password')}
                <button>Sign In</button>
            </form>
        </div> 
        `
    });
};