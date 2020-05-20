const layout = require('../layout');
const { getError } = require("../../helpers");

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