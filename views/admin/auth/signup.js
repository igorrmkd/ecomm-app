const layout = require('../layout');
const { getError } = require("../../helpers");

module.exports = ({ req, errors }) => {
    return layout({
        content: `
        <div>
            Your ID is: ${req.session.userId}
            <form method="Post">
                <input name="email" placeholder="email" /><br>
                ${getError(errors, 'email')}
                <input name="password" placeholder="password" /><br>
                ${getError(errors, 'password')}
                <input name="passwordConfirmation" placeholder="password confirmation" /><br>
                ${getError(errors, 'passwordConfirmation')}
                <button>Sign Up</button>
            </form>
        </div>
        `
    });
};