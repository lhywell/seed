// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        "postcss-simple-vars": {},
        "postcss-extend": {},
        "postcss-nested": {},
        // to edit target browsers: use "browserslist" field in package.json
        "autoprefixer": {},
        "postcss-mixins": {
            mixins: {
                flexcenter: {
                    '&': {
                        display: 'flex',
                        'align-items': 'center'
                    }

                },
                shadow: {
                    '&': {
                        'box-shadow': '0px 2px 12px rgba(0, 0, 0, .2)'
                    }
                },
                boxTitle: {
                    '&': {
                        position: 'relative',
                        background: '#fafbfb',
                        height: '40px',
                        'line-height': '40px',
                        'padding-left': '16px'
                    }
                },
                componentTips: {
                    '&': {
                        opacity: '0.9',
                        background: '#17233D',
                        color: '#fff',
                        width: 'auto',
                        height: '28px',
                        padding: '8px',
                        'border-radius': '2px',
                        'white-space': 'nowrap',
                        'line-height': '1',
                        'font-size': '12px',
                        position: 'absolute',
                        left: '40px',
                        top: '0',
                        display: 'none'
                    }
                }
            }
        }
    }
}
