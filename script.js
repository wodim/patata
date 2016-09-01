Patata = {
    groups: [],
    unemployed: [],
    /* http://stackoverflow.com/a/25984542 */
    shuffle: function(a, b, c, d) {
        c=a.length;while(c)b=Math.random()*(--c+1)|0,d=a[c],a[c]=a[b],a[b]=d
    },
    array_from_input: function(type) {
        var value = $(".players[data-type=" + type + "]").val();
        var elements = [];
        value.split(",").forEach(function(currentValue, index, array) {
            var element = currentValue.trim();
            if (element) {
                if (type == "tank") {
                    elements.push("🛡 " + element);
                } else if (type == "healer") {
                    elements.push("➕ " + element);
                } else if (type == "dps") {
                    elements.push("⚔ " + element);
                } else {
                    elements.push(element);
                }
            }
        });
        return elements;
    },
    sort: function() {
        var tanks = Patata.array_from_input('tank'); Patata.shuffle(tanks);
        var healers = Patata.array_from_input('healer'); Patata.shuffle(healers);
        var dps = Patata.array_from_input('dps'); Patata.shuffle(dps);
        var tanks_amount = parseInt($('.amount[data-type="tank"]').val());
        var healers_amount = parseInt($('.amount[data-type="healer"]').val());
        var dps_amount = parseInt($('.amount[data-type="dps"]').val());

        if (!tanks_amount && !healers_amount && !dps_amount) {
            $("div.result").html("😕");
            return;
        }

        Patata.groups = Patata.unemployed = [];
        var group_n = 0;
        while (tanks.length >= tanks_amount &&
               healers.length >= healers_amount &&
               dps.length >= dps_amount) {
            Patata.groups[group_n] = [].concat(
                tanks.splice(0, tanks_amount),
                healers.splice(0, healers_amount),
                dps.splice(0, dps_amount));
            group_n++;
        }
        Patata.unemployed = [].concat(tanks, healers, dps);
        Patata.print();
    },
    print: function() {
        $("div.result").html("");
        Patata.groups.forEach(function(currentValue, index, array) {
            $("div.result").html($("div.result").html() +
                "<strong>Grupo " + (index + 1) + ":</strong> " + currentValue.join(", ") + "<br>");
        });
        $("div.result").html($("div.result").html() +
            "<strong>Fuera:</strong> " + Patata.unemployed.join(", "));
    },
    ls: {
        cached_elements: [],
        elements: function() {
            if (Patata.ls.cached_elements.length == 0) {
                ['players', 'amount'].forEach(function(currentValue, index, array) {
                    var type = currentValue;
                    ['tank', 'healer', 'dps'].forEach(function(currentValue, index, array) {
                        var subtype = currentValue;
                        Patata.ls.cached_elements.push("." + type + '[data-type="' + subtype + '"]');
                    });
                });
                console.log("😟");
            } else console.log("🙃");
            return Patata.ls.cached_elements;
        },
        store: function() {
            Patata.ls.elements().forEach(function(currentValue, index, array) {
                storage.set(currentValue, $(currentValue).val());
            });
        },
        load: function() {
            Patata.ls.elements().forEach(function(currentValue, index, array) {
                var value = storage.get(currentValue);
                if (value) $(currentValue).val(value);
            });
        },
    },
};

var patata = Patata || {};
