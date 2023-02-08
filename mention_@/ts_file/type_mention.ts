let names:string []=["Mobile","Laptop","Computer","Tablet","Microphone","Speaker","Bluetooth","Keyboard","Mouse"];
let pos:number = -1;
names.sort();

function execute(e:Event) {
    destructing();
    let get_event = e.currentTarget as HTMLElement;
    let event_str:string = get_event.innerText;
    let spell_list : string[] = [];
    if(event_str.match("@"))
    {
        let split_str : string[] = event_str.split(" ");
        names.forEach((n)=>{
            split_str.forEach((s)=>{
                if(s.charAt(0)==="@")
                {
                    let check_1:string = n.toLowerCase();
                    let check_2:string = s.split("@")[1].toLowerCase();
                    if(check_1.match(check_2))
                    {
                        spell_list.push(n);
                    }
                }
            })
        })
    }
    listing(spell_list,e);
    let inputs_div = document.getElementById("inputs");
    inputs_div?.addEventListener("keydown",(e)=>listingdown(e));
    inputs_div?.addEventListener("keyup",(e)=>takedown(e));
}

function listing (spell_list:string[],e:Event) {
    
    if(spell_list.length!==0)
    {
        let ul_list = document.querySelector(".list");
        spell_list.forEach((l)=>{
            let li_element = document.createElement("li");
            let li_text = document.createTextNode(l);
            ul_list?.appendChild(li_element);
            li_element.appendChild(li_text);
            li_element.addEventListener("click",writedown);
        });
        
    }
    
}

function destructing () {
    let ul_list = document.querySelector(".list");
    if(ul_list?.childNodes)
    {
        for(let i:number = ul_list.childElementCount;i>=0;i--)
        {
            if(ul_list.childNodes[i])
                ul_list.childNodes[i].remove();
        }
    }
}

function writedown (e:Event) {
    let cur_event = e.currentTarget as HTMLLIElement;
    let cur_event_txt = cur_event.innerText;
    
    let sp = document.createElement("span");

    let div_elem = (document.getElementById("inputs") as HTMLDivElement).childNodes;
    let [node,divi,start,end]:number[]=atfinding();

    let range1 = document.createRange();
    if(div_elem[node].nodeName==="DIV")
    {
        range1.setStart(div_elem[node].childNodes[divi],start);
        range1.setEnd(div_elem[node].childNodes[divi],end);
    }
    else
    {
        range1.setStart(div_elem[node],start);
        range1.setEnd(div_elem[node],end);
    }
    

    let sel1 = window.getSelection();
    sel1?.removeAllRanges();
    sel1?.addRange(range1);
    range1.deleteContents();

    range1.insertNode(sp);
    range1.collapse(false);
    sp.innerHTML=cur_event_txt;
	sp.setAttribute("contenteditable","false");
    sp.setAttribute("id","names");

    destructing();
}

function atfinding ():number[] {
    let main_txt = document.getElementById("inputs") as HTMLDivElement;
    let child_txt = main_txt.childNodes;
    let st:number=0,en:number=0,nd:number=0,di:number=0;
    for(let i=0;i<child_txt.length;i++)
    {
        if(child_txt[i].nodeName==="DIV")
        {
            let here_div_txt=child_txt[i].childNodes;
            for(let j=0;j<here_div_txt.length;j++)
            {
                if(here_div_txt[j].nodeType===3)
                {
                    let l:number = 0;
                    if(here_div_txt[j].nodeValue)
                    {
                        let gtchild_txt= here_div_txt[j].nodeValue?.split(" ");
                        gtchild_txt?.forEach((g)=>{
                            if(g.charAt(0)==="@" && st===0)
                            {
                                st=l;
                                nd=i;
                                en=st+g.length;
                                di=j;
                            }
                            l+=g.length+1;
                        })
                    } 
                }
            }
            
        }
        else
        {
            if(child_txt[i].nodeType===3)
            {
                let l:number = 0;
                let grand_child_txt: string[] | undefined = child_txt[i].nodeValue?.split(" ");
                grand_child_txt?.forEach((g)=>{
                    if(g.charAt(0)==="@" && st===0)
                    {
                        st=l;
                        nd=i;
                        en=st+g.length;
                    }
                    l+=g.length+1;
                })
            }
        }
    }
    return[nd,di,st,en];
}

function transaction () {
    let inputs = (document.getElementById("inputs") as HTMLDivElement).childNodes;
    let boxing = document.getElementById("box") as HTMLUListElement;
    if(inputs.length!==0) {
        let box_list = document.createElement("li") as HTMLLIElement;
        boxing.appendChild(box_list);
        for(let i=inputs.length;i>=0;i--)
        {
            if(inputs[i]!==undefined)
                box_list.prepend(inputs[i]);
        }
    }       
}

function listingdown (e:KeyboardEvent) {
    let ul_node = document.querySelector(".list") as HTMLUListElement;
    let child_elems:number = ul_node.childElementCount - 1;
    if(e.code==="ArrowUp")
    {
        e.stopImmediatePropagation();
        if(pos<=0)
            pos=0;
        else
            pos--;
        addactive(pos);
    }
    else if(e.code==="ArrowDown")
    {
        e.stopImmediatePropagation();
        if(pos>=child_elems)
            pos=child_elems;
        else
            pos++;
        addactive(pos);

    }
    else if(e.code==="Enter")
    {
        e.stopImmediatePropagation();
        (ul_node.childNodes[pos] as HTMLElement).click();
        pos=-1;
        e.preventDefault();
    }
}

function takedown(e:KeyboardEvent) {
    if(e.code==="ArrowUp")
    {
        e.stopImmediatePropagation();
        addactive(pos);
    }
    else if(e.code==="ArrowDown")
    {
        e.stopImmediatePropagation();
        addactive(pos);
    }
}

function addactive (index:number) {
    let active_lists = document.querySelector(".list") as HTMLElement;
    for(let i=0;i<active_lists?.childElementCount;i++)
    {
        (active_lists?.childNodes[i] as HTMLElement).classList.remove();
    }
    (active_lists?.childNodes[pos] as HTMLElement).classList.add("active");
}
