"use strict";
let names = ["Mobile", "Laptop", "Computer", "Tablet", "Microphone", "Speaker", "Bluetooth", "Keyboard", "Mouse"];
let pos = -1;
names.sort();
function execute(e) {
    destructing();
    let get_event = e.currentTarget;
    let event_str = get_event.innerText;
    let spell_list = [];
    if (event_str.match("@")) {
        let split_str = event_str.split(" ");
        names.forEach((n) => {
            split_str.forEach((s) => {
                if (s.charAt(0) === "@") {
                    let check_1 = n.toLowerCase();
                    let check_2 = s.split("@")[1].toLowerCase();
                    if (check_1.match(check_2)) {
                        spell_list.push(n);
                    }
                }
            });
        });
    }
    listing(spell_list, e);
    let inputs_div = document.getElementById("inputs");
    inputs_div === null || inputs_div === void 0 ? void 0 : inputs_div.addEventListener("keydown", (e) => listingdown(e));
    inputs_div === null || inputs_div === void 0 ? void 0 : inputs_div.addEventListener("keyup", (e) => takedown(e));
}
function listing(spell_list, e) {
    if (spell_list.length !== 0) {
        let ul_list = document.querySelector(".list");
        spell_list.forEach((l) => {
            let li_element = document.createElement("li");
            let li_text = document.createTextNode(l);
            ul_list === null || ul_list === void 0 ? void 0 : ul_list.appendChild(li_element);
            li_element.appendChild(li_text);
            li_element.addEventListener("click", writedown);
        });
    }
}
function destructing() {
    let ul_list = document.querySelector(".list");
    if (ul_list === null || ul_list === void 0 ? void 0 : ul_list.childNodes) {
        for (let i = ul_list.childElementCount; i >= 0; i--) {
            if (ul_list.childNodes[i])
                ul_list.childNodes[i].remove();
        }
    }
}
function writedown(e) {
    let cur_event = e.currentTarget;
    let cur_event_txt = cur_event.innerText;
    let sp = document.createElement("span");
    let div_elem = document.getElementById("inputs").childNodes;
    let [node, divi, start, end] = atfinding();
    let range1 = document.createRange();
    if (div_elem[node].nodeName === "DIV") {
        range1.setStart(div_elem[node].childNodes[divi], start);
        range1.setEnd(div_elem[node].childNodes[divi], end);
    }
    else {
        range1.setStart(div_elem[node], start);
        range1.setEnd(div_elem[node], end);
    }
    let sel1 = window.getSelection();
    sel1 === null || sel1 === void 0 ? void 0 : sel1.removeAllRanges();
    sel1 === null || sel1 === void 0 ? void 0 : sel1.addRange(range1);
    range1.deleteContents();
    range1.insertNode(sp);
    range1.collapse(false);
    sp.innerHTML = cur_event_txt;
    sp.setAttribute("contenteditable", "false");
    sp.setAttribute("id", "names");
    destructing();
}
function atfinding() {
    var _a, _b;
    let main_txt = document.getElementById("inputs");
    let child_txt = main_txt.childNodes;
    let st = 0, en = 0, nd = 0, di = 0;
    for (let i = 0; i < child_txt.length; i++) {
        if (child_txt[i].nodeName === "DIV") {
            let here_div_txt = child_txt[i].childNodes;
            for (let j = 0; j < here_div_txt.length; j++) {
                if (here_div_txt[j].nodeType === 3) {
                    let l = 0;
                    if (here_div_txt[j].nodeValue) {
                        let gtchild_txt = (_a = here_div_txt[j].nodeValue) === null || _a === void 0 ? void 0 : _a.split(" ");
                        gtchild_txt === null || gtchild_txt === void 0 ? void 0 : gtchild_txt.forEach((g) => {
                            if (g.charAt(0) === "@" && st === 0) {
                                st = l;
                                nd = i;
                                en = st + g.length;
                                di = j;
                            }
                            l += g.length + 1;
                        });
                    }
                }
            }
        }
        else {
            if (child_txt[i].nodeType === 3) {
                let l = 0;
                let grand_child_txt = (_b = child_txt[i].nodeValue) === null || _b === void 0 ? void 0 : _b.split(" ");
                grand_child_txt === null || grand_child_txt === void 0 ? void 0 : grand_child_txt.forEach((g) => {
                    if (g.charAt(0) === "@" && st === 0) {
                        st = l;
                        nd = i;
                        en = st + g.length;
                    }
                    l += g.length + 1;
                });
            }
        }
    }
    return [nd, di, st, en];
}
function transaction() {
    let inputs = document.getElementById("inputs").childNodes;
    let boxing = document.getElementById("box");
    if (inputs.length !== 0) {
        let box_list = document.createElement("li");
        boxing.appendChild(box_list);
        for (let i = inputs.length; i >= 0; i--) {
            if (inputs[i] !== undefined)
                box_list.prepend(inputs[i]);
        }
    }
}
function listingdown(e) {
    let ul_node = document.querySelector(".list");
    let child_elems = ul_node.childElementCount - 1;
    if (e.code === "ArrowUp") {
        e.stopImmediatePropagation();
        if (pos <= 0)
            pos = 0;
        else
            pos--;
        addactive(pos);
    }
    else if (e.code === "ArrowDown") {
        e.stopImmediatePropagation();
        if (pos >= child_elems)
            pos = child_elems;
        else
            pos++;
        addactive(pos);
    }
    else if (e.code === "Enter") {
        e.stopImmediatePropagation();
        ul_node.childNodes[pos].click();
        pos = -1;
        e.preventDefault();
    }
}
function takedown(e) {
    if (e.code === "ArrowUp") {
        e.stopImmediatePropagation();
        addactive(pos);
    }
    else if (e.code === "ArrowDown") {
        e.stopImmediatePropagation();
        addactive(pos);
    }
}
function addactive(index) {
    let active_lists = document.querySelector(".list");
    for (let i = 0; i < (active_lists === null || active_lists === void 0 ? void 0 : active_lists.childElementCount); i++) {
        (active_lists === null || active_lists === void 0 ? void 0 : active_lists.childNodes[i]).classList.remove();
    }
    (active_lists === null || active_lists === void 0 ? void 0 : active_lists.childNodes[pos]).classList.add("active");
}
