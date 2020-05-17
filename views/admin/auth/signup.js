const layout = require('../layout');

module.exports = ({ req }) => {
    return layout({
        content: `
        <div>
            Your ID is: ${req.session.userId}
            <form method="Post">
                <input name="email" placeholder="email" /><br>
                <input name="password" placeholder="password" /><br>
                <input name="passwordConfirmation" placeholder="password confirmation" /><br>
                <button>Sign Up</button>
            </form>
        </div>
        `
    });
};