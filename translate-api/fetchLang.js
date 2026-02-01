
const proxyFetch = async(url) =>{
        const loc = `https://script.google.com/macros/s/AKfycbwj2FNO1v8aLy4lXWJ4_kLa4peAph8F7QLKTRDWAwMcHaAaG0IW_QFYLdmaAfa9VLc0/exec?${encodeURIComponent(url)}`;
        const res = await fetch(loc);
        return await res.text();
}


const Str = x => {
            try {
                return String(x);
            } catch (e) {
                return String(e);
            }
        };

        const stringify = x => {
            try {
                return JSON.stringify(x);
            } catch {
                return Str(x);
            }
        };


        const url = 'https://script.google.com/macros/s/AKfycbzBFvLSewHPfKa0aemNWTO6PvXGhLzolyJkWlKVylPeCQNQIT3GoygE4k6pvTOYXoHC/exec';


        const fetchText = async (...args) => (await fetch(...args)).text();

         const langCache = {};
        async function fixText(text,sourseLange='detect',targetLang='en') {
           if(!text?.trim?.()){
            return text;
           }
            text = text.trim();
            let out;
            try{
            if (localStorage.getItem(text)) return localStorage.getItem(text);
            if(langCache[text])return JSON.parse(await langCache[text]).textOut;
            const payload = { text };
            payload.sourceLang = sourceLang;
            payload.targetLang = targetLang;
            langCache[text] = (fetchText(`${url}`, {
                method: "POST",
                body: encodeURIComponent(stringify(payload))
            }));
             responsePayload = JSON.parse(await langCache[text]);
             out = responsePayload.textOut;
             //console.log({text},{responsePayload});
            }catch(e){
             console.warn(e);
            }
            if (out?.trim?.() && (out?.trim?.() !== '#ERROR!') && out != text) {
                localStorage.setItem(text, out);
            }else{
             delete langCache[text];
            }
            return out || text;
        }




const text = await proxyFetch('https://raw.githubusercontent.com/Patrick-ring-motive/tolkienizer/refs/heads/main/sil.txt');

const texts = text.replace(/\s+/g,' ').split('.');

const fr = await fixText(texts[950],'detect','fr');

const en = await fixText(fr,'detect','en');

console.log(en);
