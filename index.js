const axios = require('axios');
const terminalLink = require('terminal-link');

console.log("Enter a username to scrape:");

const submitHandler = (res) => {
    var user = res.toString();
    user = user.replace(/\r?\n|\r/g, "");
    if (user) {
        axios.get(`https://www.instagram.com/${user}/?__a=1`)
            .then(res => {
                const data = res.data.graphql.user;
                const photo = terminalLink('Click here', data.profile_pic_url_hd)
                const link = terminalLink('Click here', data.external_url)
                console.log("\nFull Name:", data.full_name, "\n")
                console.log("Bio:", data.biography, "\n")
                console.log("URL:", link, "\n")
                console.log("Is Private:", data.is_private, "\n")
                console.log("Followers:", data.edge_followed_by.count, "\n")
                console.log("Following:", data.edge_follow.count, "\n")
                console.log("Profile Photo Link HD:", photo, "\n")
            })
            .catch(err => {
                if (err.response.status === 404) {
                    console.log("Username not found")
                }
            })
    } else (
        console.log('Enter a valid username')
    )

}

process.stdin.on('data', submitHandler)