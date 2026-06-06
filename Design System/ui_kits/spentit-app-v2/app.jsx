/* SpentIt v2 — screens + app shell */
const { Icon, Btn, Card, Money, fmtMoney, Label, Toggle, Segment, Row, TxnRow, Chip, Fab, Bar, Empty } = window;

// ===== MOCK DATA =====
const CAT = {
  groceries:    { name:'Groceries',     icon:'groceries'     },
  dining:       { name:'Dining',        icon:'dining'        },
  transport:    { name:'Transport',     icon:'transport'     },
  rent:         { name:'Rent',          icon:'rent'          },
  shopping:     { name:'Shopping',      icon:'shopping'      },
  health:       { name:'Health',        icon:'health'        },
  entertainment:{ name:'Entertainment', icon:'entertainment' },
  bills:        { name:'Bills',         icon:'bills'         },
  phone:        { name:'Phone',         icon:'phone'         },
  salary:       { name:'Salary',        icon:'salary'        },
};
const ACCOUNTS = [
  { id:1, name:'Cash',  icon:'wallet',   balance:5400  },
  { id:2, name:'HDFC',  icon:'banknote', balance:72180 },
  { id:3, name:'Card',  icon:'receipt',  balance:6740  },
];
const TXNS = [
  { id:1,  type:'expense', cat:'groceries',    amount:1240,  note:'BigBasket',    account:'HDFC', date:'Today'    },
  { id:2,  type:'expense', cat:'dining',       amount:560,   note:'Blue Tokai',   account:'Card', date:'Today'    },
  { id:3,  type:'expense', cat:'transport',    amount:80,    note:'Metro',        account:'Cash', date:'Today'    },
  { id:4,  type:'income',  cat:'salary',       amount:62000, note:'June salary',  account:'HDFC', date:'Yesterday'},
  { id:5,  type:'expense', cat:'shopping',     amount:2399,  note:'Running shoes',account:'Card', date:'Yesterday'},
  { id:6,  type:'expense', cat:'bills',        amount:899,   note:'Electricity',  account:'HDFC', date:'Yesterday'},
  { id:7,  type:'expense', cat:'rent',         amount:18000, note:'Flat rent',    account:'HDFC', date:'3 Jun'    },
  { id:8,  type:'expense', cat:'health',       amount:640,   note:'Pharmacy',     account:'Cash', date:'3 Jun'    },
  { id:9,  type:'expense', cat:'entertainment',amount:499,   note:'Cinema',       account:'Card', date:'2 Jun'    },
  { id:10, type:'expense', cat:'phone',        amount:299,   note:'Recharge',     account:'HDFC', date:'2 Jun'    },
  { id:11, type:'expense', cat:'groceries',    amount:760,   note:'Vegetables',   account:'Cash', date:'1 Jun'    },
];
const SPENDING = [
  { cat:'rent',    total:18000 }, { cat:'groceries', total:8400  },
  { cat:'dining',  total:5600  }, { cat:'shopping',  total:4399  },
  { cat:'bills',   total:3100  }, { cat:'transport', total:1900  },
];
const MONTHLY = [
  { m:'Jan',v:41200},{ m:'Feb',v:38600},{ m:'Mar',v:45100},
  { m:'Apr',v:39800},{ m:'May',v:43900},{ m:'Jun',v:41497},
];
const SUMMARY = { income:62000, expense:41497, net:20503, netWorth:84320 };

// ===== CHROME =====
function StatusBar({ light }) {
  const c = light ? '#fff' : '#0C0C0C';
  return (
    <div style={{ height: 54, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 22px 8px', flexShrink:0, position:'relative' }}>
      {/* Dynamic Island */}
      <div style={{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)', width:120, height:34, background:'#111', borderRadius:18, zIndex:10 }} />
      <span style={{ fontSize:14, fontWeight:700, color:c, letterSpacing:-0.2 }}>9:41</span>
      <div style={{ display:'flex', alignItems:'center', gap:6, color:c }}>
        <svg width="16" height="10" viewBox="0 0 16 10" fill={c}><rect x="0" y="6" width="3" height="4" rx="0.8"/><rect x="4.3" y="4" width="3" height="6" rx="0.8"/><rect x="8.6" y="2" width="3" height="8" rx="0.8"/><rect x="12.9" y="0" width="3" height="10" rx="0.8"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={c} strokeOpacity="0.4"/><rect x="2" y="2" width="15" height="7" rx="1.5" fill={c}/><rect x="22" y="3.5" width="1.5" height="4" rx="0.75" fill={c} fillOpacity="0.4"/></svg>
      </div>
    </div>
  );
}

function MonthSel({ label='June 2026', onP, onN, noNext }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:24, padding:'6px 0' }}>
      <button onClick={onP} style={{ background:'none', border:'none', cursor:'pointer', padding:6, display:'flex' }}><Icon name="prev" size={20} color="#0C0C0C" /></button>
      <span style={{ fontSize:15, fontWeight:600, letterSpacing:-0.2, color:'#0C0C0C', minWidth:120, textAlign:'center' }}>{label}</span>
      <button onClick={onN} disabled={noNext} style={{ background:'none', border:'none', cursor:noNext?'default':'pointer', padding:6, display:'flex' }}><Icon name="next" size={20} color={noNext ? '#C0C0C0' : '#0C0C0C'} /></button>
    </div>
  );
}

// ===== ONBOARDING =====
const SLIDES = [
  { icon:'lock',    title:'Your money,\nnever shared', body:'No accounts. No cloud. No tracking. SpentIt is 100% offline — your data never leaves your phone.' },
  { icon:'add',     title:'Log in seconds', body:'Tap +, pick a category, type an amount. That\'s it.' },
  { icon:'backup',  title:'Back up on\nyour terms', body:'Create an encrypted backup you control. We\'ll remind you weekly.' },
];
function Onboarding({ onDone }) {
  const [i, setI] = React.useState(0);
  const s = SLIDES[i];
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'#fff' }}>
      <div style={{ display:'flex', justifyContent:'flex-end', padding:'8px 18px' }}>
        <button onClick={onDone} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-display)', fontSize:13, fontWeight:600, color:'#8A8A8A' }}>Skip</button>
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 36px', gap:0 }}>
        <span style={{ width:88, height:88, borderRadius:24, background:'#E8FBF5', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:28 }}>
          <Icon name={s.icon} size={38} color="#00D09C" sw={1.5} />
        </span>
        <h2 style={{ margin:'0 0 28px', fontSize:26, fontWeight:800, letterSpacing:-0.5, color:'#0C0C0C', textAlign:'center', whiteSpace:'pre-line', lineHeight:1.2 }}>{s.title}</h2>
        <p style={{ margin:0, fontSize:14, lineHeight:1.6, color:'#8A8A8A', textAlign:'center', maxWidth:260 }}>{s.body}</p>
      </div>
      <div style={{ padding:'16px 24px 32px', display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ display:'flex', justifyContent:'center', gap:6 }}>
          {SLIDES.map((_,k) => <span key={k} style={{ width:k===i?20:6, height:6, borderRadius:3, background:k===i?'#00D09C':'#E0E0E0', transition:'all 220ms ease' }} />)}
        </div>
        <Btn variant="primary" fullWidth size="lg" onClick={() => i < SLIDES.length-1 ? setI(i+1) : onDone()}>
          {i === SLIDES.length-1 ? 'Get started' : 'Continue'}
        </Btn>
      </div>
    </div>
  );
}

// ===== DASHBOARD =====
function Dashboard({ onAdd, onTxns, onCat }) {
  const [acct, setAcct] = React.useState(null);
  const total = SPENDING.reduce((a,s)=>a+s.total,0);
  const maxSpend = SPENDING[0].total;
  const recent = TXNS.slice(0,4);
  return (
    <div style={{ position:'relative', height:'100%', display:'flex', flexDirection:'column' }}>
      <MonthSel noNext />
      <div style={{ overflowY:'auto', flex:1, paddingBottom:90 }} className="ns">
        {/* Balance hero */}
        <div style={{ padding:'8px 16px 16px', textAlign:'center' }}>
          <Label>Net worth</Label>
          <div style={{ fontSize:36, fontWeight:800, letterSpacing:-1.5, color:'#0C0C0C', lineHeight:1.1, margin:'6px 0 12px' }}>
            ₹{SUMMARY.netWorth.toLocaleString('en-IN')}
          </div>
          <div style={{ display:'flex', justifyContent:'center', gap:24 }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.6, color:'#8A8A8A', marginBottom:3 }}>Income</div>
              <Money value={SUMMARY.income} tone="income" size={16} weight={700} />
            </div>
            <div style={{ width:1, height:36, background:'#EBEBEB', alignSelf:'center' }} />
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.6, color:'#8A8A8A', marginBottom:3 }}>Expenses</div>
              <Money value={SUMMARY.expense} tone="default" size={16} weight={700} />
            </div>
            <div style={{ width:1, height:36, background:'#EBEBEB', alignSelf:'center' }} />
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.6, color:'#8A8A8A', marginBottom:3 }}>Saved</div>
              <Money value={SUMMARY.net} tone="income" size={16} weight={700} signed />
            </div>
          </div>
        </div>

        {/* Account chips */}
        <div style={{ display:'flex', gap:8, padding:'0 16px 16px', overflowX:'auto' }} className="ns">
          {[{id:null,name:'All',icon:'layout-grid',balance:SUMMARY.netWorth}, ...ACCOUNTS].map(a=>(
            <button key={a.id??'all'} onClick={()=>setAcct(a.id)} style={{ display:'flex', flexDirection:'column', gap:4, padding:'10px 12px', minWidth:90, background:'#fff', border:`1.5px solid ${acct===a.id?'#00D09C':'#EBEBEB'}`, borderRadius:12, cursor:'pointer', flexShrink:0 }}>
              <div style={{ width:28, height:28, borderRadius:14, background:acct===a.id?'#E8FBF5':'#F4F4F4', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name={a.icon} size={15} color={acct===a.id?'#00D09C':'#8A8A8A'} /></div>
              <span style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:600, color:acct===a.id?'#00D09C':'#6B6B6B' }}>{a.name}</span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:12, fontWeight:700, color:'#0C0C0C', letterSpacing:-0.2 }}>₹{(a.balance/1000).toFixed(1)}k</span>
            </button>
          ))}
        </div>

        {/* Spending */}
        <div style={{ padding:'0 16px 16px' }}>
          <Card>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <Label>Spending this month</Label>
              <Money value={total} size={13} weight={600} tone="muted" />
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {SPENDING.map(s=>(
                <div key={s.cat} onClick={()=>onCat(s.cat)} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                  <span style={{ width:30, height:30, borderRadius:15, background:'#F2F2F2', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name={CAT[s.cat].icon} size={15} color="#6B6B6B" /></span>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:13, fontWeight:500, color:'#0C0C0C', minWidth:72, flexShrink:0 }}>{CAT[s.cat].name}</span>
                  <div style={{ flex:1 }}><div style={{ height:4, background:'#EFEFEF', borderRadius:2 }}><div style={{ width:`${(s.total/maxSpend)*100}%`, height:'100%', background:'#00D09C', borderRadius:2 }} /></div></div>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:12, fontWeight:600, color:'#8A8A8A', minWidth:52, textAlign:'right' }}>₹{(s.total/1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent */}
        <div style={{ padding:'0 16px' }}>
          <Card pad={false}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 14px 10px' }}>
              <Label>Recent</Label>
              <button onClick={onTxns} style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-display)', fontSize:12, fontWeight:600, color:'#00D09C', display:'flex', alignItems:'center', gap:2 }}>See all <Icon name="next" size={13} color="#00D09C" /></button>
            </div>
            {recent.map((t,i)=>(
              <React.Fragment key={t.id}>
                {i>0&&<div style={{height:1,background:'#F4F4F4',margin:'0 16px'}}/>}
                <TxnRow tx={{category:CAT[t.cat].name,icon:CAT[t.cat].icon,note:t.note,account:t.account,amount:t.amount,type:t.type}} onClick={onTxns} />
              </React.Fragment>
            ))}
          </Card>
        </div>
      </div>
      <Fab onClick={onAdd} />
    </div>
  );
}

// ===== TRANSACTIONS =====
function Transactions({ onAdd, initCat }) {
  const [acct, setAcct] = React.useState(null);
  const [cat, setCat] = React.useState(initCat||null);
  const [q, setQ] = React.useState('');
  const [search, setSearch] = React.useState(false);
  const rows = TXNS.filter(t=>(!acct||t.account===acct)&&(!cat||t.cat===cat)&&(!q||t.note.toLowerCase().includes(q.toLowerCase())||CAT[t.cat].name.toLowerCase().includes(q.toLowerCase())));
  const groups = [];
  rows.forEach(t=>{let g=groups.find(x=>x.d===t.date);if(!g){g={d:t.date,items:[]};groups.push(g);}g.items.push(t);});
  return (
    <div style={{ position:'relative', height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'8px 16px 6px', flexShrink:0 }}>
        {cat && <div style={{ marginBottom:8 }}><button onClick={()=>setCat(null)} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:16, border:'1px solid #E4E4E4', background:'#F8F8F8', cursor:'pointer', fontFamily:'var(--font-display)', fontSize:12, fontWeight:600, color:'#0C0C0C' }}><Icon name={CAT[cat].icon} size={13} color="#6B6B6B" />{CAT[cat].name}<Icon name="close" size={13} color="#8A8A8A" /></button></div>}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ flex:1, display:'flex', gap:8, overflowX:'auto' }} className="ns">
            <Chip label="All" sel={!acct} onClick={()=>setAcct(null)} />
            {ACCOUNTS.map(a=><Chip key={a.id} label={a.name} sel={acct===a.name} onClick={()=>setAcct(a.name===acct?null:a.name)} />)}
          </div>
          <button onClick={()=>{setSearch(!search);setQ('');}} style={{ width:36, height:36, borderRadius:18, border:'1px solid #E4E4E4', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><Icon name={search?'close':'search'} size={17} color="#6B6B6B" /></button>
        </div>
        {search && <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8, padding:'8px 12px', background:'#F4F4F4', borderRadius:10 }}><Icon name="search" size={16} color="#8A8A8A" /><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search transactions" autoFocus style={{ flex:1, border:'none', background:'transparent', fontFamily:'var(--font-display)', fontSize:14, color:'#0C0C0C', outline:'none' }} /></div>}
      </div>
      <div style={{ flex:1, overflowY:'auto', paddingBottom:90 }} className="ns">
        {groups.length===0 ? <div style={{marginTop:40}}><Empty icon="receipt" title="No transactions" sub="Try a different filter or tap + to add one" /></div>
        : groups.map(g=>(
          <div key={g.d}>
            <div style={{ display:'flex', justifyContent:'space-between', padding:'12px 16px 4px' }}>
              <span style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:0.6, color:'#8A8A8A' }}>{g.d}</span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:600, color:'#8A8A8A' }}>{(()=>{const n=g.items.reduce((a,t)=>a+(t.type==='income'?t.amount:-t.amount),0);return (n>=0?'+₹':'−₹')+Math.abs(n).toLocaleString('en-IN');})()}</span>
            </div>
            <div style={{ background:'#fff', borderRadius:12, border:'1px solid #EBEBEB', margin:'0 16px 8px', overflow:'hidden' }}>
              {g.items.map((t,i)=>(
                <React.Fragment key={t.id}>
                  {i>0&&<div style={{height:1,background:'#F4F4F4',margin:'0 16px'}}/>}
                  <TxnRow tx={{category:CAT[t.cat].name,icon:CAT[t.cat].icon,note:t.note,account:t.account,amount:t.amount,type:t.type}} onClick={()=>{}} />
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Fab onClick={onAdd} />
    </div>
  );
}

// ===== ADD TRANSACTION =====
const CATS_EXP = ['groceries','dining','transport','rent','shopping','health','entertainment','bills'];
const CATS_INC = ['salary'];
function AddTxn({ onClose, onSave }) {
  const [type, setType] = React.useState('expense');
  const [amt, setAmt] = React.useState('0');
  const [cat, setCat] = React.useState('groceries');
  const [acct, setAcct] = React.useState('HDFC');
  const [note, setNote] = React.useState('');
  const cats = type==='expense' ? CATS_EXP : CATS_INC;
  React.useEffect(()=>setCat(cats[0]),[type]);
  const press = k => setAmt(cur=>{
    if(k==='back') return cur.length<=1?'0':cur.slice(0,-1);
    if(k==='.') return cur.includes('.')?cur:cur+'.';
    if(cur==='0') return k;
    if(cur.includes('.')&&cur.split('.')[1].length>=2) return cur;
    return cur+k;
  });
  const KEYS = ['1','2','3','4','5','6','7','8','9','.','0','back'];
  const isEmpty = amt==='0';
  return (
    <div style={{ position:'absolute', inset:0, background:'#fff', display:'flex', flexDirection:'column', zIndex:50 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'8px 12px 4px' }}>
        <button onClick={onClose} style={{ width:36, height:36, borderRadius:18, border:'none', background:'#F4F4F4', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><Icon name="close" size={18} color="#6B6B6B" /></button>
        <span style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700, color:'#0C0C0C' }}>New entry</span>
        <div style={{width:36}} />
      </div>
      <div style={{ display:'flex', justifyContent:'center', padding:'8px 0' }}>
        <Segment value={type} onChange={setType} options={[{value:'expense',label:'Expense',tone:'expense'},{value:'income',label:'Income',tone:'income'}]} />
      </div>
      <div style={{ textAlign:'center', padding:'12px 0 16px' }}>
        <span style={{ fontFamily:'var(--font-display)', fontSize:48, fontWeight:800, letterSpacing:-2, color:isEmpty?'#D0D0D0':'#0C0C0C' }}>₹{amt}</span>
      </div>
      {/* Category strip */}
      <div style={{ display:'flex', gap:16, padding:'0 16px 16px', overflowX:'auto' }} className="ns">
        {cats.map(k=>{
          const sel=cat===k;
          return (
            <button key={k} onClick={()=>setCat(k)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, background:'none', border:'none', cursor:'pointer', flexShrink:0 }}>
              <span style={{ width:44, height:44, borderRadius:22, display:'flex', alignItems:'center', justifyContent:'center', background:sel?'#00D09C':'#F2F2F2', border:sel?'none':'1.5px solid transparent', transition:'background 120ms ease' }}><Icon name={CAT[k].icon} size={20} color={sel?'#fff':'#8A8A8A'} /></span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:10, fontWeight:600, color:sel?'#00D09C':'#8A8A8A', letterSpacing:0.2 }}>{CAT[k].name}</span>
            </button>
          );
        })}
      </div>
      {/* Note + Account */}
      <div style={{ margin:'0 16px 10px', padding:'2px 0', background:'#F8F8F8', borderRadius:12, border:'1px solid #EBEBEB' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px' }}>
          <Icon name="pencil" size={16} color="#A0A0A0" />
          <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a note" style={{ flex:1, border:'none', background:'transparent', fontFamily:'var(--font-display)', fontSize:14, color:'#0C0C0C', outline:'none' }} />
        </div>
        <div style={{ height:1, background:'#EBEBEB', margin:'0 14px' }} />
        <button onClick={()=>setAcct(acct==='HDFC'?'Cash':'HDFC')} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:'none', border:'none', cursor:'pointer', width:'100%' }}>
          <Icon name="wallet" size={16} color="#A0A0A0" />
          <span style={{ fontFamily:'var(--font-display)', fontSize:14, fontWeight:600, color:'#0C0C0C' }}>{acct}</span>
          <Icon name="next" size={14} color="#C8C8C8" style={{marginLeft:'auto'}} />
        </button>
      </div>
      {/* Keypad */}
      <div style={{ padding:'0 12px 10px', marginTop:'auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8 }}>
          {KEYS.map(k=>(
            <button key={k} onClick={()=>press(k)} style={{ height:50, borderRadius:12, border:'1px solid #F0F0F0', background:'#FAFAFA', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontSize:22, fontWeight:500, color:'#0C0C0C', transition:'background 80ms ease' }}>
              {k==='back'?<Icon name="delete" size={20} color="#6B6B6B" />:k}
            </button>
          ))}
        </div>
        <div style={{ marginTop:10 }}>
          <Btn variant="primary" fullWidth size="lg" onClick={()=>onSave({type,amt,cat,acct,note})}>
            {type==='income'?'Add income':'Add expense'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ===== ANALYTICS =====
function Analytics() {
  const total = SPENDING.reduce((a,s)=>a+s.total,0);
  const peak = Math.max(...MONTHLY.map(m=>m.v));
  const avg = Math.round(MONTHLY.reduce((a,m)=>a+m.v,0)/MONTHLY.length);
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'8px 16px 12px', flexShrink:0 }}>
        <div style={{ fontSize:24, fontWeight:800, letterSpacing:-0.5, color:'#0C0C0C' }}>Analytics</div>
      </div>
      <div style={{ flex:1, overflowY:'auto', paddingBottom:90, display:'flex', flexDirection:'column', gap:12, padding:'0 16px 90px' }} className="ns">
        {/* insight tiles */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[{label:'Avg/month',val:avg,sub:'−5% vs last year',pos:true},{label:'Net saved',val:SUMMARY.net,sub:`${Math.round(SUMMARY.net/SUMMARY.income*100)}% of income`,pos:true}].map(item=>(
            <Card key={item.label}>
              <Label>{item.label}</Label>
              <div style={{ marginTop:6 }}><Money value={item.val} size={20} weight={800} tone={item.pos?'income':'default'} signed={item.pos} /></div>
              <div style={{ marginTop:4, fontFamily:'var(--font-display)', fontSize:11, color:'#8A8A8A' }}>{item.sub}</div>
            </Card>
          ))}
        </div>
        {/* 6-month bars */}
        <Card>
          <Label style={{ marginBottom:16, display:'block' }}>6-month spending</Label>
          <div style={{ display:'flex', alignItems:'flex-end', gap:10, height:130 }}>
            {MONTHLY.map((m,i)=>(
              <div key={m.m} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6, height:'100%', justifyContent:'flex-end' }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:10, fontWeight:600, color:i===5?'#0C0C0C':'#8A8A8A' }}>₹{Math.round(m.v/1000)}k</span>
                <div style={{ width:'100%', maxWidth:28, background:i===5?'#00D09C':'#EEF9F5', borderRadius:'6px 6px 0 0', height:`${(m.v/peak)*100}%`, transition:'height 400ms ease' }} />
                <span style={{ fontFamily:'var(--font-display)', fontSize:11, fontWeight:600, color:i===5?'#0C0C0C':'#8A8A8A' }}>{m.m}</span>
              </div>
            ))}
          </div>
        </Card>
        {/* Category breakdown */}
        <Card>
          <Label style={{ marginBottom:14, display:'block' }}>By category</Label>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {SPENDING.map(s=>(
              <div key={s.cat} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ width:30, height:30, borderRadius:15, background:'#F2F2F2', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon name={CAT[s.cat].icon} size={15} color="#6B6B6B" /></span>
                <span style={{ fontFamily:'var(--font-display)', fontSize:13, fontWeight:500, color:'#0C0C0C', minWidth:76, flexShrink:0 }}>{CAT[s.cat].name}</span>
                <div style={{ flex:1 }}><Bar v={s.total} max={SPENDING[0].total} color="#00D09C" /></div>
                <span style={{ fontFamily:'var(--font-display)', fontSize:12, fontWeight:600, color:'#8A8A8A', minWidth:52, textAlign:'right' }}>₹{(s.total/1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ===== SETTINGS =====
function Grp({ title, children }) {
  return (
    <div style={{ padding:'0 16px' }}>
      <div style={{ fontFamily:'var(--font-display)', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:0.7, color:'#8A8A8A', padding:'0 4px 6px' }}>{title}</div>
      <div style={{ background:'#fff', border:'1px solid #EBEBEB', borderRadius:12, overflow:'hidden' }}>
        {React.Children.map(children,(c,i)=><div style={i>0?{borderTop:'1px solid #F4F4F4'}:{}}>{c}</div>)}
      </div>
    </div>
  );
}
function Settings() {
  const [bio, setBio] = React.useState(true);
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'8px 16px 12px', flexShrink:0 }}>
        <div style={{ fontSize:24, fontWeight:800, letterSpacing:-0.5, color:'#0C0C0C' }}>Settings</div>
      </div>
      <div style={{ flex:1, overflowY:'auto', paddingBottom:90, display:'flex', flexDirection:'column', gap:16 }} className="ns">
        <Grp title="General">
          <Row icon="currency" iconColor="#00D09C" title="Currency" trailText="INR (₹)" onClick={()=>{}} />
          <Row icon="theme" iconColor="#7E57C2" title="Theme" trailText="Light" onClick={()=>{}} />
        </Grp>
        <Grp title="Security">
          <Row icon="biometric" iconColor="#00D09C" title="Biometric lock" sub="Require Face ID to open" trail={<Toggle on={bio} onChange={setBio} />} chevron={false} />
          <Row icon="lock" iconColor="#5C6BC0" title="Auto-lock" trailText="30s" onClick={bio?()=>{}:undefined} disabled={!bio} />
        </Grp>
        <Grp title="Manage">
          <Row icon="accounts" iconColor="#00D09C" title="Accounts" onClick={()=>{}} />
          <Row icon="categories" iconColor="#F5A623" title="Categories" onClick={()=>{}} />
          <Row icon="budgets" iconColor="#EC407A" title="Budgets" onClick={()=>{}} />
        </Grp>
        <Grp title="Data">
          <Row icon="backup" iconColor="#00D09C" title="Backup" sub="Encrypted .spentit file" onClick={()=>{}} />
          <Row icon="restore" iconColor="#5C6BC0" title="Restore" onClick={()=>{}} />
        </Grp>
        <Grp title="About">
          <Row icon="secure" iconColor="#00D09C" title="100% offline" sub="No accounts · no cloud · no tracking" />
          <Row icon="info" iconColor="#9E9E9E" title="Version" trailText="1.0.0" />
        </Grp>
      </div>
    </div>
  );
}

// ===== APP SHELL =====
const TABS = [{k:'dashboard',l:'Home',i:'house'},{k:'transactions',l:'Transactions',i:'receipt'},{k:'analytics',l:'Analytics',i:'chart-column'},{k:'settings',l:'Settings',i:'settings'}];
function TabBar({ tab, setTab }) {
  return (
    <div style={{ position:'absolute', left:0, right:0, bottom:0, height:80, paddingBottom:16, background:'#fff', borderTop:'1px solid #F0F0F0', display:'flex', alignItems:'flex-start', paddingTop:10, zIndex:30 }}>
      {TABS.map(t=>{
        const on=tab===t.k;
        return (
          <button key={t.k} onClick={()=>setTab(t.k)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, background:'none', border:'none', cursor:'pointer', padding:'2px 0' }}>
            <Icon name={t.i} size={22} color={on?'#00D09C':'#C0C0C0'} sw={on?2:1.5} />
            <span style={{ fontFamily:'var(--font-display)', fontSize:10, fontWeight:600, color:on?'#00D09C':'#C0C0C0' }}>{t.l}</span>
          </button>
        );
      })}
    </div>
  );
}
function Toast({ msg }) {
  return <div style={{ position:'absolute', left:16, right:16, bottom:96, background:'#0C0C0C', color:'#fff', borderRadius:12, padding:'12px 16px', display:'flex', alignItems:'center', gap:10, zIndex:60, animation:'toastIn 200ms ease', fontFamily:'var(--font-display)', fontSize:14, fontWeight:600 }}><Icon name="check" size={16} color="#00D09C" sw={2} />{msg}</div>;
}
function App() {
  const [stage, setStage] = React.useState('onboarding');
  const [tab, setTab] = React.useState('dashboard');
  const [adding, setAdding] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [drillCat, setDrillCat] = React.useState(null);
  const showToast = m => { setToast(m); setTimeout(()=>setToast(null), 2000); };
  let screen = null;
  if (tab==='dashboard') screen = <Dashboard onAdd={()=>setAdding(true)} onTxns={()=>{setDrillCat(null);setTab('transactions');}} onCat={c=>{setDrillCat(c);setTab('transactions');}} />;
  else if (tab==='transactions') screen = <Transactions key={drillCat||'all'} onAdd={()=>setAdding(true)} initCat={drillCat} />;
  else if (tab==='analytics') screen = <Analytics />;
  else screen = <Settings />;
  return (
    <div className="phone">
      <div className="screen">
        <StatusBar />
        <div style={{ position:'relative', flex:1, overflow:'hidden' }}>
          {stage==='onboarding' ? <Onboarding onDone={()=>setStage('app')} /> : (
            <React.Fragment>
              <div style={{ position:'absolute', inset:0, paddingBottom:0 }}>{screen}</div>
              <TabBar tab={tab} setTab={t=>{setDrillCat(null);setTab(t);}} />
              {adding && <AddTxn onClose={()=>setAdding(false)} onSave={()=>{setAdding(false);showToast('Added successfully');}} />}
              {toast && <Toast msg={toast} />}
            </React.Fragment>
          )}
        </div>
        <div style={{ position:'absolute', bottom:7, left:'50%', transform:'translateX(-50%)', width:120, height:5, borderRadius:3, background:'#0C0C0C', opacity:0.22, zIndex:70 }} />
      </div>
    </div>
  );
}
Object.assign(window, { App });
