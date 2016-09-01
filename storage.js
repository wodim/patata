Storage = {
    strings: {
        storage_unavailable: 'Tu navegador no soporta la característica "localStorage".\n\n' +
            'Esto puede ocurrir si es muy antiguo, si estás usando el modo incógnito, o si ' +
            'lo has configurado para que las páginas web no puedan almacenar datos en tu disco.\n\n' +
            'Puedes usar la aplicación, pero algunas opciones no funcionarán correctamente.',
    },
    available: null,
    _is_available: function() {
        try {
            var localStorage = window["localStorage"];
            var x = "__storage_test__";
            localStorage.setItem(x, x);
            if (localStorage.getItem(x) != x) {
                return false;
            }
            localStorage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    },
    is_available: function() {
        if (Storage.available !== null) {
            return Storage.available;
        }
        Storage.available = Storage._is_available();
        if (Storage.available === false) {
            alert(Storage.strings.storage_unavailable);
        }
        return Storage.available;
    },
    get: function(key) {
        var localStorage = window["localStorage"];
        return localStorage.getItem(key);
    },
    set: function(key, value) {
        var localStorage = window["localStorage"];
        return localStorage.setItem(key, value);
    },
    remove: function(key) {
        var localStorage = window["localStorage"];
        return localStorage.removeItem(key);
    },
};

var storage = Storage || {};
storage.is_available();
