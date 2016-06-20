
define([
    'page/Page/Page',
    'can',
    'stache!/app/page/schedule/Add/add.stache'
], function (Page, can, content) {
    return Page.extend(
        {

        },
        {
            template : content
        }
    );
});