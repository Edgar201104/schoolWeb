(function(){
var b=document.getElementById('menu'),n=document.getElementById('nav');
b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded',false)}});
var SCHOOL_EMAIL=''; // put the school email here, e.g. 'office@yourschool.org'
document.getElementById('form').addEventListener('submit',function(e){
 e.preventDefault();
 if(!SCHOOL_EMAIL){alert('The school email is not set up yet. Please call the office instead.');return}
 var f=e.target,body='Name: '+f.n.value+'\nEmail: '+f.e.value+'\n\n'+f.m.value;
 location.href='mailto:'+SCHOOL_EMAIL+'?subject='+encodeURIComponent('Website message')+'&body='+encodeURIComponent(body);
});
})();

(function(){
/* DEMO ONLY: accounts and data live in this page, so anyone can read them.
   Replace with a real login service and database before using real student data. */
var U={student1:{pw:'demo123',role:'student',name:'Maria Soares',info:'Student · Grade 8'},
 parent1:{pw:'demo123',role:'parent',name:'Mr. Soares',info:'Parent of Maria Soares · Grade 8'}};
U.teacher1={pw:'demo123',role:'staff',name:'Ms. Alves',info:'Teacher / office staff'};
var UP=null,CODE={Present:'P',Absent:'A',Late:'L'};
var ANN=[['Holiday notice','Add the real holiday dates here.'],['Parent meeting','Add the date, time and place here.'],['School reminder','Add school-wide news here.']];
var TT=[['Mon','Mathematics','English','Science','Social Studies'],['Tue','English','Mathematics','Arts','PE'],['Wed','Science','Languages','Mathematics','Civics'],['Thu','Social Studies','Science','English','Music'],['Fri','Mathematics','PE','Languages','Study hall']];
var HW=[['Mathematics','Chapter 4 exercises','Due soon'],['English','Short essay','Due soon'],['Science','Lab report','Due later']];
var GR=[['Mathematics','B+'],['English','A-'],['Science','B'],['Social Studies','A']];
var EV=[['Parent-Teacher Conference','Add date'],['Science Fair','Add date'],['Sports Day','Add date']];
var S=['P','P','L','P','P','P','A','P','P','P'],SN={P:'Present',A:'Absent',L:'Late'};
var $=function(i){return document.getElementById(i)},role='student',user=null,tab='';
function days(){var d=new Date(),o=[];while(o.length<10){if(d.getDay()%6)o.unshift(d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'}));d.setDate(d.getDate()-1)}return o}
function tbl(h,r){return '<div class="tw"><table><tr>'+h.map(function(x){return '<th>'+x+'</th>'}).join('')+'</tr>'+r.map(function(x){return '<tr>'+x.map(function(c){return '<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</table></div>'}
var P={
 ann:function(){return '<h2>Announcements and holidays</h2>'+tbl(['Title','Details'],ANN)},
 att:function(){var dd=days(),p=S.filter(function(x){return x=='P'}).length;
  return '<h2>'+(user.role=='parent'?'Maria’s attendance':'My attendance')+'</h2><div class="sum"><div><b>'+p+'</b>Present</div><div><b>'+S.filter(function(x){return x=='L'}).length+'</b>Late</div><div><b>'+S.filter(function(x){return x=='A'}).length+'</b>Absent</div></div>'+tbl(['Date','Status'],dd.map(function(d,i){return [d,'<span class="st '+S[i]+'">'+SN[S[i]]+'</span>']}))},
 tt:function(){return '<h2>Timetable</h2>'+tbl(['Day','Period 1','Period 2','Period 3','Period 4'],TT)},
 hw:function(){return '<h2>Assignments</h2>'+tbl(['Subject','Task','Status'],HW)},
 gr:function(){return '<h2>Grades</h2>'+tbl(['Subject','Grade'],GR)},
 ev:function(){return '<h2>School events</h2>'+tbl(['Event','Date'],EV)}
};
var TABS={student:[['ann','Announcements and holidays'],['att','My attendance'],['tt','Timetable'],['hw','Assignments'],['gr','Grades'],['ev','Events']],parent:[['att','Attendance'],['ann','Announcements and holidays']]};
var E=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
function parse(t){var r=[],row=[],c='',q=false,k=function(){row.push(c);c='';if(row.some(function(x){return x.trim()}))r.push(row);row=[]};t=t.replace(/^\uFEFF/,'');for(var i=0;i<t.length;i++){var h=t[i];if(q){if(h=='"'){if(t[i+1]=='"'){c+='"';i++}else q=false}else c+=h}else if(h=='"')q=true;else if(h==','){row.push(c);c=''}else if(h=='\n'||h=='\r'){if(h=='\r'&&t[i+1]=='\n')i++;k()}else c+=h}k();return r}
function csv(rows){return rows.map(function(r){return r.map(function(c){c=String(c);if(/^[=+\-@]/.test(c))c="'"+c;return '"'+c.replace(/"/g,'""')+'"'}).join(',')}).join('\r\n')}
function rows(){return UP||days().map(function(d,i){return [d,SN[S[i]]]})}
function msg(t){var m=$('pm');if(m)m.textContent=t;else alert(t)}
P.ann=function(){return '<h2>Announcements and holidays</h2>'+tbl(['Title','Details'],ANN.map(function(r){return [E(r[0]),E(r[1]||'')]}))};
P.att=function(){var r=rows(),n=function(s){return r.filter(function(x){return x[1]==s}).length};return '<h2>'+(user.role=='parent'?'Maria’s attendance':user.role=='staff'?'Attendance preview':'My attendance')+'</h2><div class="sum"><div><b>'+n('Present')+'</b>Present</div><div><b>'+n('Late')+'</b>Late</div><div><b>'+n('Absent')+'</b>Absent</div></div>'+tbl(['Date','Status'],r.map(function(x){return [E(x[0]),'<span class="st '+(CODE[x[1]]||'P')+'">'+E(x[1])+'</span>']}))};
function db(k,t){return '<button class="btn" data-d="'+k+'" style="margin:0 10px 10px 0">'+t+'</button>'}
P.dn=function(){var all=user.role!='parent';return '<h2>Downloads</h2><p class="lead">Files save as CSV and open in Excel or Google Sheets.</p>'+db('att','Attendance')+db('ann','Announcements and holidays')+(all?db('tt','Timetable')+db('hw','Assignments')+db('gr','Grades')+db('ev','Events'):'')+'<p id="pm" role="status"></p>'};
P.up=function(){return '<h2>Upload data</h2><p class="lead">Upload a CSV file. Download a template first to see the format.</p><div class="grid g2"><div class="card"><h3>Attendance</h3><p>Columns: Date, Status (Present, Absent or Late).</p>'+db('tpa','Download template')+'<label>Attendance file (.csv)<input type="file" accept=".csv,text/csv" data-u="att"></label></div><div class="card"><h3>Announcements and holidays</h3><p>Columns: Title, Details.</p>'+db('tpn','Download template')+'<label>Announcements file (.csv)<input type="file" accept=".csv,text/csv" data-u="ann"></label></div></div><p id="pm" role="status" style="font-weight:600"></p><p class="note">In this demo, uploaded data replaces the sample data in this browser only. Other devices will not see it until the school connects a database.</p>'};
TABS.student.push(['dn','Downloads']);TABS.parent.push(['dn','Downloads']);
TABS.staff=[['up','Upload data'],['ann','Announcements and holidays'],['att','Attendance preview'],['dn','Downloads']];
function dl(k){if(!user)return;var m={att:['attendance',[['Date','Status']].concat(rows())],ann:['announcements',[['Title','Details']].concat(ANN)],tt:['timetable',[['Day','Period 1','Period 2','Period 3','Period 4']].concat(TT)],hw:['assignments',[['Subject','Task','Status']].concat(HW)],gr:['grades',[['Subject','Grade']].concat(GR)],ev:['events',[['Event','Date']].concat(EV)],tpa:['attendance-template',[['Date','Status'],['Mon 3 Nov','Present'],['Tue 4 Nov','Absent']]],tpn:['announcements-template',[['Title','Details'],['Holiday notice','School closed on this date']]]}[k];
 if(!m||(user.role=='parent'&&k!='att'&&k!='ann')||(user.role!='staff'&&k.slice(0,2)=='tp'))return;
 if(!window.claude){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv(m[1])],{type:'text/csv'}));a.download='spmstl-'+m[0]+'.csv';document.body.appendChild(a);a.click();a.remove();return}
 claude.use('downloads').then(function(d){if(!d){msg('Download is not available in this view.');return}return d.save({filename:'spmstl-'+m[0]+'.csv',data:new Blob([csv(m[1])],{type:'text/csv'})}).catch(function(e){if(!e||e.code!=='declined')msg('The file could not be saved.')})})}
$('pp').addEventListener('click',function(e){var b=e.target.closest('[data-d]');if(b)dl(b.dataset.d)});
$('pp').addEventListener('change',function(e){var i=e.target;if(!i.dataset.u||!user||user.role!='staff'||!i.files[0])return;var f=i.files[0];if(f.size>1048576){msg('File is too large. The maximum is 1 MB.');return}
 var rd=new FileReader();rd.onload=function(){var r=parse(String(rd.result));if(r.length&&/date|title/i.test(r[0][0]))r.shift();
  if(i.dataset.u=='att'){var ok=[],bad=0;r.forEach(function(x){var s=(x[1]||'').trim().toLowerCase(),n=s[0]=='p'?'Present':s[0]=='a'?'Absent':s[0]=='l'?'Late':'';if(x[0]&&x[0].trim()&&n)ok.push([x[0].trim().slice(0,30),n]);else bad++});if(!ok.length){msg('No valid rows found. Use the columns Date and Status.');return}UP=ok;msg('Loaded '+ok.length+' attendance rows'+(bad?' ('+bad+' skipped)':'')+'. Open Attendance preview to check.')}
  else{var a=r.filter(function(x){return x[0]&&x[0].trim()}).map(function(x){return [x[0].trim().slice(0,100),(x[1]||'').trim().slice(0,400)]});if(!a.length){msg('No valid rows found. Use the columns Title and Details.');return}ANN=a;msg('Loaded '+a.length+' announcements. Open Announcements to check.')}};
 rd.readAsText(f)});
function show(t){tab=t;$('pp').innerHTML=P[t]();[].forEach.call($('pt').children,function(b){b.setAttribute('aria-pressed',b.dataset.t==t)})}
function open(u){user=u;$('pn').textContent=u.name;$('pr').textContent=u.info;
 $('pt').innerHTML=TABS[u.role].map(function(t){return '<button data-t="'+t[0]+'" aria-pressed="false">'+t[1]+'</button>'}).join('');
 $('portal').classList.add('on');document.body.style.overflow='hidden';show(TABS[u.role][0][0])}
function out(){user=null;$('portal').classList.remove('on');document.body.style.overflow='';try{sessionStorage.removeItem('spm_u')}catch(e){}}
$('pt').addEventListener('click',function(e){if(e.target.dataset.t&&user&&TABS[user.role].some(function(t){return t[0]==e.target.dataset.t}))show(e.target.dataset.t)});
$('openLogin').addEventListener('click',function(e){e.preventDefault();$('le').textContent='';$('dlg').showModal();$('lu').focus()});
$('lc').addEventListener('click',function(){$('dlg').close()});
$('pout').addEventListener('click',out);
[].forEach.call(document.querySelectorAll('.roles button'),function(b){b.addEventListener('click',function(){role=b.dataset.r;[].forEach.call(b.parentNode.children,function(x){x.setAttribute('aria-pressed',x==b)})})});
$('lf').addEventListener('submit',function(e){e.preventDefault();var u=U[$('lu').value.trim().toLowerCase()];
 if(!u||u.pw!==$('lp').value||u.role!==role){$('le').textContent='Username, password or account type is not correct.';return}
 $('dlg').close();$('lf').reset();try{sessionStorage.setItem('spm_u',$('lu').value)}catch(x){}open(u)});
try{var k=sessionStorage.getItem('spm_u');if(k&&U[k])open(U[k])}catch(x){}
})();
