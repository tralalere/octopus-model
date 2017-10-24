/**
 * Created by Christophe on 31/01/2017.
 */

(function (global) {
    System.config({
        paths: {
            src: "../src"
        },
        packages: {
            'src': {
                defaultExtension: "js"
            },
            "test": {
                main: '../../dist/bundle.js',
                defaultExtension: 'js'
            }
        },
        map: {

        }
    })
})(this);