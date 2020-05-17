const layout = require('../layout');

module.exports = ({ req }) => {
    return layout({
        content: `
        <div>
        <form method="Post">
                <input name="email" placeholder="email" /><br>
                <input name="password" placeholder="password" /><br>
                <button>Sign In</button>
            </form>
        </div> 
        `
    });
};