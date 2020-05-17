module.exports = ({ req }) => {
    return `
        <div>
        <form method="Post">
                <input name="email" placeholder="email" /><br>
                <input name="password" placeholder="password" /><br>
                <button>Sign In</button>
            </form>
        </div>    
    `;
};