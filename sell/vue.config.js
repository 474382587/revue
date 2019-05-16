// vue.config.js
const path = require('path');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/revue/sell/dist/'
    : '/',
    configureWebpack: {
        resolve: {
            alias: {
                'common': path.join(__dirname, '/src/common/'),
                'root': path.join(__dirname, '/'),
                '@': path.join(__dirname, '/src/'),
                components: path.join(__dirname, '/src/components')
            }
        }
    },
    css: {
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                data: `@import "~@/variables.scss";`
            },
            // pass Less.js Options to less-loader
            less: {
                // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
                // `primary` is global variables fields name
                globalVars: {
                    primary: '#fff'
                }
            },

            stylus: {}
        }
    }
};
