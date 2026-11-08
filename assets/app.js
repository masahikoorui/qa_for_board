(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function copy(t,done){function fb(){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(e){}a.remove()}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(done,fb);else fb()}
// 目次の検索と絞り込み
var q=$('#q'),tree=$('#tree');
if(q&&tree){var items=$$('.tq li',tree),tags=[],boardOnly=false;
 function apply(){var ws=q.value.trim().toLowerCase().split(/[\s　]+/).filter(Boolean),n=0,on=ws.length||tags.length||boardOnly;
  items.forEach(function(li){var s=li.dataset.s,ok=ws.every(function(w){return s.indexOf(w)>=0})&&tags.every(function(t){return (' '+li.dataset.tags+' ').indexOf(' '+t+' ')>=0})&&(!boardOnly||li.dataset.board==='1');li.classList.toggle('hide',!ok);if(ok)n++});
  $$('.tsec',tree).forEach(function(s){s.classList.toggle('hide',!!on&&!$('li:not(.hide)',s))});
  $$('.tchap',tree).forEach(function(c){var any=$('.tsec:not(.hide)',c);c.classList.toggle('hide',!any);if(on&&any)c.open=true});
  $$('.tpart',tree).forEach(function(p){p.classList.toggle('hide',!$('.tchap:not(.hide)',p))});
  var m=$('.map');if(m)m.classList.toggle('hide',!!on);
  $('#qn').textContent=on?n+'問が見つかりました':''}
 q.addEventListener('input',apply);
 $$('[data-tag]').forEach(function(b){b.addEventListener('click',function(){var t=b.dataset.tag,i=tags.indexOf(t);if(i>=0)tags.splice(i,1);else tags.push(t);b.setAttribute('aria-pressed',i<0);apply()})});
 var bo=$('[data-board-only]');if(bo)bo.addEventListener('click',function(){boardOnly=!boardOnly;bo.setAttribute('aria-pressed',boardOnly);apply()});
 $$('[data-tree]').forEach(function(b){b.addEventListener('click',function(){var o=b.dataset.tree==='open';$$('.tchap',tree).forEach(function(c){c.open=o})})});
 var h=location.hash.slice(1);if(h){var t=document.getElementById(h);if(t&&t.tagName==='DETAILS')t.open=true}}
// スマホの目次
var th=$('.toc h2');if(th)th.addEventListener('click',function(){th.parentNode.classList.toggle('open')});
// 注釈を一括で開く
$$('[data-open-all]').forEach(function(b){b.addEventListener('click',function(){var ns=$$('.note',b.closest('.fold')),o=ns.some(function(n){return !n.open});ns.forEach(function(n){n.open=o});b.textContent=o?'すべて閉じる':'すべて開く'})});
var ex=$('[data-expand-page]');if(ex)ex.addEventListener('click',function(){var o=ex.getAttribute('aria-pressed')!=='true';$$('.qa details').forEach(function(d){d.open=o});ex.setAttribute('aria-pressed',o);ex.textContent=o?'このページをすべて閉じる':'このページをすべて開く'});
// 文例のコピー
$$('[data-copy-doc]').forEach(function(b){b.addEventListener('click',function(){var d=b.closest('.doc'),t=$('.dbody',d).innerText,st=$('.dcopied',d);copy(t,function(){st.textContent='コピーしました';setTimeout(function(){st.textContent=''},1800)})})});
})();
