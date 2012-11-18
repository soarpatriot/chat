function generate(type) {
    var n = noty({
        text: type,
        type: type,
        dismissQueue: true,
        layout: 'topCenter',
        theme: 'defaultTheme'
    });
    console.log('html: '+n.options.id);
}

function generateAll() {
    generate('alert');
    generate('information');
    generate('error');
    generate('warning');
    generate('notification');
    generate('success');
}

$(document).ready(function() {

    generateAll();

});