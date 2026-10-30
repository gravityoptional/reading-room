/*
  Tap count: how many taps and typed fields core tasks take, in two versions of the page.

  Usage (needs Node and Playwright with Chromium):
    git show <old-commit>:index.html > /tmp/before.html
    node tools/tapcount.js /tmp/before.html index.html

  Each task starts on the dashboard, is performed in a real browser, and is checked for success.
  Open Library is answered with a stand-in reply, so results don't depend on the network.
  "not in the app" means that version has no way to do the task; "stuck at <selector>" means
  a button the task needs wasn't found or couldn't be clicked.
  Baseline: commit b121390 is the original upload, before any of the Oct 29–30, 2026 work.
*/
const path=require('path');
const {chromium}=require('playwright');
const [beforeFile,afterFile]=process.argv.slice(2);
if(!beforeFile||!afterFile){console.error('Usage: node tools/tapcount.js <before.html> <after.html>');process.exit(1)}
const FILES={before:path.resolve(beforeFile),now:path.resolve(afterFile)};
(async()=>{const b=await chromium.launch();const out={};
for(const ver of ['before','now']){const p=await b.newPage({viewport:{width:1280,height:1000}});
 await p.route('https://openlibrary.org/**',r=>r.fulfill({contentType:'application/json',body:JSON.stringify({docs:[{key:'/works/OLX',title:'The Wild Robot Protects',author_name:['Peter Brown'],first_publish_year:2023,number_of_pages_median:288,cover_i:0}]})}));await p.route('https://covers.openlibrary.org/**',r=>r.abort());
 let taps=0,typed=0,step='';const tap=async sel=>{step=sel;await p.locator(sel).first().click({timeout:5000});taps++;await p.waitForTimeout(160)};const type=async(sel,v)=>{step=sel;await p.locator(sel).first().fill(v,{timeout:5000});typed++;await p.waitForTimeout(80)};
 const fresh=async(setup)=>{await p.goto('file://'+FILES[ver]);await p.evaluate(()=>localStorage.clear());await p.goto('file://'+FILES[ver]);await p.waitForTimeout(900);
   await p.evaluate(()=>{try{hideTourOffer();S.settings.tour={seen:true,notNow:2,visits:9,askAt:99,groupSeen:true};S.settings.gsHidden=true;save()}catch(e){}});if(setup)await p.evaluate(setup);await p.evaluate(()=>{view='dashboard';render()});taps=0;typed=0};
 const run=async(k,setup,fn,check)=>{try{await fresh(setup);const r=await fn();if(r===false){(out[k]=out[k]||{})[ver]='not in the app';return}const ok=check?await p.evaluate(check):true;(out[k]=out[k]||{})[ver]=ok?`${taps} taps, ${typed} typed`:'did not finish'}catch(e){(out[k]=out[k]||{})[ver]='stuck at '+step}};
 const has=sel=>p.locator(sel).count();
 await run('Log a reading session',null,async()=>{await tap('.hero2-acts [data-act=log]');const s=await p.inputValue('#logForm [name=start]');await type('#logForm [name=end]',String(+s+10));await tap('#logForm button[type=submit]')},()=>!logDlg.open);
 await run('Add a book that isn’t in Reading Room to To Read',null,async()=>{await tap('.nav [data-go=library]');await tap('.lib-h [data-act=addBook]');await type('#adQ','Wild Robot Protects');await p.waitForTimeout(700);
   if(await has('[data-act=adOLWant]'))await tap('[data-act=adOLWant]');else{await tap('[data-act=adTab][data-v=manual]');await type('#amTitle','The Wild Robot Protects');await type('#amAuthor','Peter Brown');await type('#amPages','288');await tap('[data-act=adManualGo][data-v=want]')}},()=>S.titles.some(t=>/Protects/.test(t.title)));
 await run('New member: start a book nobody owns, log first pages',()=>{S.books=[];S.sessions=[];S.copies=S.copies.filter(c=>c.owner!=='me');save()},async()=>{await tap('.hero2-acts [data-act=log]');await type('#newQ','Wild Robot Protects');await p.waitForTimeout(700);
   if(await has('[data-act=pickOL]'))await tap('[data-act=pickOL]');else{await tap('[data-act=manualNew]');await type('[name=mTitle]','The Wild Robot Protects');await type('[name=mAuthor]','Peter Brown');await type('[name=mTotal]','288');await tap('[data-act=manualGo]')}
   await type('#logForm [name=end]','20');await tap('#logForm button[type=submit]')},()=>S.sessions.length===1);
 await run('Change the goal partway through logging, then save',null,async()=>{await tap('.hero2-acts [data-act=log]');const s=await p.inputValue('#logForm [name=start]');await type('#logForm [name=end]',String(+s+10));await type('#logForm [name=minutes]','25');
   if(await has('#calc [data-act=editGoal]')){await tap('#calc [data-act=editGoal]');await type('#goalForm [name=gm]','30');await tap('#goalForm button[type=submit]');await tap('#logForm button[type=submit]')}
   else{await tap('#logForm .dlg-h [data-act=closeLog]');await tap('.hero2 [data-act=editGoal]');await type('#goalForm [name=gm]','30');await tap('#goalForm button[type=submit]');await tap('.hero2-acts [data-act=log]');await type('#logForm [name=end]',String(+s+10));await type('#logForm [name=minutes]','25');await tap('#logForm button[type=submit]')}},()=>S.settings.goalMinutes===30&&!logDlg.open);
 await run('Get back to My Books after refreshing',null,async()=>{await tap('.nav [data-go=library]');await tap('[data-act=libTab][data-v=mybooks]');await p.reload();await p.waitForTimeout(800);taps=0;typed=0;
   if(await p.evaluate(()=>!(view==='library'&&lib.tab==='mybooks'))){await tap('.nav [data-go=library]');await tap('[data-act=libTab][data-v=mybooks]')}});
 await run('Ask to borrow a book someone owns',null,async()=>{if(!(await p.evaluate(()=>typeof activeReqs==='function')))return false;await tap('.nav [data-go=library]');await tap('.lcard:has-text("Owned by Josh") .lc-open');await tap('#bookBody [data-act=reqBorrow]')});
 await run('Share 20 of your books with the group',()=>{S.copies.filter(c=>c.owner==='me').slice(0,20).forEach(c=>c.private=true);save()},async()=>{await tap('.nav [data-go=library]');await tap('[data-act=libTab][data-v=mybooks]');
   if(await has('[data-act=shareSel]')){await tap('[data-act=shareSel]');await tap('[data-act=shareAll][data-v="1"]');await tap('[data-act=shareGo][data-v="1"]')}
   else{const ids=await p.evaluate(()=>S.copies.filter(c=>c.owner==='me'&&c.private).map(c=>c.titleId));for(const id of ids){await p.evaluate(id=>openTitle(id),id);taps++;await tap('#bookBody [data-act=cpShare]');await p.evaluate(()=>bookDlg.close());taps++}}},()=>!S.copies.some(c=>c.owner==='me'&&c.private));
 await run('Delete a battle you started',()=>{S.battles.push({id:'bbT',name:'Test Battle',desc:'',readStart:'2026-11-01',event:'2026-12-01',moderator:null,readers:{},progress:{},creator:'me'});save()},async()=>{await tap('.nav [data-go=challenges]');await tap('[data-act=chTab][data-v=battle]');if(!(await has('[data-act=bCardDel]')))return false;await tap('[data-act=bCardDel]');await tap('[data-act=bDelGo]')},()=>!S.battles.some(b=>b.id==='bbT'));
 await run('Delete a personal challenge you started',null,async()=>{await tap('.nav [data-go=challenges]');const id=await p.evaluate(()=>S.challenges.find(c=>c.mode==='personal'&&c.creator==='me').id);
   if(await has(`[data-act=chCardDel][data-id="${id}"]`)){await tap(`[data-act=chCardDel][data-id="${id}"]`);await tap('#chDlg .b-confirm [data-act=chDel]')}else{await tap(`[data-act=openCh][data-id="${id}"]`);await tap('#chDlg [data-act=chDel]')}
   await p.evaluate(id=>window.__id=id,id)},()=>!S.challenges.some(c=>c.id===window.__id));
 await run('Recover a half-typed entry after a crash',null,async()=>{await tap('.hero2-acts [data-act=log]');await type('#logForm [name=end]','999');await type('#logForm [name=note]','A long thought about the chapter');await p.waitForTimeout(1300);await p.reload();await p.waitForTimeout(800);taps=0;typed=0;
   await tap('.hero2-acts [data-act=log]');if(await p.inputValue('#logForm [name=note]')==='')await type('#logForm [name=end]','999'),await type('#logForm [name=note]','A long thought about the chapter')});
 await p.close()}
const w=Math.max(...Object.keys(out).map(k=>k.length));console.log('Task'.padEnd(w),'| Before'.padEnd(26),'| After');for(const [k,v] of Object.entries(out))console.log(k.padEnd(w),'| '+String(v.before).padEnd(24),'| '+v.now);await b.close()})();
