var require = {
    baseUrl: './',

    paths: {
        application: 'app/application',
        page: 'app/page',
        model: 'app/model',

        text: 'lib/text/text',
        stache: "lib/requirejs-canjs-templates/stache",

        jquery: 'lib/jquery/dist/jquery',
        can: "lib/CanJS/amd/can",

        'moment-lib': "lib/moment/moment",
        moment: "app/lib/moment/moment",

        'validate-lib': 'lib/validate/validate',
        validate: 'app/lib/validate/validate'
    },

    shim: {
        stache: {
            deps: ['can']
        }
    }
};