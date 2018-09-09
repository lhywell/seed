// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    from: "./src/assets/css/main.css",
    to: '',
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        "postcss-simple-vars": {},
        "postcss-extend": {},
        "postcss-nested": {},
        // to edit target browsers: use "browserslist" field in package.json
        "autoprefixer": {}
    }
}
